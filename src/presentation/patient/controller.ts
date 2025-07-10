import { Request, Response } from "express";
import { CreatePatient, CreatePatientDto, DeletePatient, ExportPatients, ExportPatientsDto, GetPatientById, GetPatients, PatientRepository, UpdatePatient, UpdatePatientDto, UserEntity } from "../../domain";
import { handleError } from "../helpers/errors";
import { PaginationDto } from '../../domain/dtos/shared/pagination.dto';


export class PatientController{
    constructor(
        private readonly patientRepository: PatientRepository
    ){}

    getPatients = (req: Request, res: Response)=>{
        const { page=1, limit=10} = req.query;
        const [error, paginationDto] = PaginationDto.create(+page,+limit);
        if (error) return res.status(400).json({ error });

        new GetPatients(this.patientRepository)
            .execute(paginationDto!)
            .then((patients)=>{
                res.json({
                    msg:"ok",
                    data: patients
                });
            })
            .catch( error=> handleError(error, res) );
    }

    getPatientById = (req: Request, res: Response)=>{
        const id = req.params.id;
        new GetPatientById(this.patientRepository)
            .execute(id)
            .then((patient)=>{
                res.json({
                    msg:"ok",
                    data: patient
                });
            })
            .catch( error=> handleError(error, res) );
    }

    createPatient = async (req: Request, res: Response)=>{
        const [ error, patientDto ] = CreatePatientDto.create( req.body );
        if( error ) return res.status(400).json({ error });
        
        new CreatePatient( this.patientRepository )
            .execute( patientDto!, req.user as UserEntity )
            .then((patient)=>{
                res.json({
                    msg:"ok",
                    data: patient
                });
            })
            .catch( error=> handleError(error, res) );
    }

    updatePatient = (req: Request, res: Response)=>{
        const id = req.params.id;
        const [ error, updatePatientDto ] = UpdatePatientDto.create({ ...req.body, id });
        if( error ) return res.status(400).json({ error });

        new UpdatePatient(this.patientRepository)
            .execute(updatePatientDto!)
            .then((patient)=>{
                res.json({
                    msg:"ok",
                    data: patient
                });
            })
            .catch( error=> handleError(error, res) );
    }

    deletePatient = (req: Request, res: Response)=>{
        const id = req.params.id;
        new DeletePatient(this.patientRepository)
            .execute(id)
            .then((patient)=>{
                res.json({
                    msg:"ok",
                    data: patient
                });
            })
            .catch( error=> handleError(error, res) );
    };

    exportPatients = async(req: Request, res: Response) => {
        const [error, dto] = ExportPatientsDto.create(req.query);
        if (error) return res.status(400).json({ error });
        new ExportPatients(this.patientRepository)
            .execute(dto!)
            .then((exportedData) => {
                res.setHeader('Content-Type', exportedData.contentType);
                res.setHeader('Content-Disposition', `attachment; filename="${exportedData.filename}"`);
                res.send(exportedData.data);
            })
            .catch((error) => handleError(error, res));
    }
    
}