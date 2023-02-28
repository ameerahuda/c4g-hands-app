INSERT INTO User
VALUES ('user1@gmail.com', 'password1', 'Atul', 'Verma', 'UnitedWay Staff', current_date, 'M', 'H', '9999999999', current_timestamp, 'Init');
INSERT INTO User
VALUES ('user2@gmail.com', 'password2', 'Kiran', 'Chava', 'Partner Staff', current_date, 'F', 'W', '5555555555', current_timestamp, 'Init');
INSERT INTO User
VALUES ('user3@gmail.com', 'password3', 'Ameera', 'Huda', 'Household', current_date, 'F', 'B', '4444444444', current_timestamp, 'Init');
INSERT INTO User
VALUES ('user4@gmail.com', 'password4', 'Yang', 'Bai', 'Household', current_date, 'M', 'P', '6666666666', current_timestamp, 'Init');


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

INSERT INTO Programs
VALUES ('ABC001-01', 'ABC001', 'Workshop on family budget', 'Housing and Savings', 4000.00, 4, 4, 2000.00, 1000.00, 1000.00,
        'Workshop on family budget', 'Class on saving for college', 'Class on emergency saving', 'Not Required', 'Not Required', 'Not Required',
        current_timestamp, 'Init');

