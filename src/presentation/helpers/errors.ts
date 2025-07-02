import { Response } from 'express';
import { CustomError } from '../../domain';


export function handleError(error: any, res: Response) {
    if (error.code === 'P2003'){
        return res.status(400).json({
            error: 'Foreign key constraint violated on the constraint',
            details: error.meta?.cause
        })
    }
    if (error.code === 'P2002') {
        // Unique constraint failed
        return res.status(409).json({
            error: "Unique constraint failed. Duplicate value.",
            details: error.meta
        });
    }
    if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ error: error.message });
    }
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
}