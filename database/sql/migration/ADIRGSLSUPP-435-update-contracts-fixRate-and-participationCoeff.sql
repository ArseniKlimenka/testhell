UPDATE [PAS].[CONTRACT]
SET BODY = JSON_MODIFY(BODY, '$.basicInvestmentParameters.participationCoeffByPeriods', '3,750; 3,750; 3,750; 3,750')
WHERE JSON_VALUE(BODY,'$.basicInvestmentParameters.fixRate') = N'13' 
        AND CONVERT(DATE, JSON_VALUE(BODY,'$.basicConditions.issueDate'), 23) 
	BETWEEN CONVERT(DATE, '25.08.2023', 104) AND CONVERT(DATE,'26.08.2023', 104)
        AND JSON_VALUE(BODY,'$.mainInsuranceConditions.insuranceProduct.productCode') = 'NOTE1BFKO3'
        AND JSON_VALUE(BODY,'$.basicInvestmentParameters.investmentStrategy.investmentStrategyCode') = 'majorLeague 3.0';

UPDATE [PAS].[CONTRACT]
SET BODY = JSON_MODIFY(BODY, '$.basicInvestmentParameters.fixRate', 15)
WHERE JSON_VALUE(BODY,'$.basicInvestmentParameters.fixRate') = N'13' 
        AND CONVERT(DATE, JSON_VALUE(BODY,'$.basicConditions.issueDate'), 23) 
    BETWEEN CONVERT(DATE, '25.08.2023', 104) AND CONVERT(DATE,'26.08.2023', 104) 
        AND JSON_VALUE(BODY,'$.mainInsuranceConditions.insuranceProduct.productCode') = 'NOTE1BFKO3'
        AND JSON_VALUE(BODY,'$.basicInvestmentParameters.investmentStrategy.investmentStrategyCode') = 'majorLeague 3.0';