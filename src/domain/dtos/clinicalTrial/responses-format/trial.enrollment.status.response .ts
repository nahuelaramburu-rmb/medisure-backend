export interface TrialStatusBreakdown  {
    active: number;
    completed: number;
    suspended: number;
    terminated: number;
    planning: number;

}

export interface TrialEnrollmentStatusResponse {
    total_trials: number;
    status_breakdown: TrialStatusBreakdown;
    total_patients_enrolled: number;

}