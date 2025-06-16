/**
 * @swagger
 * /api/clinical-trials:
 *   get:
 *     summary: Get all clinical trials
 *     tags: [ClinicalTrials]
 *     responses:
 *       200:
 *         description: List all clinical trials
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
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ClinicalTrialInput:
 *       type: object
 *       properties:
 *         trial_identifier:
 *           type: string
 *         title:
 *           type: string
 *         status:
 *           type: string
 *         phase:
 *           type: string
 *         startDate:
 *           type: string
 *           format: date
 *         endDate:
 *           type: string
 *           format: date
 *       required:
 *         - trial_identifier
 *         - title
 *         - status
 *         - phase
 *         - startDate
 */