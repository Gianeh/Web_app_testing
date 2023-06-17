-- create a table resources containing iron, food, wood, rock
CREATE TABLE resources (
    user_id varchar(20) PRIMARY KEY,
    iron INTEGER NOT NULL,
    food INTEGER NOT NULL,
    wood INTEGER NOT NULL,
    rock INTEGER NOT NULL,
    population INTEGER NOT NULL
    --FOREIGN KEY (user_id) REFERENCES player(user_id)--
    
);
-- create a table player containing the player's name, password
CREATE TABLE player (
    user_id varchar(20) PRIMARY KEY,
    password varchar(20) NOT NULL,
    x INTEGER NOT NULL,
    y INTEGER NOT NULL
);

-- set the relationship between resources and player using user_id as foreign key
ALTER TABLE resources
ADD FOREIGN KEY (user_id)
REFERENCES player(user_id);

-- create some sample data
INSERT INTO player (user_id, password, x, y) VALUES ('user1', 'password1', 0, 0);
INSERT INTO player (user_id, password, x, y) VALUES ('user2', 'password2', 0, 0);

INSERT INTO resources (user_id, iron, food, wood, rock) VALUES ('user1', 100, 100, 100, 100);
INSERT INTO resources (user_id, iron, food, wood, rock) VALUES ('user2', 100, 100, 100, 100);

-- select a player and his resources
SELECT * FROM player, resources WHERE player.user_id = resources.user_id;


-- reset tables contents
DELETE FROM player;
DELETE FROM resources;