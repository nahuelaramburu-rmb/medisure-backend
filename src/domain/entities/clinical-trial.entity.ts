

export class ClinicalTrialEntity {
    constructor(
        public id: string,
        public trial_identifier: string,
        public title: string,
        public status: string,
        public patient_count: number,
        public phase?: string,
        public start_date?: Date,
        public end_date?: Date, 
        public principal_investigator_id?: string,

    ){}

    public static fromObject(object: { [key: string]: any }): ClinicalTrialEntity {
        const { id, trial_identifier, title, status,patient_count, phase, start_date, end_date, principal_investigator_id } = object;
        if (!id) throw 'Missing Id';
        if (!trial_identifier) throw 'Missing Trial Identifier';
        if (!title) throw 'Missing Title';
        if (!status) throw 'Missing Status';
        if (! patient_count ) throw 'Missing Patient Count ID';
        
        let newStartDate;
        if( start_date ){
            newStartDate = new Date(start_date);
            if (isNaN(newStartDate.getTime())) throw ['start_date must be a valid date'];
        }
        let newEndDate;
        if( end_date ){
            newEndDate = new Date(end_date);
            if (isNaN(newEndDate.getTime())) throw ['start_date must be a valid date'];
        }
        
        return new ClinicalTrialEntity(
            id,
            trial_identifier,
            title,
            status,
            patient_count,
            phase,
            newStartDate,
            newEndDate,
            principal_investigator_id,
            
        );
    }
}