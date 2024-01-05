-- CreateTable
CREATE TABLE "ClientSecret" (
    "id" SERIAL NOT NULL,
    "secret" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "applicationId" INTEGER NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClientSecret_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ClientSecret_secret_key" ON "ClientSecret"("secret");

-- AddForeignKey
ALTER TABLE "ClientSecret" ADD CONSTRAINT "ClientSecret_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE CASCADE ON UPDATE CASCADE;
