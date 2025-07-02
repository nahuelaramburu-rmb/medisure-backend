import { Request, Response } from "express";
import { 
    AppointmentRepository, 
    CreateAppointment, 
    CreateAppointmentDto, 
    DeleteAppointment, 
    GetAppointment, 
    GetAppointments, 
    UpdateAppointment, 
    UpdateAppointmentDto 
} from "../../domain";
 
import { handleError } from "../helpers/errors";
 

export class AppointmentContoller{
    constructor(
        private readonly appointmentRepository: AppointmentRepository
    ){}

    getAllAppointments = (req: Request, res: Response) => {
        new GetAppointments(this.appointmentRepository)
            .execute()
            .then (appointments => {
                res.status(200).json({
                    msg: "ok",
                    appointments
                });
            })
            .catch( error => handleError(error, res));
    }

    getAppointmentById = (req: Request, res: Response) => {
        const id = req.params.id;
        new GetAppointment(this.appointmentRepository)
            .execute(id)
            .then(appointment => {
                res.status(200).json({
                    msg: "ok",
                    appointment
                });
            })
            .catch(error => handleError(error, res));
        }

    createAppointmnent = (req: Request, res: Response) => {
        const [ error, createAppointentDto ] = CreateAppointmentDto.create(req.body);
        if ( error ) return res.status(400).json({ error });
        new CreateAppointment(this.appointmentRepository)
            .execute( createAppointentDto! )
            .then(appointment => {
                res.status(201).json({
                    msg: "ok",
                    appointment
                });
            })
            .catch(error => handleError(error, res));
    }

    updateAppointment = (req: Request, res: Response) => {
        const id = req.params.id;
        const [ error, updateAppointmentDto ] = UpdateAppointmentDto.create({...req.body, id}); // <-- agrega el id aquí
        if ( error ) return res.status(400).json({ error });
        
        new UpdateAppointment(this.appointmentRepository)
            .execute( updateAppointmentDto! )
            .then( appointment => res.json({ msg: "ok", appointment }))
            .catch(error => handleError(error, res));
    }

    deleteAppointment = (req: Request, res: Response) => {
        const id = req.params.id;
        new DeleteAppointment(this.appointmentRepository)
            .execute(id)
            .then(appointment => {
                res.status(200).json({
                    msg: "ok",
                    appointment
                });
            })
            .catch(error => handleError(error, res));
        }
}