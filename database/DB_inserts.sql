
INSERT INTO User
VALUES ('user1@gmail.com', 'password1', 'Atul', 'Verma', 'UnitedWay Staff', current_date, 'M', 'H', '9999999999', null, current_timestamp, 'Init');
INSERT INTO User
VALUES ('user2@gmail.com', 'password2', 'Kiran', 'Chava', 'Partner Staff', current_date, 'F', 'W', '5555555555', 'ABC001', current_timestamp, 'Init');
INSERT INTO User
VALUES ('user3@gmail.com', 'password3', 'Ameera', 'Huda', 'Household', current_date, 'F', 'B', '4444444444', null, current_timestamp, 'Init');
INSERT INTO User
VALUES ('user4@gmail.com', 'password4', 'Yang', 'Bai', 'Household', current_date, 'M', 'P', '6666666666', null, current_timestamp, 'Init');
INSERT INTO User
VALUES ('userhouse1@gmail.com', 'password4', 'Yang', 'Bai', 'Household', current_date, 'M', 'P', '6666666666', null, current_timestamp, 'Init');
INSERT INTO User
VALUES ('userhouse2@gmail.com', 'password4', 'Yang', 'Bai', 'Household', current_date, 'M', 'P', '6666666666', null, current_timestamp, 'Init');
INSERT INTO User
VALUES ('userhouse3@gmail.com', 'password4', 'Yang', 'Bai', 'Household', current_date, 'M', 'P', '6666666666', null, current_timestamp, 'Init');
INSERT INTO User
VALUES ('userhouse4@gmail.com', 'password4', 'Yang', 'Bai', 'Household', current_date, 'M', 'P', '6666666666', null, current_timestamp, 'Init');
INSERT INTO User
VALUES ('userhouse5@gmail.com', 'password5', 'Cathy', 'Adams', 'Household', current_date, 'M', 'P', '7766666666', null, current_timestamp, 'Init');
INSERT INTO User
VALUES ('userhouse6@gmail.com', 'password6', 'Josetta', 'Smith', 'Household', current_date, 'M', 'P', '8866666666', null, current_timestamp, 'Init');

INSERT INTO Partner
VALUES ('ABC001', 'Bright House Partners', '123, main Street, Any Town, USA', 'www.facebook.com/unitedway', 50000.00, current_timestamp, 'Init');
INSERT INTO Partner
VALUES ('XYZ001', 'Sunshine Community Friends', '456, 2nd Street, Any Town, USA', 'www.facebook.com/delta', 100000.00, current_timestamp, 'Init');


INSERT INTO Classes
VALUES ('Workshop on family budget', 'Learn how to budget for daily and long term expenses', 'www.udacity.com/budget', 'Workshop', current_timestamp,
        'Init');
INSERT INTO Classes
VALUES ('Class on saving for college', 'Learn how to use 529 to save for college', 'www.GAscholar.com/class', 'OnlIne Class', current_timestamp,
        'Init');
INSERT INTO Classes
VALUES ('Class on emergency saving', 'Learn how to save for hard times', 'www.udacity.com/save', 'In Person class', current_timestamp, 'Init');

/*Insert into Programs table */
INSERT INTO Programs
VALUES ('ABC001-01', 'ABC001', 'Housing and Savings', 4000.00, 4, 4, 2000.00, 1000.00, 1000.00,
        'Workshop on family budget', 'Class on saving for college', 'Class on emergency saving', 'Not Required', 'Not Required', 'Not Required',
        current_timestamp, 'Init');
INSERT INTO Programs
VALUES ('ABC001-02', 'ABC001',  'Home abuse shelter program', 5000.00, 4, 4, 3000.00, 1000.00, 1000.00,
        'Workshop on family budget1', 'Class on saving for college1', 'Class on emergency saving1', 'Not Required1', 'Not Required1', 'Not Required1',
        current_timestamp, 'Init');

INSERT INTO Programs
VALUES ('ABC001-03', 'ABC001', 'Saving for elder housing program', 5000.00, 4, 4, 1000.00, 2000.00, 2000.00,
        'Workshop on elder finances', 'Class on health and safety', 'Class on emergency saving 3', 'Not Required2', 'Not Required2', 'Not Required2',
        current_timestamp, 'Init');

INSERT INTO Programs
VALUES ('XYZ001-03', 'XYZ001', 'Saving for youth housing program', 5000.00, 4, 4, 1000.00, 2000.00, 2000.00,
        'Workshop on elder finances', 'Class on health and safety', 'Class on emergency saving 3', 'Not Required2', 'Not Required2', 'Not Required2',
        current_timestamp, 'Init');

