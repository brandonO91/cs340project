--  Delete tables if exits  ---------------------------------------------------------
DROP TABLE IF EXISTS itemShops;
DROP TABLE IF EXISTS playerInventories;
DROP TABLE IF EXISTS playerItemPurchases;
DROP TABLE IF EXISTS playerItemPurchases;
DROP TABLE IF EXISTS players;
DROP TABLE IF EXISTS teams;
-- Create Tables
--  Since team id cant be null we need to create teams first?
--  Or if not created then it auto creates and adds to table for teams?
Create Table players(
    playerID int AUTO_INCREMENT NOT NULL,
    fname varchar NOT NULL,
    lname varchar NOT NULL,
    --  if using default can we use not null then?
    vBucks int DEFAULT 0,
    --  level a reserved word?
    level int DEFAULT 0,
    teamID int NOT NULL,
    playerAlive int DEFAULT 1
    PRIMARY KEY (playerID)
    FOREIGN KEY (teamID) REFERENCES teams(teamsID)
) ENGINE=InnoDB;

