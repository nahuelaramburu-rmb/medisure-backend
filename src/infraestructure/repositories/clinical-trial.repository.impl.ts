import { ClinicalTrialRepository, CreateClinicalTrialDto, EnrollPatientDto, GetKpiAcrossTrialsDto, PaginationDto, TrialElegibleCandidateResponse, TrialEnrollmentResponse, TrialEnrollmentStatusResponse, TrialPerformanceMetricsResponse, UpdateClinicalTrialDto } from "../../domain";
import { ClinicalTrialDataSource } from "../../domain/datasources/clinical-trial.datasource";
import { ClinicalTrialEntity } from "../../domain/entities/clinical-trial.entity";


export class ClinicalTrialRepositoryImpl implements ClinicalTrialRepository {
    
    constructor(private readonly dataSource: ClinicalTrialDataSource) {}

    create(createClinicalTrialDto: CreateClinicalTrialDto): Promise<ClinicalTrialEntity> {
        return this.dataSource.create(createClinicalTrialDto);
    }

    getAll(): Promise<ClinicalTrialEntity[]> {
        return this.dataSource.getAll();
    }

    getById(id: string): Promise<ClinicalTrialEntity> {
        return this.dataSource.getById(id);
    }

    updateById(updateClinicalTrialDto: UpdateClinicalTrialDto): Promise<ClinicalTrialEntity> {
        return this.dataSource.updateById(updateClinicalTrialDto);
    }

    deleteById(id: string): Promise<ClinicalTrialEntity> {
        return this.dataSource.deleteById(id);
    }
    getClinicalTrialSummary(): Promise<TrialEnrollmentResponse> {
        return this.dataSource.getClinicalTrialSumary();
    }
    getClinicalTrialEnrollmentStatus(id: string): Promise<TrialEnrollmentStatusResponse> {
        return this.dataSource.getClinicalTrialEnrollmentStatus(id);
    }
    getClinicalTrialEligibleCandidates(id: string, paginationDto: PaginationDto, minScore?:number): Promise<TrialElegibleCandidateResponse> {
        return this.dataSource.getClinicalTrialEligibleCandidates(id, paginationDto, minScore);
    }
    getClinicalTrialPerformanceMetrics(groupBy: GetKpiAcrossTrialsDto): Promise<TrialPerformanceMetricsResponse> {
        return this.dataSource.getClinicalTrialPerformanceMetrics(groupBy);
    }
    enrollPatientInTrial(enrollPatientDto: EnrollPatientDto, id: string): Promise<any> {
        return this.dataSource.enrollPatientInTrial(enrollPatientDto, id);
    }
}