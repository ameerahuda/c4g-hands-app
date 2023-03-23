-- for staff view

/*Show all partners*/

SELECT partnerID, partnerName, partnerAddress, partnerSocialHandle, partnerBudget
FROM Partner;

/*Show all programs after selecting a partner*/

select programID, programName, programBudget, prehouseMOnths, posthouseMonths, preMonthlyallownce, postMonthlyallowance, movingAllowance, req1, req2, req3, req4, req5
FROM Programs
WHERE partnerID = $(partnerID);

/*Show list of households when Partner + Program selected*/

SELECT fk_User_email, fk_Partner_partnerID  ,     fk_Program_programID  ,     partnerStaffName  ,     householdName ,     enrollmentDate ,     locationEntry  ,  motelName,
       MotelAddress,    motelZip ,  haveKids ,   maritalStatus ,  educationStatus ,  militaryStatus,     incomeSource , employmentType ,  adultCount ,  kidsCount ,  monthlyIncome , address,     adultNameAge ,  kidsNameAge,  prehousingDT ,  prehousingAddress , apartmentLandlordName,
       prehouseCity,  preHouseCounty,  prehoseZip , monthlyRent , graduationDT,     sureImpactStatus,  SureImpactNotes
FROM HouseholdIntake
WHERE
        fk_Partner_partnerID = $(partnerID) AND
        fk_Program_programID = $(programID);

/* show partner statistics */
/*this is aggregate partner data such as budget remaining)*/

Select partner.partnerName,
       partner.partnerAddress,
       partner.partnerBudget,
       count(HouseholdIntake.fk_User_email)                  as numOfHouseholds,
       SUM(programs.programBudget)                           as moneySpent,
       (partner.partnerBudget - SUM(programs.programBudget)) as moneyRemaining,
       0                                                     as householdsCompleted,
       0                                                     as householdsDropped,
       0                                                     as householdsInProgres
FROM Programs programs,
     Partner partner,
     HouseholdIntake
WHERE programs.partnerID = partner.partnerID
  AND HouseholdIntake.fk_Partner_partnerID = partner.partnerID
  AND programs.partnerID = $(partnerID);



