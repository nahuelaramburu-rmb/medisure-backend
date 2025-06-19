import { Request, Response } from "express";
import { AppointmentRepository, CreateAppointmentDto, UpdateAppointmentDto } from "../../domain";
import { GetAppointments } from "../../domain/use-cases/appointments/get-appointments";
import { handleError } from "../helpers/errors";
import { GetAppointment } from "../../domain/use-cases/appointments/get-appointment";
import { CreateAppointment } from "../../domain/use-cases/appointments/create-appointment";
import { create } from "domain";
import { UpdateAppointment } from "../../domain/use-cases/appointments/update-appointment";
import { DeleteAppointment } from "../../domain/use-cases/appointments/delete-appointment";


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
            .catch( error => handleError(res, error));
    }

    getAppointmentById = (req: Request, res: Response) => {
        const { id } = req.params;
        new GetAppointment(this.appointmentRepository)
            .execute(id)
            .then(appointment => {
                res.status(200).json({
                    msg: "ok",
                    appointment
                });
            })
            .catch(error => handleError(res, error));
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
            .catch(error => handleError(res, error));
    }

    updateAppointment = (req: Request, res: Response) => {
        const { id } = req.params;
        const [ error, updateAppointmentDto ] = UpdateAppointmentDto.create(req.body);
        if ( error ) return res.status(400).json({ error });
        
        new UpdateAppointment(this.appointmentRepository)
            .execute( updateAppointmentDto! )
            .then( appointment => res.json({ msg: "ok", appointment }))
            .catch(error => handleError(res, error));
    }

    deleteAppointment = (req: Request, res: Response) => {
        const { id } = req.params;
        new DeleteAppointment(this.appointmentRepository)
            .execute(id)
            .then(appointment => {
                res.status(200).json({
                    msg: "ok",
                    appointment
                });
            })
            .catch(error => handleError(res, error));
        }
}