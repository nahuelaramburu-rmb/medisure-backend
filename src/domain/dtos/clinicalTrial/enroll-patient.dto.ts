import { Validators } from "../../../config";
import { ValidActions } from "../../enums";



export class EnrollPatientDto{
    private constructor(
        public readonly cohortId: string,
        public readonly patientId: string,
        public readonly action: ValidActions,
        public readonly notes: string, 
        public readonly enrollmentDate: Date,
        public readonly assignedCoordinator: string
    ){}

    static create (props: {[key:string]:any}): [string?,EnrollPatientDto?] {
        const { cohortId ,patientId, action, notes, enrollmentDate, assignedCoordinator } = props;
        if (!cohortId) return ['Missing cohort ID'];
        if (!patientId) return ['Missing patient ID'];
        if (!action) return ['Missing action'];
        if (!notes) return ['Missing notes'];
        if (!enrollmentDate) return ['Missing enrollment date'];
        if (!assignedCoordinator) return ['Missing assigned coordinator'];

        if ( !Validators.uuid.test(cohortId) ) return ['Cohort ID must be a valid UUID'];
        if ( !Validators.uuid.test(patientId) ) return ['Patient ID must be a valid UUID'];
        if (!Object.values(ValidActions).includes(action)) return ['Invalid action value'];
        const newEnrollmentDate = new Date(enrollmentDate);
        if (isNaN(newEnrollmentDate.getTime())) return ['Enrollment date must be a valid date'];

        if ( !Validators.uuid.test(assignedCoordinator) ) return ['Assigned coordinator must be a valid UUID'];
        return [
            undefined, 
            new EnrollPatientDto(
                cohortId,
                patientId,
                action as ValidActions,
                notes,
                newEnrollmentDate,
                assignedCoordinator
            )
        ]
    }
}