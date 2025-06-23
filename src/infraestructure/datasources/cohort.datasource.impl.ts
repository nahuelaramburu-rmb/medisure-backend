import { prisma } from "../../data/postgres";
import { CohortDataSource, CohortEntity, CreateCohortDto, UpdateCohortDto } from "../../domain";



export class CohortDatasourceImpl implements CohortDataSource{
    
    async getAllCohorts(): Promise<CohortEntity[]> {
        const cohorts = await prisma.cohorts.findMany();
        return cohorts.map(cohort => CohortEntity.fromObject(cohort));
    }
    async getCohortById(id: string): Promise<CohortEntity> {
        const cohort = await prisma.cohorts.findUnique({
            where: { id }
        });
        if (!cohort) throw new Error(`Cohort not found with id: ${id}`);
        return CohortEntity.fromObject(cohort);
    }
    async createCohort(createCohortDto: CreateCohortDto): Promise<CohortEntity> {
        const cohort = await prisma.cohorts.create({
            data: createCohortDto!
        });
        return CohortEntity.fromObject(cohort);
    }
    async updateCohort(updateCohortDto: UpdateCohortDto): Promise<CohortEntity> {
        await this.getCohortById(updateCohortDto.id);
        const updatedCohort = await prisma.cohorts.update({
            where: { id: updateCohortDto.id },
            data: updateCohortDto!.values
        });
        return CohortEntity.fromObject(updatedCohort);
    }
    async deleteCohort(id: string): Promise<CohortEntity> {
        await this.getCohortById(id);
        const deletedCohort = await prisma.cohorts.delete({
            where: { id }
        });
        return CohortEntity.fromObject(deletedCohort);
    }

}