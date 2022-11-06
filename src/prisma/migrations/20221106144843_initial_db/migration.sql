-- CreateTable
CREATE TABLE `Book` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `year` INTEGER NOT NULL,
    `author` VARCHAR(191) NOT NULL,
    `summary` TEXT NOT NULL,
    `publisher` VARCHAR(191) NOT NULL,
    `pageCount` INTEGER NOT NULL,
    `readPage` INTEGER NOT NULL,
    `finished` BOOLEAN NOT NULL DEFAULT false,
    `reading` BOOLEAN NOT NULL,
    `insertedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