INSERT INTO Programs
VALUES ('XYZ001-04', 'XYZ001', 'Saving for veteran housing program', 5000.00, 4, 4, 1000.00, 2000.00, 2000.00,
        'Workshop on elder finances', 'Class on health and safety', 'Class on emergency saving 3', 'Not Required2', 'Not Required2', 'Not Required2',
        current_timestamp, 'Init');

/*insert into household table */

INSERT INTO HouseholdIntake
VALUES
    ('house00001', "userhouse1@gmail.com", "ABC001", "ABC001-01", "Mary Grace", "John's Family", STR_TO_DATE('12/12/2022', '%m/%d/%Y'), "Motel", "Motel66 on main street", "1234 Main Street, Any Town, USA 55555",
     "55555", "Y", "Married", "High School", "Never Served", "FInd the values", "Unemployed", 2, 2, 1500.00, "no kown address", "John, 54; Julia 45",
     "Henry 12; James 15", STR_TO_DATE('01/01/2023', '%m/%d/%Y'), "5555 2nd Street, Any Town, USA, 55555", "Any Town Rentals", "Any Toen", "This County", "55555", 1200.00,
     STR_TO_DATE('4/5/2023', '%m/%d/%Y'), "Completed", "no impact notes for now", current_timestamp, 'Init');

INSERT INTO HouseholdIntake
VALUES
    ('house00002', "userhouse2@gmail.com", "ABC001", "ABC001-01", "Mary Grace", "Adam's Family", STR_TO_DATE('12/12/2022', '%m/%d/%Y'), "Motel", "Motel99 on main street", "457 Main Street, Any Town, USA 55555",
     "55555", "N", "Married", "High School", "Retired", "FInd the values2", "Employed", 2, 0, 500.00, "no kown address2", "Andy, 54; Maria 45",
     "No Kids here", STR_TO_DATE('01/01/2023', '%m/%d/%Y'), "1232 3nd Street, Any Town, USA, 55555", "Any Town Rentals2", "Phoenix", "Maricopa County", "55555", 1200.00,
     STR_TO_DATE('4/5/2023', '%m/%d/%Y'), "Completed", "no impact notes for now", current_timestamp, 'Init');

INSERT INTO HouseholdIntake
VALUES
    ('house00003', "userhouse3@gmail.com", "ABC001", "ABC001-01", "Mary Grace", "Cathy's Family", STR_TO_DATE('12/12/2022', '%m/%d/%Y'), "Motel12", "Motel45 on main street", "4444 Main Street, Any Town, USA 55555",
     "55555", "Y", "Married", "Associate Degree", "Never Served", "FInd the values23", "Part Time", 2, 1,  1300.00, "no kown address34", "Shanaya, 54; Julia 45",
     " boy 15", STR_TO_DATE('01/01/2023', '%m/%d/%Y'), "5555 32nd Street, Any Town, USA, 55555", "Any Town Rentals45", "Johns Creek", "Forsyth County", "55555", 1200.00,
     STR_TO_DATE('4/5/2023', '%m/%d/%Y'), "Completed", "no impact notes for now", current_timestamp, 'Init');

INSERT INTO HouseholdIntake
VALUES
    ('house00004', "userhouse4@gmail.com", "ABC001", "ABC001-02", "Mary Grace", "Cathy's Family2", STR_TO_DATE('12/12/2022', '%m/%d/%Y'), "Motel12", "Motel45 on main street", "4444 Main Street, Any Town, USA 55555",
     "55555", "Y", "Married", "Associate Degree", "Never Served", "FInd the values23", "Part Time", 2, 1,  1300.00, "no kown address34", "Shanaya, 54; Julia 45",
     " boy 15", STR_TO_DATE('01/01/2023', '%m/%d/%Y'), "5555 32nd Street, Any Town, USA, 55555", "Any Town Rentals45", "Johns Creek", "Forsyth County", "55555", 1200.00,
     STR_TO_DATE('4/5/2023', '%m/%d/%Y'), "Dropped", "no impact notes for now", current_timestamp, 'Init');

INSERT INTO HouseholdIntake
VALUES
    ('house00005', "userhouse5@gmail.com", "ABC001", "ABC001-02", "Mary Allen", "Cindy's Family", STR_TO_DATE('12/12/2023', '%m/%d/%Y'), "Motel66", "Motel66 on main street", "4444 Main Street, Any Town, USA 55555",
     "55555", "Y", "Married", "Associate Degree", "Never Served", "FInd the values23", "Part Time", 2, 1,  1300.00, "no kown address34", "Shanaya, 54; Julia 45",
     " boy 15", STR_TO_DATE('01/01/2023', '%m/%d/%Y'), "5555 32nd Street, Any Town, USA, 55555", "Any Town Rentals45", "Johns Creek", "Forsyth County", "55555", 1200.00,
     STR_TO_DATE('4/5/2023', '%m/%d/%Y'), "Dropped", "no impact notes for now", current_timestamp, 'Init');

