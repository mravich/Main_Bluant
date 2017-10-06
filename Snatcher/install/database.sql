-- MySQL Script generated by MySQL Workbench
-- 06/14/17 09:40:56
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema analyzer
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema analyzer
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `analyzer` DEFAULT CHARACTER SET utf8 ;
USE `analyzer` ;

-- -----------------------------------------------------
-- Table `analyzer`.`scrap`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `analyzer`.`scrap` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_user` INT UNSIGNED NULL DEFAULT 0,
  `url` VARCHAR(512) NOT NULL,
  `date` DATE NOT NULL,
  `time` TIME NOT NULL,
  `status` INT(4) NOT NULL,
  `private` TINYINT(1) NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `analyzer`.`headings`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `analyzer`.`headings` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_scrap` INT UNSIGNED NOT NULL,
  `text` VARCHAR(512) NULL DEFAULT NULL,
  `value` INT(3) NOT NULL,
  `orderby` INT(6) NOT NULL,
  INDEX `headers_scrap_idx` (`id_scrap` ASC),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  CONSTRAINT `headers_scrap`
    FOREIGN KEY (`id_scrap`)
    REFERENCES `analyzer`.`scrap` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `analyzer`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `analyzer`.`user` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `password` VARCHAR(128) NOT NULL,
  `username` VARCHAR(24) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `analyzer`.`logins`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `analyzer`.`logins` (
  `id_user` INT UNSIGNED NOT NULL,
  `ip` VARCHAR(48) NOT NULL,
  `date` DATE NOT NULL,
  `time` TIME NOT NULL,
  CONSTRAINT `id_user`
    FOREIGN KEY (`id_user`)
    REFERENCES `analyzer`.`user` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `analyzer`.`child_urls`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `analyzer`.`child_urls` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_scrap` INT UNSIGNED NOT NULL,
  `url` VARCHAR(512) NOT NULL,
  INDEX `child_scrap_scrap_idx` (`id_scrap` ASC),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  CONSTRAINT `child_scrap_scrap`
    FOREIGN KEY (`id_scrap`)
    REFERENCES `analyzer`.`scrap` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `analyzer`.`https`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `analyzer`.`https` (
  `id_scrap` INT UNSIGNED NOT NULL,
  `length` INT(7) NULL DEFAULT NULL,
  `type` VARCHAR(24) NULL DEFAULT NULL,
  `server` VARCHAR(128) NULL DEFAULT NULL,
  UNIQUE INDEX `id_scrap_UNIQUE` (`id_scrap` ASC),
  CONSTRAINT `https_scrap`
    FOREIGN KEY (`id_scrap`)
    REFERENCES `analyzer`.`scrap` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `analyzer`.`htmls`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `analyzer`.`htmls` (
  `id_scrap` INT UNSIGNED NOT NULL,
  `title` VARCHAR(128) NULL DEFAULT NULL,
  `charset` VARCHAR(24) NULL DEFAULT NULL,
  UNIQUE INDEX `id_scrap_UNIQUE` (`id_scrap` ASC),
  CONSTRAINT `htmls_scrap`
    FOREIGN KEY (`id_scrap`)
    REFERENCES `analyzer`.`scrap` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
