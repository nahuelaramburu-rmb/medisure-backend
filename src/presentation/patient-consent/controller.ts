import { Request, Response } from "express";
import { GetConsentsByPatientId, CreatePatientConsent, PatientConsentRepository, CreatePatientConsentDto, RevokeConsent, UserEntity } from "../../domain";
import { handleError } from "../helpers/errors";

interface AuthenticatedRequest extends Request{
    user?: UserEntity;
}

export class PatientConsentController{
    constructor(
        private readonly repository: PatientConsentRepository

    ){}

    getConsentsByPatientId= (req: Request, res: Response)=>{
        const patientId = req.params.patientId;
        new GetConsentsByPatientId(this.repository)
            .execute(patientId)
            .then((consents)=>{
                res.json({
                    msg:"ok",
                    data: consents
                });
            })
            .catch( error=> handleError(error, res) );
    };
    createConsent = (req: AuthenticatedRequest, res: Response) => {
        const [error, createConsentDto] = CreatePatientConsentDto.create(req.body);
        if (error) return res.status(400).json({ error });
        if (!req.user) return res.status(401).json({ error: "Unauthorized: user not found in request" });
        
        const { id } = req.user;
        let ip = req.headers['x-forwarded-for']?.toString().split(',')[0] || req.socket.remoteAddress || "0.0.0.0";

        new CreatePatientConsent(this.repository)
            .execute(createConsentDto!, id, ip)
            .then(data => {
                res.json({
                    msg: "ok",
                    data: data
                });
            })
            .catch(error => handleError(error, res));
    };

    revokeConsent = (req: AuthenticatedRequest, res: Response) => {
        const id_consent = req.params.id;
        
        if (!req.user) return res.status(401).json({ error: "Unauthorized: user not found in request" });
        
        const { id } = req.user;
        let ip = req.headers['x-forwarded-for']?.toString().split(',')[0] || req.socket.remoteAddress || "0.0.0.0";

        new RevokeConsent(this.repository)
            .execute(id_consent, id, ip)
            .then(data => {
                res.json({
                    msg: "ok",
                    data: data
                });
            })
            .catch(error => handleError(error, res));
    };

    getConsentLogs = (req: Request, res: Response) => {
        const patientId = req.params.patientId;
        
        new GetConsentsByPatientId(this.repository)
            .execute(patientId)
            .then(data => {
                res.json({
                    msg: "ok",
                    data: data
                });
            })
    };
}