import { GetKpiAcrossTrialsDto, TrialPerformanceMetricsResponse } from "../../../dtos";
import { ClinicalTrialRepository } from "../../../repositories/clinical-trial.repository";


interface GetClinicalTrialPerformanceMetricsUseCase{
    execute(groupBy: GetKpiAcrossTrialsDto): Promise<TrialPerformanceMetricsResponse>;
} 

export class GetClinicalTrialPerformanceMetrics implements GetClinicalTrialPerformanceMetricsUseCase {
    constructor(
        private readonly repository: ClinicalTrialRepository
    ){}

    async execute(groupBy: GetKpiAcrossTrialsDto): Promise<TrialPerformanceMetricsResponse> {
        return this.repository.getClinicalTrialPerformanceMetrics(groupBy);
    }
}