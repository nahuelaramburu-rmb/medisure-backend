import { CreateClinicalTrialDto, EnrollPatientDto, GetKpiAcrossTrialsDto, PaginationDto, TrialElegibleCandidateResponse, TrialEnrollmentResponse, TrialEnrollmentStatusResponse, TrialPerformanceMetricsResponse, UpdateClinicalTrialDto } from "../dtos";
import { ClinicalTrialEntity } from "../entities/clinical-trial.entity";


export abstract class ClinicalTrialRepository{
    abstract create(clinicalTrialDto: CreateClinicalTrialDto): Promise<ClinicalTrialEntity>;
    abstract getAll():Promise<ClinicalTrialEntity[]>;
    abstract getById(id: string): Promise<ClinicalTrialEntity>;
    abstract updateById(updateClinicalTrialDto: UpdateClinicalTrialDto): Promise<ClinicalTrialEntity>;
    abstract deleteById(id: string): Promise<ClinicalTrialEntity>;

    abstract getClinicalTrialSummary(): Promise<TrialEnrollmentResponse>;
    abstract getClinicalTrialEnrollmentStatus(id: string): Promise<TrialEnrollmentStatusResponse>;
    abstract getClinicalTrialEligibleCandidates(id: string, paginationDto: PaginationDto, minScore?:number): Promise<TrialElegibleCandidateResponse>;
    abstract getClinicalTrialPerformanceMetrics(groupBy: GetKpiAcrossTrialsDto): Promise<TrialPerformanceMetricsResponse>;
    abstract enrollPatientInTrial(enrollPatientDto: EnrollPatientDto, id: string): Promise<any>;
}