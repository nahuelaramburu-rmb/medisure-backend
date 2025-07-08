import { ExportService } from "../../../presentation/services/export.service";
import { ExportPatientsDto } from "../../dtos";
import { PatientRepository } from "../../repositories/patient.repository";

interface DataExport{
    data:string;
    filename:string;
    contentType:string;
}


interface ExportPatientsUseCase{
    execute(dto: ExportPatientsDto):Promise<DataExport>
}

export class ExportPatients implements ExportPatientsUseCase{
    constructor(
        private readonly repository: PatientRepository
    ){}
    async execute(dto: ExportPatientsDto): Promise<DataExport> {
        const patients = dto.startDate || dto.endDate
            ? await this.repository.getPatientsByDateRange(dto.startDate, dto.endDate)
            : await this.repository.getAll();

        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const dataRange = dto.startDate || dto.endDate
            ? `_${dto.startDate?.toISOString().split('T')[0]}_${dto.endDate?.toISOString().split('T')[0]}`
            : '_all';
        const filename = `patients_export${dataRange}_${timestamp}.${dto.format}`;
        let data: string;
        let contentType: string;
        switch (dto.format){
            case 'csv':
                data = ExportService.exportToCSV(patients);
                contentType = 'text/csv';
                break;
            case 'xml':
                data = ExportService.exportToXML(patients);
                contentType = 'application/xml';
                break;
            default:
                data = ExportService.exportToJSON(patients);
                contentType = 'application/json';
                break;
        }
        return { data, filename, contentType}; 
    }
}