import { ActionType } from "../../enums";



export class CreateAuditLogsDto {
    private constructor(
        public user_id: string,
        public action: ActionType,
        public entity_type: string,
        public entity_id: string,
        public changes: Record<string, any>,
        public ip_address: string
    ) { }

    static create(object: { [key: string]: any }): [string?, CreateAuditLogsDto?] {
        const {
            user_id,
            action,
            entity_type,
            entity_id,
            changes,
            ip_address
        } = object;

        if (!user_id) return ['Missing user_id'];
        if (!action) return ['Missing action'];
        if (!entity_type) return ['Missing entity_type'];
        if (!entity_id) return ['Missing entity_id'];
        if (!changes) return ['Missing changes'];
        if (!ip_address) return ['Missing ip_address'];
        return [
            undefined,
            new CreateAuditLogsDto(
                user_id,
                action,
                entity_type,
                entity_id,
                changes,
                ip_address
            )
        ]
    }
}