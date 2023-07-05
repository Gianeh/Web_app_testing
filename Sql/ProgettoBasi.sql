-- 
SELECT username, woodchopper, ironmine FROM structures, player 
WHERE player.user_id = structures.user_id AND structures.townhall >5


--
SELECT user_id, townhall, barracks FROM structures, login
 WHERE login.user_id = structures.user_id AND login.online_hours > 20


--
SELECT username, iron, wood, rock, food, population FROM player, resurces
WHERE player.user_id = resurces.user_id AND player.user_id = structures.user_id AND structure.townhall = 10 

--
SELECT x, y FROM player
WHERE player.user_id = structures.user_id AND SUM(townhall, woodchopper, farm, rockmine, ironmine, barracks)>6
AND x >200 AND y >200

--
SELECT bonus_id, username FROM bonus, player WHERE player.user_id = bonus.user_id AND time > 3600

-- 
SELECT user_id, username FROM player, login WHERE player.user_id = login.user_id AND login.online_time = 1

--
SELECT m.text, p.username
FROM messages m
JOIN Player p ON m.sender_id = u.user_id
WHERE m.receiver_id = (SELECT user_id FROM users WHERE username = 'OverGravy')
  AND u.townhall_level = (SELECT townhall_level FROM users WHERE username = 'OverGravy');

--
SELECT user_id FROM player 
WHERE player.user_id = login.user_id AND password = 'Qwerty'

--
SELECT event_id FROM events
WHERE event_type = 'upgrade_TownHall' AND event_info.date = '2023-04-07'

--
SELECT AVG(event_completion) AS average_duration
FROM events
WHERE player_id = (SELECT player_id FROM players WHERE username = 'LukeNice')
  AND finished = TRUE;

--
SELECT p.user_id, p.x, p.y
FROM players p
JOIN players g ON g.username = 'Gianeh'
WHERE p.x < g.x - 20
  AND p.y < g.y - 20;

--
SELECT p.username FROM players p
WHERE p.user_id = chat.sender_id AND chat.text = 'u mom'

--
CREATE VIEW player_ranking AS
SELECT u.username, u.user_id, u.playing_hours, t.cavalry_quantity
FROM player p
JOIN structures s ON u.user_id = s.user_id
ORDER BY s.townhall_level DESC;

SELECT * FROM player_ranking;