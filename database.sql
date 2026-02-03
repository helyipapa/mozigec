-- Szabadság Mozi Database Setup
-- Created: 2026-01-30

-- Create database
CREATE DATABASE IF NOT EXISTS szabadsagmozi CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE szabadsagmozi;

-- Create movies table
CREATE TABLE IF NOT EXISTS movies (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NULL,
    poster_url VARCHAR(255) NULL,
    age_rating INT NULL,
    status VARCHAR(50) DEFAULT 'current',
    duration INT NULL COMMENT 'Duration in minutes',
    genre VARCHAR(100) NULL,
    release_date DATE NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create showtimes table
CREATE TABLE IF NOT EXISTS showtimes (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    movie_id BIGINT UNSIGNED NOT NULL,
    showtime DATETIME NOT NULL,
    hall VARCHAR(50) NULL,
    format VARCHAR(50) NULL COMMENT '2D, 3D, IMAX, etc.',
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample movies
INSERT INTO movies (title, description, poster_url, age_rating, status, duration, genre, release_date) VALUES
('Legénybúcsú', 'Alex és Simon mindketten háziorvosok és huszonegy éve elválaszthatatlanok. Most azonban Simon megnősül, így legjobb barátja egy igazán emlékezetes legénybúcsút szervez számára.', 'https://szabadsagmozi.hu/cache/images/430/poster_216x320.jpg', 12, 'current', 95, 'Vígjáték', '2026-01-15'),
('28 évvel később: A csonttemplom', 'A világtól elzárt, fertőző zombihordák uralta Angliában még élnek kis embercsoportok, akiknek sikerült megvédeniük magukat.', 'https://szabadsagmozi.hu/cache/images/450/poster_216x320.jpg', 16, 'current', 110, 'Horror', '2026-01-20'),
('SpongyaBob: Kalózkaland', 'SpongeBob és Patrick a legjobb barátok, akik újabb kalandra indulnak.', 'https://szabadsagmozi.hu/cache/images/439/poster_216x320.jpg', 0, 'current', 90, 'Animációs', '2026-01-10'),
('Magyar menyegző', 'Romantikus vígjáték egy igazi magyar esküvőről.', 'https://szabadsagmozi.hu/cache/images/436/poster_216x320.jpg', 12, 'current', 100, 'Romantikus vígjáték', '2026-01-25'),
('Zootropolis 2.', 'Az animációs film folytatása, ahol állatok élnek együtt egy modern városban.', 'https://szabadsagmozi.hu/cache/images/446/poster_216x320.jpg', 0, 'current', 105, 'Animációs', '2026-02-01'),
('Sikoly 7.', 'A klasszikus horror franchise hetedik része.', 'https://szabadsagmozi.hu/cache/images/458/poster_216x320.jpg', 18, 'coming_soon', 120, 'Horror', '2026-03-15'),
('Star Wars: A mandalóri és Grogu', 'Az új Star Wars film a Mandalorianról és Groguról.', 'https://via.placeholder.com/216x320?text=Star+Wars', 12, 'coming_soon', 140, 'Sci-Fi', '2026-05-01');

-- Insert sample showtimes
INSERT INTO showtimes (movie_id, showtime, hall, format) VALUES
(1, '2026-01-30 17:00:00', 'M', '2D'),
(2, '2026-01-30 19:30:00', 'M', '2D'),
(1, '2026-01-31 15:00:00', 'M', '2D'),
(2, '2026-01-31 20:00:00', 'M', '2D'),
(3, '2026-01-31 14:00:00', 'M', '2D'),
(4, '2026-02-01 18:00:00', 'M', '2D'),
(5, '2026-02-01 16:00:00', 'M', '2D');

-- Create indexes for better performance
CREATE INDEX idx_movies_status ON movies(status);
CREATE INDEX idx_showtimes_movie_id ON showtimes(movie_id);
CREATE INDEX idx_showtimes_showtime ON showtimes(showtime);
