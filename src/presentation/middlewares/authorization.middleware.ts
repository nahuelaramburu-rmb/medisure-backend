import { Request, Response, NextFunction } from "express";
import { prisma } from "../../data/postgres";
import { UserEntity } from "../../domain";

interface AuthenticatedRequest extends Request{
    user?: UserEntity;
}

export class AuthorizationMiddleware {
    static authorize(resource: string, action: string) {
        return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
            const user = req.user;
            if (!user) {
                res.status(401).json({ error: "Unauthorized" });
                return;
            }

            const role = await prisma.roles.findUnique({
                where: { id: user.role_id },
            });

            if (!role || !role.permissions) {
                res.status(403).json({ error: "Token must include user role and permissions" });
                return;
            }

            let permissions: Record<string, string[]>;
            try {
                permissions = typeof role.permissions === "string"
                    ? JSON.parse(role.permissions)
                    : role.permissions;
            } catch {
                res.status(500).json({ error: "Role permissions are not valid JSON" });
                return;
            }

            const allowedActions = permissions[resource];
            if (!allowedActions || !allowedActions.includes(action)) {
                res.status(403).json({
                    error: `User role '${role.name}' does not have permission to '${action}' on '${resource}'`
                });
                return;
            }

            next();
        };
    }
}