--  Delete tables if exits  ---------------------------------------------------------
DROP TABLE IF EXISTS itemShops;
DROP TABLE IF EXISTS playerInventories;
DROP TABLE IF EXISTS playerItemPurchases;
DROP TABLE IF EXISTS playerItemPurchases;
DROP TABLE IF EXISTS players;
DROP TABLE IF EXISTS teams;
-- Create Tables
CREATE TABLE teams(
    teamID int NOT NULL AUTO_INCREMENT,
    title varchar(250) NOT NULL,
    PRIMARY KEY teamID
) ENGINE=InnoDB;

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

CREATE TABLE itemShops(
    itemID int AUTO_INCREMENT NOT NULL,
    itemName varchar(250) NOT NULL UNIQUE,
    itemDescription varchar(250) NOT NULL,
    vBuckCost int DEFAULT 0,
    PRIMARY KEY itemID
) ENGINE=InnoDB;

CREATE TABLE playerItemPurchases(
    ID int AUTO_INCREMENT,
    playerID int NOT NULL,
    itemID int NOT NULL,
    PRIMARY KEY ID,
    FOREIGN KEY (playerID) REFERENCES player(playerID),
    FOREIGN KEY (itemID) REFERENCES itemShops(itemID)
) ENGINE=InnoDB;

CREATE TABLE playerInventories(
    ID int AUTO_INCREMENT,
    playerID int NOT NULL,
    health int DEFAULT 100,
    medKit int Default 0,
    shield int DEFAULT 0,
    shieldPotion int DEFAULT 0,
    shotgun int DEFAULT 0,
    shotgunAmmo int DEFAULT 0,
    rifelAmmo int DEFAULT 0,
    xpPoints int DEFAULT 0,
    PRIMARY KEY ID,
    FOREIGN KEY (playerID) REFERENCES player(playerID)
) ENGINE=InnoDB;
--  POPULATING TABLES WITH DATA  ----------------------------
INSERT INTO teams (title)
VALUES
('TEAM DETECTIVE'),
('Leg Lockers'),
('4D');

INSERT INTO players (fname, lname, vBucks, level, teamID, playerAlive)
VALUES
('Lucifer', 'Morningstart', NULL, 1000, 1, 1),
('Jessica', 'Day', 0, 0, 0, 0),
('Lachlan', 'Giles', 160, 5050, 3, 1);

INSERT INTO itemShops (itemName, itemDescription, vBuckCost)
VALUES
('Wood', 'A bundle of...wood', 5),
('Shot Gun Ammo', 'Fun-munition', 25),
('Mechanical Parts', 'Things to be a real engineer', 50);

