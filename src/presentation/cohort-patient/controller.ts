import { CreatePatientCohortDto } from "../../domain/dtos/patient-cohort/create-patient-cohort.dto";
import { CohortPatientRepository } from "../../domain/repositories/patient-cohort.repository";
import { Request, Response } from "express";
import { AddPatientToCohort } from "../../domain/use-cases/cohort-patients/add-patient-to-cohort";
import { handleError } from "../helpers/errors";
import { RemovePatientFromCohortDto } from "../../domain/dtos/patient-cohort/remove-patient-cohort.dto";
import { RemovePatientFromCohort } from "../../domain/use-cases/cohort-patients/remove-patient-to-cohort";

export class CohortPatientController{
    constructor(
        private readonly repository: CohortPatientRepository
    ){}

    async addPatient(req: Request, res: Response){
        const [error, dto] = CreatePatientCohortDto.create(req.body);
        if (error) return res.status(400).json({ error });
        new AddPatientToCohort(this.repository)
            .execute(dto!)
            .then((data) => {
                res.json({
                    msg: "ok",
                    data: data
                });
            })
            .catch(error => handleError(error, res)); 
    }

    async removePatient(req: Request, res: Response){
        const [error, dto] = RemovePatientFromCohortDto.create(req.body);
        if (error) return res.status(400).json({ error });
        new RemovePatientFromCohort(this.repository)
            .execute(dto!)
            .then((data) => {
                res.json({
                    msg: "ok",
                    data: data
                });
            })
            .catch(error => handleError(error, res));
    }
}