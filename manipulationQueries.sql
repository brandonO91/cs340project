--  PLAYERS PAGE  --
--add a new player
INSERT INTO players (fname, lname, vBucks, level, teamID, playerAlive)
VALUES
(~fname, ~lname, ~vBucks, ~level, ~teamID, ~playerAlive);

-- get a single players data for the Update Player form
SELECT playerID, fname, lname, vBucks, level, teamID  FROM players WHERE playerID = ~playerID_from_dropdown_Input


-- update a players's info data based on submission of the Update Player form
UPDATE players
SET fname = ~fname, lname = ~lname, vBucks = ~vBucks, level = ~level, teamID = ~teamID, playerAlive = ~playerAlive
WHERE playerID = ~playerID_from_dropdown_Input;

--  PLAYER ITEM PURCHASES PAGE  --
INSERT INTO playerItemPurchases (playerID, itemID) 
VALUES 
(~playerID, ~itemID)

--  TEAMS PAGE  --
--add a team
INSERT INTO teams (title)
VALUES
(~title);

--delete a team
DELETE FROM teams WHERE teamID = ~teamID;

--  ITEMS PAGE  --
INSERT INTO itemShops (itemName, itemDescription, vBuckCost)
VALUES
(~itemName, ~itemDescription, ~vBucksCost);

--  PLAYERS INVENTORIES TABLE  --

-- get a single players data for the Player Inventories form
SELECT playerID, health, medKit, shield, shieldPotion, shotgun, shotgunAmmo, rifle, xpPoints  
FROM playersInventories 
WHERE playerID = ~playerID_from_dropdown_Input;

-- update a players's inventory data based on submission of the Players Inventories form
UPDATE playersInventories
SET health = ~health, medKit = ~medKit, shield = ~shield, shieldPotion = ~shieldPotion,
  shotgun = ~shotgun, shotgunAmmo = ~shotgunAmmo, rifle = ~rifleAmmo, xpPoints = ~xpPoints;
WHERE playerID = ~playerID_from_dropdown_Input;
