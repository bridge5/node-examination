CREATE DATABASE IF NOT EXISTS INTERVIEW DEFAULT CHARSET utf8 COLLATE utf8_general_ci;

CREATE TABLE `player_info` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `player_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `position` char(10) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;