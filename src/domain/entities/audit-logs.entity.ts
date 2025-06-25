import { ActionType } from "../enums";



export class AuditLogsEntity{
    constructor(
        public id: string,
        public user_id: string,
        public action: ActionType,
        public entity_type: string,
        public entity_id: string,
        public changes: Record<string, any>, 
        public ip_address: string 
        ){}

        static fromObject(object:{[key:string]:any} ):AuditLogsEntity{
            const {
                id,
                user_id,
                action,
                entity_type,
                entity_id,
                changes,
                ip_address
            } = object;
            if (!user_id) throw new Error('Missing user_id');
            if (!action) throw new Error('Missing action');
            if (!entity_type) throw new Error('Missing entity_type');
            if (!entity_id) throw new Error('Missing entity_id');
            if (!changes) throw new Error('Missing changes');
            if (!ip_address) throw new Error('Missing ip_address');

            

            return new AuditLogsEntity(
                id,
                user_id,
                action,
                entity_type,
                entity_id,
                changes,
                ip_address
            )
        }
}