/**
 * @swagger
 * tags:
 *   name: ClinicalTrials
 *   description: Clinical trials management endpoints
 */

/**
 * @swagger
 * /v1/api/clinical-trials:
 *   get:
 *     summary: Get all clinical trials
 *     tags: [ClinicalTrials]
 *     responses:
 *       200:
 *         description: List all clinical trials
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
 *                     $ref: '#/components/schemas/ClinicalTrial'
 * /v1/api/clinical-trials/create:
 *   post:
 *     summary: Create a new clinical trial
 *     tags: [ClinicalTrials]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClinicalTrialInput'
 *     responses:
 *       201:
 *         description: Clinical trial created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/ClinicalTrial'
 *       409:
 *         description: Conflict (duplicate or invalid data)
 */

/**
 * @swagger
 * /v1/api/clinical-trials/{id}:
 *   get:
 *     summary: Get a clinical trial by ID
 *     tags: [ClinicalTrials]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Clinical trial found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/ClinicalTrial'
 *       404:
 *         description: Clinical trial not found
 *   put:
 *     summary: Update a clinical trial by ID
 *     tags: [ClinicalTrials]
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
 *             $ref: '#/components/schemas/ClinicalTrialInput'
 *     responses:
 *       200:
 *         description: Clinical trial updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/ClinicalTrial'
 *       404:
 *         description: Clinical trial not found
 *   delete:
 *     summary: Delete a clinical trial by ID
 *     tags: [ClinicalTrials]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Clinical trial deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *       404:
 *         description: Clinical trial not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ClinicalTrial:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         trial_identifier:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         start_date:
 *           type: string
 *           format: date
 *         end_date:
 *           type: string
 *           format: date
 *         status:
 *           type: string
 *           enum: [planned, ongoing, completed, suspended, terminated]
 *         phase:
 *           type: string
 *           enum: [I, II, III, IV]
 *         patient_count:
 *           type: integer
 *         principal_investigator_id:
 *           type: string
 *         created_by_user_id:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *     ClinicalTrialInput:
 *       type: object
 *       properties:
 *         trial_identifier:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         start_date:
 *           type: string
 *           format: date
 *         end_date:
 *           type: string
 *           format: date
 *         status:
 *           type: string
 *           enum: [planned, ongoing, completed, suspended, terminated]
 *         phase:
 *           type: string
 *           enum: [I, II, III, IV]
 *         patient_count:
 *           type: integer
 *         principal_investigator_id:
 *           type: string
 *         created_by_user_id:
 *           type: string
 *       required:
 *         - trial_identifier
 *         - title
 *         - start_date
 *         - status
 *         - phase
 *         - patient_count
 *         - principal_investigator_id
 *         - created_by_user_id
 */