-- CreateTable
CREATE TABLE "patient_consents" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "patient_id" UUID NOT NULL,
    "is_accepted" BOOLEAN NOT NULL,
    "revoked_at" TIMESTAMP(3),
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "patient_consents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "access_logs" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "patient_consent_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "accessed_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "access_type" VARCHAR(50) NOT NULL,
    "ip_address" INET,

    CONSTRAINT "access_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_patient_consents_patient_id" ON "patient_consents"("patient_id");

-- CreateIndex
CREATE INDEX "idx_access_logs_patient_consent_id" ON "access_logs"("patient_consent_id");

-- CreateIndex
CREATE INDEX "idx_access_logs_user_id" ON "access_logs"("user_id");

-- AddForeignKey
ALTER TABLE "patient_consents" ADD CONSTRAINT "patient_consents_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "access_logs" ADD CONSTRAINT "access_logs_patient_consent_id_fkey" FOREIGN KEY ("patient_consent_id") REFERENCES "patient_consents"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "access_logs" ADD CONSTRAINT "access_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
