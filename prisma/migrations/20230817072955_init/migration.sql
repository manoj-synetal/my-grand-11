-- AlterTable
ALTER TABLE "AppSetting" ADD COLUMN     "howToPlay" TEXT,
ADD COLUMN     "logo" TEXT,
ALTER COLUMN "name" DROP NOT NULL;
