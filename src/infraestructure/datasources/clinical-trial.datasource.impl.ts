import { prisma } from "../../data/postgres";
import { CreateClinicalTrialDto, CustomError, UpdateClinicalTrialDto} from "../../domain";
import { ClinicalTrialDataSource } from "../../domain/datasources/clinical-trial.datasource";
import { ClinicalTrialEntity } from "../../domain/entities/clinical-trial.entity";
import { clinical_trials } from '../../generated/prisma/index';


export class ClinicalTrialDataSourceImpl implements ClinicalTrialDataSource{

    async create(createClinicalTrialDto: CreateClinicalTrialDto): Promise<ClinicalTrialEntity> {
        const clinicalTrial = await prisma.clinical_trials.create({
            data: createClinicalTrialDto!
        })
        return ClinicalTrialEntity.fromObject(clinicalTrial);
    }
    async getById(id: string): Promise<ClinicalTrialEntity> {
        const clinicalTrial = await prisma.clinical_trials.findUnique({
            where: { id } 
        });
        if ( !clinicalTrial) throw new CustomError(404,`Clinical Trial not found ${id}` );
        return ClinicalTrialEntity.fromObject(clinicalTrial);
    }
    async getAll(): Promise<ClinicalTrialEntity[]> {

        const clinicalTrials = await prisma.clinical_trials.findMany();
        return clinicalTrials.map(clinicalTrial => ClinicalTrialEntity.fromObject(clinicalTrial));
    }
    async updateById(updateClinicalTrialDto: UpdateClinicalTrialDto): Promise<ClinicalTrialEntity> {
        await this.getById(updateClinicalTrialDto.id); 

        const updatedClinicalTrial = await prisma.clinical_trials.update({
            where: { id: updateClinicalTrialDto.id },
            data: updateClinicalTrialDto!.values
        });
        
        return ClinicalTrialEntity.fromObject(updatedClinicalTrial);
    }

    async deleteById(id: string): Promise<ClinicalTrialEntity> {
        await this.getById(id);

        const deletedClinicalTrial = await prisma.clinical_trials.delete({
            where: { id }
        });

        return ClinicalTrialEntity.fromObject(deletedClinicalTrial);
    }

}