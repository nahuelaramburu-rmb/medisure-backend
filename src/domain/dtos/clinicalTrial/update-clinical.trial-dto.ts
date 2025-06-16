

export class UpdateClinicalTrialDto{
    private constructor(
        public readonly id: string,
        public readonly trial_identifier: string,
        public readonly title: string,
        public readonly status: string,
        public readonly phase: string,
        public readonly start_date: Date,
        public readonly end_date: Date,
        public readonly principal_investigator_id: string,
        public readonly patient_count: number,
    ){}

    get values(){
        const returnObj: { [key: string]: any } = {};
        if (this.trial_identifier) returnObj.trial_identifier = this.trial_identifier;
        if (this.title) returnObj.title = this.title;
        if (this.status) returnObj.status = this.status;
        if (this.phase) returnObj.phase = this.phase;
        if (this.start_date) returnObj.start_date = this.start_date;
        if (this.end_date) returnObj.end_date = this.end_date;
        if (this.principal_investigator_id) returnObj.principal_investigator_id = this.principal_investigator_id;
        if (this.patient_count) returnObj.patient_count = this.patient_count;
        
        return returnObj;
    }

    static create(object: {[key:string]: any}): [string?, UpdateClinicalTrialDto?] {
        const { id, trial_identifier, title, status, phase, start_date, end_date, principal_investigator_id, patient_count } = object;
        if ( !trial_identifier ) return ['Missing Trial Identifier'];
        if ( !title ) return ['Missing Title'];
        if ( !status ) return ['Missing Status']; 
        if ( !patient_count ) return ['Missing Patient Count'];

        if (typeof trial_identifier !== 'string') return ['Trial Identifier must be a string'];
        if (typeof title !== 'string') return ['Title must be a string'];
        if (typeof status !== 'string') return ['Status must be a string'];
        if (typeof patient_count !== 'number' || isNaN(patient_count) || patient_count < 0) return ['Patient count must be a positive number'];
        if (typeof principal_investigator_id !== 'string') return ['Principal investigator ID must be a string'];
        //if (start_date && !(start_date instanceof Date)) return ['Start date must be a valid date'];
        //if (end_date && !(end_date instanceof Date)) return ['End date must be a valid date'];
        
        return [
            undefined,
            new UpdateClinicalTrialDto(
                id,
                trial_identifier,
                title,
                status,
                phase,
                start_date,
                end_date,
                principal_investigator_id, 
                patient_count
            )
        ];
    }

}