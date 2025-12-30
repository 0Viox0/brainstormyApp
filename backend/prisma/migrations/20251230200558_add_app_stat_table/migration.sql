-- CreateTable
CREATE TABLE `AppStats` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `totalYandexRegisteredUsers` INTEGER NOT NULL,
    `totalGoogleRegisteredUsers` INTEGER NOT NULL,
    `generatorUses` INTEGER NOT NULL,
    `scamperUses` INTEGER NOT NULL,
    `sixHatsUses` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
