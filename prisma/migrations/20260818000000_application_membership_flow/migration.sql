-- Incremental migration for the application -> approval -> membership flow.
-- Existing Affiliate, Payment and Membership rows are preserved.

CREATE TYPE "ApplicationStatus" AS ENUM ('DRAFT', 'SUBMITTED', 'UNDER_REVIEW', 'INITIAL_CONSULTATION', 'AWAITING_INFORMATION', 'APPROVED', 'REJECTED', 'PAYMENT_PENDING', 'ACTIVE', 'PAYMENT_PAST_DUE', 'CANCELLED');
CREATE TYPE "ComplexityLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');
CREATE TYPE "EvaluationRecommendation" AS ENUM ('APPROVE', 'REQUEST_INFORMATION', 'REJECT', 'PENDING');
CREATE TYPE "MembershipPlanStatus" AS ENUM ('ACTIVE', 'INACTIVE');

ALTER TYPE "MembershipStatus" ADD VALUE IF NOT EXISTS 'PENDING';
ALTER TYPE "MembershipStatus" ADD VALUE IF NOT EXISTS 'PAST_DUE';

ALTER TABLE "affiliates" ADD COLUMN "responsibleUserId" UUID;
ALTER TABLE "affiliates" ADD CONSTRAINT "affiliates_responsibleUserId_fkey" FOREIGN KEY ("responsibleUserId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
CREATE INDEX "affiliates_responsibleUserId_idx" ON "affiliates"("responsibleUserId");

CREATE TABLE "applications" (
  "id" UUID NOT NULL,
  "accessToken" TEXT NOT NULL,
  "affiliateId" UUID NOT NULL,
  "status" "ApplicationStatus" NOT NULL DEFAULT 'DRAFT',
  "legalArea" TEXT,
  "urgency" TEXT,
  "submittedAt" TIMESTAMP(3),
  "reviewedAt" TIMESTAMP(3),
  "informationRequested" TEXT,
  "rejectionReason" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "applications_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "applications_accessToken_key" ON "applications"("accessToken");
CREATE UNIQUE INDEX "applications_affiliateId_key" ON "applications"("affiliateId");
CREATE INDEX "applications_status_idx" ON "applications"("status");
CREATE INDEX "applications_legalArea_idx" ON "applications"("legalArea");
CREATE INDEX "applications_createdAt_idx" ON "applications"("createdAt");
ALTER TABLE "applications" ADD CONSTRAINT "applications_affiliateId_fkey" FOREIGN KEY ("affiliateId") REFERENCES "affiliates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

CREATE TABLE "application_answers" (
  "id" UUID NOT NULL,
  "applicationId" UUID NOT NULL,
  "questionKey" TEXT NOT NULL,
  "answer" JSONB NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "application_answers_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "application_answers_applicationId_questionKey_key" ON "application_answers"("applicationId", "questionKey");
ALTER TABLE "application_answers" ADD CONSTRAINT "application_answers_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE "application_documents" (
  "id" UUID NOT NULL,
  "applicationId" UUID NOT NULL,
  "fileName" TEXT NOT NULL,
  "blobPath" TEXT NOT NULL,
  "contentType" TEXT NOT NULL,
  "size" INTEGER NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "application_documents_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "application_documents_applicationId_idx" ON "application_documents"("applicationId");
ALTER TABLE "application_documents" ADD CONSTRAINT "application_documents_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE "application_evaluations" (
  "id" UUID NOT NULL,
  "applicationId" UUID NOT NULL,
  "reviewerId" UUID NOT NULL,
  "complexity" "ComplexityLevel",
  "viability" TEXT,
  "urgency" TEXT,
  "estimatedEffort" TEXT,
  "internalNotes" TEXT,
  "recommendation" "EvaluationRecommendation" NOT NULL DEFAULT 'PENDING',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "application_evaluations_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "application_evaluations_applicationId_idx" ON "application_evaluations"("applicationId");
CREATE INDEX "application_evaluations_reviewerId_idx" ON "application_evaluations"("reviewerId");
ALTER TABLE "application_evaluations" ADD CONSTRAINT "application_evaluations_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "application_evaluations" ADD CONSTRAINT "application_evaluations_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

CREATE TABLE "membership_plans" (
  "id" UUID NOT NULL,
  "name" TEXT NOT NULL,
  "monthlyPrice" DECIMAL(12,2) NOT NULL,
  "benefits" JSONB NOT NULL,
  "conditions" TEXT,
  "exclusions" TEXT,
  "status" "MembershipPlanStatus" NOT NULL DEFAULT 'ACTIVE',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "membership_plans_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "membership_plans_status_idx" ON "membership_plans"("status");

ALTER TABLE "memberships" ADD COLUMN "planId" UUID;
ALTER TABLE "memberships" ADD CONSTRAINT "memberships_planId_fkey" FOREIGN KEY ("planId") REFERENCES "membership_plans"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "payments" ADD COLUMN "applicationId" UUID;
ALTER TABLE "payments" ADD COLUMN "planId" UUID;
ALTER TABLE "payments" ADD CONSTRAINT "payments_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "payments" ADD CONSTRAINT "payments_planId_fkey" FOREIGN KEY ("planId") REFERENCES "membership_plans"("id") ON DELETE SET NULL ON UPDATE CASCADE;
CREATE INDEX "payments_applicationId_idx" ON "payments"("applicationId");
CREATE INDEX "payments_planId_idx" ON "payments"("planId");
