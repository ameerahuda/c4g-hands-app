-- CREATE USER 'newuser'@'localhost' IDENTIFIED BY 'password';
CREATE USER IF NOT EXISTS gatechUser@localhost IDENTIFIED BY 'gatech123';

DROP DATABASE IF EXISTS `c4g_hands_db`;

SET default_storage_engine=InnoDB;
SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE DATABASE  IF NOT EXISTS c4g_hands_db;

use c4g_hands_db;

CREATE TABLE User
(
    email       varchar(50) NOT NULL,
    password    varchar(50) NOT NULL,
    first_name  varchar(50) NOT NULL,
    last_name   varchar(50) NOT NULL,
    user_type   varchar(20) NOT NULL,
    birthdate   date        NOT NULL,
    gender      char(1)     NOT NULL,
    race        char(1)     NOT NULL,
    phoneNumber varchar(10) NOT NULL,
    partnerID   varchar(10),
    createdAt   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    createdBy   varchar(50),

    PRIMARY KEY (email)
);

CREATE TABLE Partner
(
    partnerID           varchar(10) NOT NULL,
    partnerName         varchar(50) NOT NULL,
    partnerAddress      varchar(100) NOT NULL,
    partnerSocialHandle varchar(50) NOT NULL,
    partnerBudget       DECIMAL(13, 2)  NOT NULL,
    createdAt           TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    createdBy           varchar(50),

    PRIMARY KEY (partnerID)
);

CREATE TABLE Classes
(
    className varchar(50)  NOT NULL,
    classDesc varchar(100) NOT NULL,
    classURL  varchar(200) NOT NULL,
    classType varchar(20)  NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    createdBy varchar(50),

    PRIMARY KEY (className)
);

CREATE TABLE Programs
(
    programID            varchar(10)  NOT NULL,
    partnerID            varchar(10)  NOT NULL,
    -- fk_Classes_className varchar(50)  NOT NULL,
    programName          varchar(100) NOT NULL,
    programBudget        DECIMAL(13, 2),
    prehouseMonths       int          NOT NULL,
    posthouseMonths      int          NOT NULL,
    preMonthlyallownce   DECIMAL(13, 2),
    postMonthlyallowance DECIMAL(13, 2),
    movingAllowance      DECIMAL(13, 2),
    req1                 varchar(50)  NOT NULL,
    req2                 varchar(50)  NOT NULL,
    req3                 varchar(50)  NOT NULL,
    req4                 varchar(50)  NOT NULL,
    req5                 varchar(50)  NOT NULL,
    req6                 varchar(50)  NOT NULL,
    createdAt            TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    createdBy            varchar(50),

    PRIMARY KEY (programID)
    --  FOREIGN KEY (fk_Classes_className) REFERENCES Classes (className)
);


CREATE TABLE HouseholdIntake
(
    householdIntakeID     varchar(10)   NOT NULL,
    fk_User_email         varchar(50)   NOT NULL,
    fk_Partner_partnerID  varchar(10)   NOT NULL,
    fk_Program_programID  varchar(10)   NOT NULL,
    partnerStaffName      varchar(50)   NOT NULL,
    householdName         varchar(50)   NOT NULL,
    enrollmentDate        date          NOT NULL,
    locationEntry         varchar(10)   NOT NULL,
    motelName             varchar(50)   NULL,
    motelAddress          varchar(100)  NULL,
    motelZip              varchar(5)    NULL,
    haveKids              char(1)       NOT NULL,
    maritalStatus         varchar(10)   NOT NULL,
    educationStatus       varchar(20)   NOT NULL,
    militaryStatus        varchar(20)   NOT NULL,
    incomeSource          varchar(50)   NOT NULL,
    employmentType        varchar(10)   NOT NULL,
    adultCount            int           NOT NULL,
    kidsCount             int           NOT NULL,
    monthlyIncome         DECIMAL(13, 2),
    address               varchar(100)  NOT NULL,
    adultNameAge          varchar(100)  NOT NULL,
    kidsNameAge           varchar(100)  NOT NULL,
    prehousingDT          date          NOT NULL,
    prehousingAddress     varchar(100)  NOT NULL,
    apartmentLandlordName varchar(9100) NOT NULL,
    prehouseCity          varchar(20)   NOT NULL,
    preHouseCounty        varchar(20)   NOT NULL,
    prehoseZip            varchar(5)    NOT NULL,
    monthlyRent           DECIMAL(13, 2),
    graduationDT          date          NULL,
    sureImpactStatus      varchar(20)   NOT NULL,
    sureImpactNotes       varchar(100)  NULL,
    createdAt             TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    createdBy             varchar(50),

    PRIMARY KEY (householdIntakeID),
    FOREIGN KEY (fk_User_email) REFERENCES User (email),
    FOREIGN KEY (fk_Partner_partnerID) REFERENCES Partner (partnerID),
    FOREIGN KEY (fk_Program_programID) REFERENCES Programs (programID)
);


