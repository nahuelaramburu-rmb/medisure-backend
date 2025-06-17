/**
 * @swagger
 * tags:
 *   name: Patients
 *   description: Patient management endpoints
 */

/**
 * @swagger
 * /api/patients:
 *   get:
 *     summary: Get all patients
 *     tags: [Patients]
 *     responses:
 *       200:
 *         description: List all patients
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
 *                     $ref: '#/components/schemas/Patient'
 *   post:
 *     summary: Create a new patient
 *     tags: [Patients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PatientInput'
 *     responses:
 *       201:
 *         description: Patient created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Patient'
 *       409:
 *         description: Medical record number already exists
 */

/**
 * @swagger
 * /api/patients/{id}:
 *   get:
 *     summary: Get a patient by ID
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Patient found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Patient'
 *       404:
 *         description: Patient not found
 *   put:
 *     summary: Update a patient by ID
 *     tags: [Patients]
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
 *             $ref: '#/components/schemas/PatientInput'
 *     responses:
 *       200:
 *         description: Patient updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Patient'
 *       404:
 *         description: Patient not found
 *   delete:
 *     summary: Delete a patient by ID
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Patient deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *       404:
 *         description: Patient not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Patient:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         medical_record_number:
 *           type: string
 *         first_name:
 *           type: string
 *         last_name:
 *           type: string
 *         date_of_birth:
 *           type: string
 *           format: date
 *         gender:
 *           type: string
 *           enum: [male, female, other, unknown]
 *         phone:
 *           type: string
 *           nullable: true
 *         email:
 *           type: string
 *           nullable: true
 *         blood_type:
 *           type: string
 *           nullable: true
 *         emergency_contact_name:
 *           type: string
 *           nullable: true
 *         emergency_contact_phone:
 *           type: string
 *           nullable: true
 *         primary_doctor_id:
 *           type: string
 *         created_by_user_id:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *     PatientInput:
 *       type: object
 *       properties:
 *         medical_record_number:
 *           type: string
 *         first_name:
 *           type: string
 *         last_name:
 *           type: string
 *         date_of_birth:
 *           type: string
 *           format: date
 *         gender:
 *           type: string
 *           enum: [male, female, other, unknown]
 *         phone:
 *           type: string
 *         email:
 *           type: string
 *         blood_type:
 *           type: string
 *         emergency_contact_name:
 *           type: string
 *         emergency_contact_phone:
 *           type: string
 *         primary_doctor_id:
 *           type: string
 *         created_by_user_id:
 *           type: string
 *       required:
 *         - medical_record_number
 *         - first_name
 *         - last_name
 *         - date_of_birth
 *         - gender
 *         - created_by_user_id
 *         - primary_doctor_id
 */