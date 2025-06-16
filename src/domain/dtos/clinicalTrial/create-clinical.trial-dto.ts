

export class CreateClinicalTrialDto{
    private constructor(
            public readonly trial_identifier: string,
            public readonly title: string,
            public readonly status: string,
            public readonly phase: string,
            public readonly start_date: Date,
            public readonly end_date: Date,
            public readonly principal_investigator_id: string,
            public readonly patient_count: number,

    ){}

    static create (props: {[key:string]:any}): [string?,CreateClinicalTrialDto?] {
        const { trial_identifier, title, status, phase, start_date, end_date, principal_investigator_id, patient_count } = props;

        if (!title) return ['Missing Title'];
        if (!status) return ['Missing Status'];
        if ( !patient_count ) return ['Missing patient count'];

        if (typeof title !== 'string') return ['Title must be a string'];
        if (typeof status !== 'string') return ['Status must be a string'];
        if ( typeof patient_count !== 'number' || isNaN(patient_count) || patient_count < 0 ) return ['Patient count must be a positive number'];
         
        if (typeof principal_investigator_id !== 'string') return ['principal investigator id must be a string'];

        return [undefined, new CreateClinicalTrialDto( trial_identifier, title, status, phase, start_date, end_date, principal_investigator_id, patient_count)];
    }
}