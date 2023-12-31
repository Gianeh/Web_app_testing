-- create the main user table
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'users')
BEGIN
    CREATE TABLE users (
        user_id varchar(64) PRIMARY KEY,
        username varchar(20) NOT NULL,
        password varchar(20) NOT NULL,
        online_hour INTEGER NOT NULL DEFAULT 0,
        online_time INTEGER NOT NULL DEFAULT 0,
    );
END

-- create a table player containing the player's name, password
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'player')
BEGIN
    CREATE TABLE player (
        user_id varchar(64) PRIMARY KEY,
        username varchar(20) NOT NULL,
        x INTEGER NOT NULL,
        y INTEGER NOT NULL,
        level INTEGER NOT NULL DEFAULT 0,
        FOREIGN KEY (user_id) REFERENCES users(user_id)
    );
END

-- create a table resources containing iron, food, wood, rock
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'resources')
BEGIN
    CREATE TABLE resources (
        user_id varchar(64) PRIMARY KEY,
        iron INTEGER NOT NULL,
        food INTEGER NOT NULL,
        wood INTEGER NOT NULL,
        rock INTEGER NOT NULL,
        population INTEGER NOT NULL
        FOREIGN KEY (user_id) REFERENCES player(user_id)
    );
END

-- create a table troops containing the player's troops (archer, infantry, cavalry)
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'structures')
BEGIN
    CREATE TABLE structures (
        user_id varchar(64) PRIMARY KEY,
        townhall INTEGER NOT NULL,
        woodchopper INTEGER NOT NULL,
        rockmine INTEGER NOT NULL,
        ironmine INTEGER NOT NULL,
        farm INTEGER NOT NULL,
        barracks INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES player(user_id)
    );
END


-- create a table troops containing the player's troops (archer, infantry, cavalry)
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'troops')
BEGIN
    CREATE TABLE troops (
        user_id varchar(64) PRIMARY KEY,
        archer INTEGER NOT NULL,
        infantry INTEGER NOT NULL,
        cavalry INTEGER NOT NULL
        FOREIGN KEY (user_id) REFERENCES player(user_id)
    );
END

-- create a table that contains timed events (user_id, event_type, event_completion_date, finished)
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'events')
BEGIN
    CREATE TABLE events (
        event_id varchar(64) PRIMARY KEY,
        user_id varchar(64) NOT NULL,
        event_type varchar(20) NOT NULL,
        level integer,
        event_completion INT NOT NULL,
        online BIT NOT NULL,
        finished BIT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES player(user_id)
    );
END



/*
-- create a table wars containing the player's wars (user_id_attack, user_id_defend, user_id_winner)
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'wars')
BEGIN
    CREATE TABLE wars (
        war_id INTEGER PRIMARY KEY,
        user_id_attack INTEGER NOT NULL,
        user_id_defend INTEGER NOT NULL,
        user_id_winner INTEGER NOT NULL,
        archer INTEGER NOT NULL,
        infantry INTEGER NOT NULL,
        cavalry INTEGER NOT NULL,
        ended BIT NOT NULL,
        FOREIGN KEY (user_id_attack) REFERENCES player(user_id),
        FOREIGN KEY (user_id_defend) REFERENCES player(user_id),
        FOREIGN KEY (user_id_winner) REFERENCES player(user_id)
    );
END
*/
/*
-- create some sample data for the tables player and resources
INSERT INTO player (user_id, password, x, y) VALUES ('user1', 'password1', 0, 0);
INSERT INTO player (user_id, password, x, y) VALUES ('user2', 'password2', 0, 0);

INSERT INTO resources (user_id, iron, food, wood, rock, population) VALUES ('user1', 100, 100, 100, 100, 100);
INSERT INTO resources (user_id, iron, food, wood, rock, population) VALUES ('user2', 100, 100, 100, 100, 100);

-- create some sample data for the table troops

INSERT INTO troops (user_id, archer, infantry, cavalry) VALUES ('user1', 100, 100, 100);
INSERT INTO troops (user_id, archer, infantry, cavalry) VALUES ('user2', 50, 50, 50);

-- select a player and his resources
SELECT * FROM player, resources WHERE player.user_id = resources.user_id;

-- select the whole resources table
SELECT * FROM resources;

*/
-- reset tables contents
/*
DELETE FROM player;
DELETE FROM resources;
*/
-- delete all the tables

/*
DROP TABLE events;

DROP TABLE resources;
DROP TABLE troops;
DROP TABLE structures;
DROP TABLE player;
DROP TABLE users;
*/

