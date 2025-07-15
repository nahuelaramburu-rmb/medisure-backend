export interface TrialStatusBreakdown  {
    active: number;
    completed: number;
    suspended: number;
    terminated: number;
    planning: number;

}

export interface TrialEnrollmentResponse {
    total_trials: number;
    status_breakdown: TrialStatusBreakdown;
    total_patients_enrolled: number;

}

export interface TrialEnrollmentStatusResponse {
    trialId: string;
    trialIdentifier: string;
    title: string;
    
    //TODO: implement targetEnrollment: number in db;
    currentEnrollment: number;
    //enrollmentPercentage: number;
    status: string;
    startDate?: Date | null;
    endDate?: Date | null;
}

interface candidateFormat {
   patientId: string;
   medicalRecordNumber: string;
   name: string;
   age: number
   elegibilityScore: number;
   matchedCriteria: string;
   missingCriteria: string;

}

export interface TrialElegibleCandidateResponse{
    candidates: 
        candidateFormat[],
    totalCandidates: number;
    pagination: {
      limit: number;
      offset: number;
      hasMore: boolean;
    }
}

interface kpiFormat{
    activeTrials: number;
    //totalTargetEnrollment: number;
    currentEnrollment: number;
    //avgEnrollmentPercentage: number;
    //avgDaysToFirstPatient: number;
    //avgScreenFailureRate: number;
    //avgDropoutRate: number;
}
interface metricFormat{
    groupName: string;
    groupValue: string;
    kpis: kpiFormat;
    //topPerformer:{
       // trialId: string;
       // enrollmentRate: number;
    //}
}
export interface TrialPerformanceMetricsResponse {
    metrics: metricFormat[];
    overallMetrics: {
        totalActiveTrials: number;
        globalEnrollmentRate: number;
        //projectedTrialsOnTime: number;
        //projectedTrialsDelayed: number;
    }
    period: {
        start: Date;
        end: Date;
    }
}