/**
 * @swagger
 * tags:
 *   name: Appointments
 *   description: Appointment management endpoints
 */

/**
 * @swagger
 * /v1/api/appointments:
 *   get:
 *     summary: Get all appointments
 *     tags: [Appointments]
 *     responses:
 *       200:
 *         description: List all appointments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Appointment'
 * /v1/api/appointments/create:
 *   post:
 *     summary: Create a new appointment
 *     tags: [Appointments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AppointmentInput'
 *     responses:
 *       201:
 *         description: Appointment created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Appointment'
 *       409:
 *         description: Appointment conflict
 */

/**
 * @swagger
 * /v1/api/appointments/{id}:
 *   get:
 *     summary: Get an appointment by ID
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Appointment found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Appointment'
 *       404:
 *         description: Appointment not found
 *   put:
 *     summary: Update an appointment by ID
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AppointmentInput'
 *     responses:
 *       200:
 *         description: Appointment updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Appointment'
 *       404:
 *         description: Appointment not found
 *   delete:
 *     summary: Delete an appointment by ID
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Appointment deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *       404:
 *         description: Appointment not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Appointment:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         patient_id:
 *           type: string
 *         doctor_id:
 *           type: string
 *         appointment_date:
 *           type: string
 *           format: date-time
 *         type:
 *           type: string
 *           enum: [consultation, follow_up, emergency, other]
 *         status:
 *           type: string
 *           enum: [scheduled, completed, cancelled, no_show]
 *         notes:
 *           type: string
 *           nullable: true
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *     AppointmentInput:
 *       type: object
 *       properties:
 *         patient_id:
 *           type: string
 *         doctor_id:
 *           type: string
 *         appointment_date:
 *           type: string
 *           format: date-time
 *         type:
 *           type: string
 *           enum: [consultation, follow_up, emergency, other]
 *         status:
 *           type: string
 *           enum: [scheduled, completed, cancelled, no_show]
 *         notes:
 *           type: string
 *       required:
 *         - patient_id
 *         - doctor_id
 *         - appointment_date
 *         - type
 *         - status
 */