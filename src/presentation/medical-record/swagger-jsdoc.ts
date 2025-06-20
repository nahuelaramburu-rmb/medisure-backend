/**
 * @swagger
 * tags:
 *   name: MedicalRecords
 *   description: Medical records management endpoints
 */

/**
 * @swagger
 * /v1/api/medical-records:
 *   get:
 *     summary: Get all medical records
 *     tags: [MedicalRecords]
 *     responses:
 *       200:
 *         description: List all medical records
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
 *                     $ref: '#/components/schemas/MedicalRecord'
 * /v1/api/medical-records/create:
 *   post:
 *     summary: Create a new medical record
 *     tags: [MedicalRecords]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MedicalRecordInput'
 *     responses:
 *       201:
 *         description: Medical record created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/MedicalRecord'
 *       409:
 *         description: Conflict (duplicate or invalid data)
 */

/**
 * @swagger
 * /api/medical-records/{id}:
 *   get:
 *     summary: Get a medical record by ID
 *     tags: [MedicalRecords]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Medical record found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/MedicalRecord'
 *       404:
 *         description: Medical record not found
 *   put:
 *     summary: Update a medical record by ID
 *     tags: [MedicalRecords]
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
 *             $ref: '#/components/schemas/MedicalRecordInput'
 *     responses:
 *       200:
 *         description: Medical record updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/MedicalRecord'
 *       404:
 *         description: Medical record not found
 *   delete:
 *     summary: Delete a medical record by ID
 *     tags: [MedicalRecords]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Medical record deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *       404:
 *         description: Medical record not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     MedicalRecord:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         patient_id:
 *           type: string
 *         document_id:
 *           type: string
 *           nullable: true
 *         record_type:
 *           type: string
 *           enum: [diagnosis, medication, procedure, lab_result, vital_signs, allergy, immunization]
 *         record_date:
 *           type: string
 *           format: date
 *         data:
 *           type: object
 *         confidence_score:
 *           type: number
 *           format: float
 *           minimum: 0
 *           maximum: 1
 *           nullable: true
 *         verified_by_user_id:
 *           type: string
 *           nullable: true
 *         verified_at:
 *           type: string
 *           format: date-time
 *           nullable: true
 *         created_by_user_id:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *     MedicalRecordInput:
 *       type: object
 *       properties:
 *         patient_id:
 *           type: string
 *         document_id:
 *           type: string
 *         record_type:
 *           type: string
 *           enum: [diagnosis, medication, procedure, lab_result, vital_signs, allergy, immunization]
 *         record_date:
 *           type: string
 *           format: date
 *         data:
 *           type: object
 *         confidence_score:
 *           type: number
 *           format: float
 *           minimum: 0
 *           maximum: 1
 *         verified_by_user_id:
 *           type: string
 *         verified_at:
 *           type: string
 *           format: date-time
 *         created_by_user_id:
 *           type: string
 *       required:
 *         - patient_id
 *         - record_type
 *         - record_date
 *         - data
 *         - created_by_user_id
 */