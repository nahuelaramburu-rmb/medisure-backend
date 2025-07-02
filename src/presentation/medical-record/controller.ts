import { CreateMedicalRecord, CreateMedicalRecordDto, GetMedicalRecordById, GetMedicalRecords, MedicalRecordRepository, UpdateMedicalRecord, UpdateMedicalRecordDto } from "../../domain";
import { Request, Response } from "express";
import { handleError } from "../helpers/errors";

export class MedicalRecordController{
    constructor(
        private readonly medicalRecordRepository: MedicalRecordRepository
    ){}

    getMedicalRecords = (req: Request, res: Response) =>{
        new GetMedicalRecords(this.medicalRecordRepository)
            .execute()
            .then((medicalRecords)=>{
                res.json({
                    msg: "ok",
                    data: medicalRecords
                });
            })
            .catch(error => handleError(error, res));
    }

    getMedicalRecordById = (req: Request, res: Response) => {
        const { id } = req.params;
        new GetMedicalRecordById(this.medicalRecordRepository)
            .execute(id)
            .then((medicalRecord) => {
                res.json({
                    msg: "ok",
                    data: medicalRecord
                });
            })
            .catch(error => handleError(error, res));
    }

    createMedicalRecord = (req: Request, res: Response)=>{
        const [ error, createMedicalRecordDto ] = CreateMedicalRecordDto.create(req.body);
        if (error) return res.status(400).json({ error });
        new CreateMedicalRecord(this.medicalRecordRepository)
            .execute(createMedicalRecordDto!)
            .then((medicalRecord) => {
                res.json({
                    msg: "ok",
                    data: medicalRecord
                });
            })
            .catch(error => handleError(error, res));
    }

    updateMedicalRecord = (req: Request, res: Response) => {
        const  id  = req.params.id;
        const [ error, updateMedicalRecordDto ] = UpdateMedicalRecordDto.create({ ...req.body, id });
        if (error) return res.status(400).json({ error });
        new UpdateMedicalRecord(this.medicalRecordRepository)
            .execute(updateMedicalRecordDto!)
            .then((medicalRecord) => {
                res.json({
                    msg: "ok",
                    data: medicalRecord
                });
            })
            .catch(error => handleError(error, res));
    }

    deleteMedicalRecord = (req: Request, res: Response) => {
        const  id  = req.params.id;
        this.medicalRecordRepository.deleteById(id)
            .then((medicalRecord) => {
                res.json({
                    msg: "ok",
                    data: medicalRecord
                });
            })
            .catch(error => handleError(error, res));
    }
}