CREATE TABLE JourneyDetails
(
    journeyID            varchar(10) NOT NULL,
    fk_User_email        varchar(50) NOT NULL,
    fk_Program_programID varchar(10) NOT NULL,
    journeyDuration      int         NOT NULL,
    maxAllowance         DECIMAL(13, 2),
    allowanceSpent       DECIMAL(13, 2),
    allowanceRemaining   DECIMAL(13, 2),
    currentPhase         varchar(50) NOT NULL,
    totalDebtPaid        DECIMAL(13, 2),
    totalEviction        DECIMAL(13, 2),
    totalSaved           DECIMAL(13, 2),
    creditScoreIncrease  varchar(2)  NOT NULL,
    isHoused             char(1)   DEFAULT 'F',
    hasGraduated         char(1)   DEFAULT 'F',
    req1Proofsubmitted   char(1)   DEFAULT 'F',
    req1Proofvalidated   char(1)   DEFAULT 'F',
    req2Proofsubmitted   char(1)   DEFAULT 'F',
    req2Proofvalidated   char(1)   DEFAULT 'F',
    req3Proofsubmitted   char(1)   DEFAULT 'F',
    req3Proofvalidated   char(1)   DEFAULT 'F',
    req4Proofsubmitted   char(1)   DEFAULT 'F',
    req4Proofvalidated   char(1)   DEFAULT 'F',
    req5Proofsubmitted   char(1)   DEFAULT 'F',
    req5Proofvalidated   char(1)   DEFAULT 'F',
    req6Proofsubmitted   char(1)   DEFAULT 'F',
    req6Proofvalidated   char(1)   DEFAULT 'F',
    createdAt            TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    createdBy            varchar(50),

    PRIMARY KEY (journeyID),
    FOREIGN KEY (fk_User_email) REFERENCES User (email),
    FOREIGN KEY (fk_Program_programID) REFERENCES Programs (programID)
);

CREATE TABLE JourneyByMonth
(
    journeyByMonthID varchar(10)  NOT NULL,
    fk_JourneyDetails_journeyID varchar(10)  NOT NULL,
    month                       varchar(10)  NOT NULL,
    subsidyDT                   date         NOT NULL,
    subsidyAmt                  DECIMAL(13, 2),
    oneoOnoneDT                 date         NOT NULL,
    debtPaid                    DECIMAL(13, 2),
    evictionAmt                 DECIMAL(13, 2),
    savedAmt                    DECIMAL(13, 2),
    apartmentApplication        varchar(100) NOT NULL,
    creditScore                 char(3)      NOT NULL,
    totalSpent                  DECIMAL(13, 2),
    createdAt                   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    createdBy                   varchar(50),

    PRIMARY KEY (journeyByMonthID),
    FOREIGN KEY (fk_JourneyDetails_journeyID) REFERENCES JourneyDetails (journeyID)
);


describe user;