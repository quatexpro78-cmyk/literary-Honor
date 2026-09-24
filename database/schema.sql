CREATE DATABASE IF NOT EXISTS literary_honors
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE literary_honors;

CREATE TABLE authors (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NULL,
    password_hash VARCHAR(255) NULL,
    email_verified_at DATETIME NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY authors_email_unique (email)
) ENGINE=InnoDB;

CREATE TABLE admins (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY admins_email_unique (email)
) ENGINE=InnoDB;

CREATE TABLE submissions (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    public_id CHAR(36) NOT NULL,
    author_id BIGINT UNSIGNED NOT NULL,
    pen_name VARCHAR(150) NULL,
    book_title VARCHAR(255) NOT NULL,
    book_type VARCHAR(100) NOT NULL,
    website_url VARCHAR(2048) NULL,
    social_media VARCHAR(255) NULL,
    book_url VARCHAR(2048) NULL,
    manuscript_path VARCHAR(255) NULL,
    cover_path VARCHAR(255) NULL,
    payment_status ENUM('pending', 'verified', 'failed', 'refunded') NOT NULL DEFAULT 'pending',
    status ENUM('draft', 'awaiting_payment', 'submitted', 'under_review', 'result_date_sent', 'reviewed', 'winner', 'not_selected') NOT NULL DEFAULT 'draft',
    submitted_at DATETIME NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY submissions_public_id_unique (public_id),
    KEY submissions_author_id_index (author_id),
    KEY submissions_status_index (status),
    CONSTRAINT submissions_author_id_foreign FOREIGN KEY (author_id) REFERENCES authors(id)
) ENGINE=InnoDB;

CREATE TABLE submission_categories (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    submission_id BIGINT UNSIGNED NOT NULL,
    category_slug VARCHAR(100) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY submission_categories_unique (submission_id, category_slug),
    CONSTRAINT submission_categories_submission_id_foreign FOREIGN KEY (submission_id) REFERENCES submissions(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE payments (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    submission_id BIGINT UNSIGNED NOT NULL,
    provider VARCHAR(50) NOT NULL,
    provider_payment_id VARCHAR(255) NOT NULL,
    amount_minor INT UNSIGNED NOT NULL,
    currency CHAR(3) NOT NULL DEFAULT 'USD',
    status ENUM('pending', 'paid', 'failed', 'refunded') NOT NULL DEFAULT 'pending',
    verified_at DATETIME NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY payments_provider_payment_unique (provider, provider_payment_id),
    KEY payments_submission_id_index (submission_id),
    CONSTRAINT payments_submission_id_foreign FOREIGN KEY (submission_id) REFERENCES submissions(id)
) ENGINE=InnoDB;

CREATE TABLE reviews (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    submission_id BIGINT UNSIGNED NOT NULL,
    reviewer_admin_id BIGINT UNSIGNED NOT NULL,
    score DECIMAL(5,2) NULL,
    result_due_date DATE NULL,
    decision ENUM('pending', 'winner', 'not_selected') NOT NULL DEFAULT 'pending',
    notes TEXT NULL,
    reviewed_at DATETIME NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY reviews_submission_unique (submission_id),
    CONSTRAINT reviews_submission_id_foreign FOREIGN KEY (submission_id) REFERENCES submissions(id),
    CONSTRAINT reviews_reviewer_admin_id_foreign FOREIGN KEY (reviewer_admin_id) REFERENCES admins(id)
) ENGINE=InnoDB;

CREATE TABLE published_winners (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    submission_id BIGINT UNSIGNED NOT NULL,
    award_name VARCHAR(255) NOT NULL,
    award_year SMALLINT UNSIGNED NOT NULL,
    show_on_homepage TINYINT(1) NOT NULL DEFAULT 0,
    show_in_archive TINYINT(1) NOT NULL DEFAULT 0,
    published_at DATETIME NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY published_winners_submission_unique (submission_id),
    CONSTRAINT published_winners_submission_id_foreign FOREIGN KEY (submission_id) REFERENCES submissions(id)
) ENGINE=InnoDB;

CREATE TABLE email_logs (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    submission_id BIGINT UNSIGNED NULL,
    recipient_email VARCHAR(255) NOT NULL,
    template_key VARCHAR(100) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    status ENUM('queued', 'sent', 'failed') NOT NULL DEFAULT 'queued',
    sent_at DATETIME NULL,
    error_message VARCHAR(1000) NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    KEY email_logs_submission_id_index (submission_id),
    CONSTRAINT email_logs_submission_id_foreign FOREIGN KEY (submission_id) REFERENCES submissions(id) ON DELETE SET NULL
) ENGINE=InnoDB;
