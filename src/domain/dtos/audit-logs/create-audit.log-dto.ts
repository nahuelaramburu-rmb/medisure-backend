export class ExportAuditLogsDto {
    constructor(
        public from?: Date,
        public to?: Date,
    ) { }

    static create(object: { [key: string]: any }): [string?, ExportAuditLogsDto?] {
        const { from, to } = object;
        let fromDate: Date | undefined;
        let toDate: Date | undefined;

        if (from) {
            fromDate = new Date(from);
            if (isNaN(fromDate.getTime())) return ['Invalid "from" date. Use ISO format (YYYY-MM-DD or YYYY-MM-DDTHH:mm:ssZ)'];
        }
        if (to) {
            toDate = new Date(to);
            if (isNaN(toDate.getTime())) return ['Invalid "to" date. Use ISO format (YYYY-MM-DD or YYYY-MM-DDTHH:mm:ssZ)'];
        }
        return [undefined, new ExportAuditLogsDto(fromDate, toDate)];
    }
}