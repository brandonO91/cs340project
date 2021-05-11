--  PLAYERS PAGE  --
INSERT INTO players (fname, lname, vBucks, level, teamID, playerAlive)
VALUES
(~fname, ~lname, ~vBucks, ~level, ~teamID, ~playerAlive);

UPDATE players
SET fname = ~, lname = ~, vBucks = ~, level = ~, teamID = ~, playerAlive = ~
WHERE playerID = ~;

--  TEAMS PAGE  --
INSERT INTO teams (title)
VALUES
(~title);

--  ITEMS PAGE  --
INSERT INTO itemShops (itemName, itemDescription, vBuckCost)
VALUES
(~itemName, ~itemDescription, ~vBucksCost);

--  PLAYER ITEM PURCHASES PAGE  --
