--  PLAYERS PAGE  --
--add a new player
INSERT INTO players (fname, lname, vBucks, level, teamID, playerAlive)
VALUES
(~fname, ~lname, ~vBucks, ~level, ~teamID, ~playerAlive);

DELETE FROM players
WHERE playerID = ~playerID

-- get a single players data for the Update Player form
SELECT playerID, fname, lname, vBucks, level, teamID
FROM players
WHERE playerID = ~playerID_from_dropdown_Input;


-- update a players's info data based on submission of the Update Player form
UPDATE players
SET fname = ~fname, lname = ~lname, vBucks = ~vBucks, level = ~level, teamID = ~teamID, playerAlive = ~playerAlive
WHERE playerID = ~playerID_from_dropdown_Input;

SELECT * FROM players
WHERE playerID =  ~playerID;

--  PLAYER ITEM PURCHASES PAGE  --
INSERT INTO playerItemPurchases (playerID, itemID) 
VALUES 
(~playerID, ~itemID);

SELECT * FROM playerItemPurchases
WHERE ID = ~ID
-- drop down menu

--  TEAMS PAGE  --
--add a team
INSERT INTO teams (title)
VALUES
(~title);

--delete a team
DELETE FROM teams 
WHERE teamID = ~teamID;

SELECT * FROM teams
WHERE teamID = ~teamID;

--  ITEMS PAGE  --
INSERT INTO itemShops (itemName, itemDescription, vBuckCost)
VALUES
(~itemName, ~itemDescription, ~vBucksCost);

SELECT * FROM itemShops
WHERE itemID = ~itemID

--  PLAYERS INVENTORIES TABLE  --

-- get a single players data for the Player Inventories form
SELECT playerID, health, medKit, shield, shieldPotion, shotgun, shotgunAmmo, rifle, xpPoints  
FROM playersInventories 
WHERE playerID = ~playerID_from_dropdown_Input;

--  FILTER QUERY
--  PLAYERS PAGE  --
--add a new player
INSERT INTO players (fname, lname, vBucks, level, teamID, playerAlive)
VALUES
(~fname, ~lname, ~vBucks, ~level, ~teamID, ~playerAlive);

DELETE FROM players
WHERE playerID = ~playerID

-- get a single players data for the Update Player form
SELECT playerID, fname, lname, vBucks, level, teamID
FROM players
WHERE playerID = ~playerID_from_dropdown_Input;


-- update a players's info data based on submission of the Update Player form
UPDATE players
SET fname = ~fname, lname = ~lname, vBucks = ~vBucks, level = ~level, teamID = ~teamID, playerAlive = ~playerAlive
WHERE playerID = ~playerID_from_dropdown_Input;

SELECT * FROM players
WHERE playerID =  ~playerID;

--  PLAYER ITEM PURCHASES PAGE  --
INSERT INTO playerItemPurchases (playerID, itemID) 
VALUES 
(~playerID, ~itemID);

SELECT * FROM playerItemPurchases
WHERE ID = ~ID
-- drop down menu

--  TEAMS PAGE  --
--add a team
INSERT INTO teams (title)
VALUES
(~title);

--delete a team
DELETE FROM teams 
WHERE teamID = ~teamID;

SELECT * FROM teams
WHERE teamID = ~teamID;

--  ITEMS PAGE  --
INSERT INTO itemShops (itemName, itemDescription, vBuckCost)
VALUES
(~itemName, ~itemDescription, ~vBucksCost);

SELECT * FROM itemShops
WHERE itemID = ~itemID

--  PLAYERS INVENTORIES TABLE  --

-- get a single players data for the Player Inventories form
SELECT playerID, health, medKit, shield, shieldPotion, shotgun, shotgunAmmo, rifle, xpPoints  
FROM playersInventories 
WHERE playerID = ~playerID_from_dropdown_Input;

-- Filter query
SELECT players.playerID, players.fname, players.lname, playerInventories.health, playerInventories.medKit, playerInventories.shield, playerInventories.shieldPotion, playerInventories.shotgun, playerInventories.shotgunAmmo, playerInventories.rifle, playerInventories.rifleAmmo, playerInventories.xpPoints 
FROM playerInventories
INNER JOIN players
ON playerInventories.playerID = players.playerID 
WHERE players.fname LIKE ? OR health < ? OR medKit < ? OR shield < ? OR shieldPotion < ? OR shotgun < ? OR shotgunAmmo < ? OR rifleAmmo < ? or xpPoints < ?;


-- update discarded  --------------------------
-- update a players's inventory data based on submission of the Players Inventories form
UPDATE playersInventories
SET health = ~health, medKit = ~medKit, shield = ~shield, shieldPotion = ~shieldPotion,
  shotgun = ~shotgun, shotgunAmmo = ~shotgunAmmo, rifle = ~rifleAmmo, xpPoints = ~xpPoints;
WHERE playerID = ~playerID_from_dropdown_Input;




--  UPDATE DISCARDED
-- update a players's inventory data based on submission of the Players Inventories form
UPDATE playersInventories
SET health = ~health, medKit = ~medKit, shield = ~shield, shieldPotion = ~shieldPotion,
  shotgun = ~shotgun, shotgunAmmo = ~shotgunAmmo, rifle = ~rifleAmmo, xpPoints = ~xpPoints;
WHERE playerID = ~playerID_from_dropdown_Input;
