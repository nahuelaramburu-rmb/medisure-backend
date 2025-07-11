import { Request, Response } from "express";
import { GetConsentsByPatientId, CreatePatientConsent, PatientConsentRepository, CreatePatientConsentDto, RevokeConsent } from "../../domain";
import { handleError } from "../helpers/errors";


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
    createConsent = (req: Request, res: Response) => {
        const [error, createConsentDto] = CreatePatientConsentDto.create(req.body);
        if (error) return res.status(400).json({ error });

        new CreatePatientConsent(this.repository)
            .execute(createConsentDto!)
            .then(data => {
                res.json({
                    msg: "ok",
                    data: data
                });
            })
            .catch(error => handleError(error, res));
    };

    revokeConsent = (req: Request, res: Response) => {
        const id = req.params.id;
        const revokedAt = new Date();
        
        new RevokeConsent(this.repository)
            .execute(id, revokedAt)
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