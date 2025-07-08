import { Validators } from "../../../config";

export class ExportPatientsDto {
    constructor(
        public format: 'json' | 'csv' | 'xml' = 'json',
        public startDate?: Date,
        public endDate?: Date
    ) {}

    static create(object: { [key: string]: any }): [string?, ExportPatientsDto?] {
        const { format, startDate, endDate } = object;

        const validFormats = ['json', 'csv', 'xml'];
        if (format && !validFormats.includes(format)) {
            return [`Format must be one of: ${validFormats.join(', ')}`];
        }

        if (startDate && !Validators.date.test(startDate)) {
            return ['startDate must be a valid date YYYY-MM-DDTHH:mm:ss.sssZ'];
        }

        if (endDate && !Validators.date.test(endDate)) {
            return ['endDate must be a valid date YYYY-MM-DDTHH:mm:ss.sssZ'];
        }

        if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
            return ['startDate cannot be greater than endDate'];
        }

        return [
            undefined,
            new ExportPatientsDto(
                format || 'json',
                startDate ? new Date(startDate) : undefined,
                endDate ? new Date(endDate) : undefined
            )
        ];
    }
}