-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: meinecooledb
-- Generation Time: Apr 09, 2020 at 12:19 PM
-- Server version: 10.4.12-MariaDB-1:10.4.12+maria~bionic
-- PHP Version: 7.4.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


-- ============================================
--  TABLE: Player (Accounts)
-- ============================================

CREATE TABLE Player (
    player_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    level INT DEFAULT 1,
    money INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- ============================================
--  TABLE: Card (Statisches Kartendeck)
-- ============================================

CREATE TABLE Card (
    card_id INT AUTO_INCREMENT PRIMARY KEY,
    suit ENUM('Herz', 'Karo', 'Kreuz', 'Pik') NOT NULL,
    rank ENUM('7','8','9','10','B','D','K','A') NOT NULL,
    value INT NOT NULL,
    image_id VARCHAR(255)
);


-- ============================================
--  TABLE: Game (Ein einzelnes Spiel)
-- ============================================

CREATE TABLE Game (
    game_id INT AUTO_INCREMENT PRIMARY KEY,
    status ENUM('waiting','playing','finished') DEFAULT 'waiting',
    round_number INT DEFAULT 0,
    current_player_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    finished_at TIMESTAMP NULL,

    CONSTRAINT fk_game_current_player
        FOREIGN KEY (current_player_id)
        REFERENCES Player(player_id)
        ON DELETE SET NULL
);


-- ============================================
--  TABLE: Game_Player (Spieler in einem Spiel)
-- ============================================

CREATE TABLE Game_Player (
    game_id INT NOT NULL,
    player_id INT NOT NULL,
    socket_id VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    lives INT DEFAULT 3,

    PRIMARY KEY (game_id, player_id),

    CONSTRAINT fk_gp_game
        FOREIGN KEY (game_id)
        REFERENCES Game(game_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_gp_player
        FOREIGN KEY (player_id)
        REFERENCES Player(player_id)
        ON DELETE CASCADE
);


-- ============================================
--  TABLE: Game_Card (Karten im Spiel)
-- ============================================

CREATE TABLE Game_Card (
    game_id INT NOT NULL,
    card_id INT NOT NULL,
    location ENUM('deck','table','player','discard') NOT NULL,
    owner_player_id INT NULL,
    position INT DEFAULT 0,

    PRIMARY KEY (game_id, card_id),

    CONSTRAINT fk_gc_game
        FOREIGN KEY (game_id)
        REFERENCES Game(game_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_gc_card
        FOREIGN KEY (card_id)
        REFERENCES Card(card_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_gc_owner
        FOREIGN KEY (owner_player_id)
        REFERENCES Player(player_id)
        ON DELETE SET NULL
);

