import { PatientEntity } from "../../domain";

export class ExportService {
    static exportToJSON(patients: PatientEntity[]): string {
        return JSON.stringify({
            exported_at: new Date().toISOString(),
            total_count: patients.length,
            patients: patients
        }, null, 2);
    }

    static exportToCSV(patients: PatientEntity[]): string {
        if (patients.length === 0) return 'No patients found';

        const headers = [
            'ID',
            'Medical Record Number',
            'First Name',
            'Last Name',
            'Date of Birth',
            'Gender',
            'Phone',
            'Email',
            'Blood Type',
            'Emergency Contact Name',
            'Emergency Contact Phone',
            'Primary Doctor ID',
            'Created By User ID',
            
        ];

        const csvRows = patients.map(patient => [
            patient.id,
            patient.medical_record_number,
            patient.first_name,
            patient.last_name,
            patient.date_of_birth ? patient.date_of_birth.toISOString().split('T')[0] : '',
            patient.gender || '',
            patient.phone || '',
            patient.email || '',
            patient.blood_type || '',
            patient.emergency_contact_name || '',
            patient.emergency_contact_phone || '',
            patient.primary_doctor_id || '',
            patient.created_by_user_id,
            
        ]);

        return [headers, ...csvRows]
            .map(row => row.map(field => `"${field}"`).join(','))
            .join('\n');
    }

    static exportToXML(patients: PatientEntity[]): string {
        const xmlPatients = patients.map(patient => `
    <patient>
        <id>${patient.id}</id>
        <medical_record_number>${patient.medical_record_number}</medical_record_number>
        <first_name>${patient.first_name}</first_name>
        <last_name>${patient.last_name}</last_name>
        <date_of_birth>${patient.date_of_birth ? patient.date_of_birth.toISOString().split('T')[0] : ''}</date_of_birth>
        <gender>${patient.gender || ''}</gender>
        <phone>${patient.phone || ''}</phone>
        <email>${patient.email || ''}</email>
        <blood_type>${patient.blood_type || ''}</blood_type>
        <emergency_contact_name>${patient.emergency_contact_name || ''}</emergency_contact_name>
        <emergency_contact_phone>${patient.emergency_contact_phone || ''}</emergency_contact_phone>
        <primary_doctor_id>${patient.primary_doctor_id || ''}</primary_doctor_id>
        <created_by_user_id>${patient.created_by_user_id}</created_by_user_id>
        
    </patient>`).join('');

        return `<?xml version="1.0" encoding="UTF-8"?>
<patients>
    <exported_at>${new Date().toISOString()}</exported_at>
    <total_count>${patients.length}</total_count>${xmlPatients}
</patients>`;
    }
}