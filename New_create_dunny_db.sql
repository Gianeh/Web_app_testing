IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'users')
BEGIN
    CREATE TABLE users (
        user_id varchar(64) PRIMARY KEY,
        username varchar(20) NOT NULL,
        password varchar(20) NOT NULL,
        x INTEGER NOT NULL,
        y INTEGER NOT NULL
    );
END
