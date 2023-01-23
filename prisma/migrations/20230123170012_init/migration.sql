-- CreateTable
CREATE TABLE `Speech` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `name` VARCHAR(191) NOT NULL,
    `speech_type` VARCHAR(191) NOT NULL,
    `years` VARCHAR(191) NOT NULL,
    `speech` VARCHAR(191) NOT NULL,
    `belongsToId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Speech` ADD CONSTRAINT `Speech_belongsToId_fkey` FOREIGN KEY (`belongsToId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
