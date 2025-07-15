import { Validators } from "../../../config";
import { GroupBy } from "../../enums";


export class GetKpiAcrossTrialsDto {
    constructor(
        public readonly startDate: Date,
        public readonly endDate: Date,
        public readonly groupBy: GroupBy
    ){}
    static create (props: {[key:string]:any}): [string?,GetKpiAcrossTrialsDto?] {
        const { startDate, endDate, groupBy } = props;
        if (!startDate) return ['Missing start date'];
        if (!endDate) return ['Missing end date'];
        if (!groupBy) return ['Missing group by parameter'];

        

        const newStartDate = new Date(startDate);
        if (isNaN(newStartDate.getTime())) throw new Error('added_at must be a valid date');

        const newEndDate = new Date(endDate);
        if (isNaN(newEndDate.getTime())) throw new Error('added_at must be a valid date');

        if ( Validators.date.test(startDate) ) return ['Start date must be a valid date'];
        if ( Validators.date.test(endDate) ) return ['End date must be a valid date'];

        if (!Object.values(GroupBy).includes(groupBy)) return ['Invalid group by value'];

        return [
            undefined, 
            new GetKpiAcrossTrialsDto(
                newStartDate,
                newEndDate,
                groupBy as GroupBy
            )
        ]
    }
}