INSERT INTO HouseholdIntake
VALUES
    ('house00006', "userhouse6@gmail.com", "ABC001", "ABC001-02", "Mary Allen", "Josetta's Family", STR_TO_DATE('12/12/2020', '%m/%d/%Y'), "Motel6612", "Motel6612 on main street", "4444 Main Street, Any Town, USA 55555",
     "55555", "Y", "Married", "Associate Degree", "Never Served", "FInd the values23", "Part Time", 2, 1,  1300.00, "no kown address34", "Shanaya, 54; Julia 45",
     " boy 15", STR_TO_DATE('01/01/2023', '%m/%d/%Y'), "5555 32nd Street, Any Town, USA, 55555", "Any Town Rentals45", "Johns Creek", "Forsyth County", "55555", 1200.00,
     STR_TO_DATE('4/5/2023', '%m/%d/%Y'), "In Progress", "no impact notes for now", current_timestamp, 'Init');

INSERT INTO HouseholdIntake
VALUES
    ('house00007', "userhouse5@gmail.com", "XYZ001", "XYZ001-03", "Mary Allen", "Cindy's Family", STR_TO_DATE('12/12/2023', '%m/%d/%Y'), "Motel66", "Motel66 on main street", "4444 Main Street, Any Town, USA 55555",
     "55555", "Y", "Married", "Associate Degree", "Never Served", "FInd the values23", "Part Time", 2, 1,  1300.00, "no kown address34", "Shanaya, 54; Julia 45",
     " boy 15", STR_TO_DATE('01/01/2023', '%m/%d/%Y'), "5555 32nd Street, Any Town, USA, 55555", "Any Town Rentals45", "Johns Creek", "Forsyth County", "55555", 1200.00,
     STR_TO_DATE('4/5/2023', '%m/%d/%Y'), "Dropped", "no impact notes for now", current_timestamp, 'Init');

INSERT INTO HouseholdIntake
VALUES
    ('house00008', "userhouse6@gmail.com", "XYZ001", "XYZ001-04", "Mary Allen", "Josetta's Family", STR_TO_DATE('12/12/2020', '%m/%d/%Y'), "Motel6612", "Motel6612 on main street", "4444 Main Street, Any Town, USA 55555",
     "55555", "Y", "Married", "Associate Degree", "Never Served", "FInd the values23", "Part Time", 2, 1,  1300.00, "no kown address34", "Shanaya, 54; Julia 45",
     " boy 15", STR_TO_DATE('01/01/2023', '%m/%d/%Y'), "5555 32nd Street, Any Town, USA, 55555", "Any Town Rentals45", "Johns Creek", "Forsyth County", "55555", 1200.00,
     STR_TO_DATE('4/5/2023', '%m/%d/%Y'), "In Progress", "no impact notes for now", current_timestamp, 'Init');


INSERT INTO JourneyDetails
VALUES
    ('of1wj8732j','userhouse6@gmail.com', 'ABC001-02', 6, 4000.00, 2000.00, 2000.00, 'Pre Housing', 500.00, 200.00, 1000.00, 45, 'N', 'N', 'Y', 'N',
     'Y', 'N', 'Y', 'N', 'Y', 'N', 'Y', 'N', 'Y', 'N', current_timestamp, 'Init');
INSERT INTO JourneyDetails
VALUES
    ('o22wrt73oj','userhouse4@gmail.com', 'ABC001-02', 6, 4000.00, 1000.00, 3000.00, 'Post Housing', 400.00, 300.00, 2000.00, 20, 'Y', 'Y', 'Y', 'N',
     'Y', 'N', 'Y', 'N', 'Y', 'N', 'Y', 'N', 'Y', 'N', current_timestamp, 'Init');

INSERT INTO JourneyByMonth
VALUES
    ('of1wj8732j', '1', STR_TO_DATE('01/01/2023', '%m/%d/%Y'), 500, STR_TO_DATE('02/01/2023', '%m/%d/%Y'), 500.00, 200.00, 100.00, 'AnyWay Apartments', '600', 800.00, current_timestamp, 'Init');
INSERT INTO JourneyByMonth
VALUES
    ('o22wrt73oj', '1', STR_TO_DATE('01/01/2023', '%m/%d/%Y'), 500, STR_TO_DATE('02/01/2023', '%m/%d/%Y'), 500.00, 200.00, 100.00, 'AnyWay Apartments', '600', 800.00, current_timestamp, 'Init');

