insert into PAS_IMPL.QUOTE_INVESTMENT_SAT
(
  QUOTE_INVESTMENT_HKEY, 
  RECORD_SOURCE, 
  HASH_DIFF, 
  LOAD_DATE, 
  FUTURE_CONTRACT_NUMBER, 
  STRATEGY_CODE, 
  STRATEGY_DESCRIPTION
)
select
  qth.QUOTE_HKEY,
  'ADINSURE',
  '3EA17AE3BFB5AA71ABEBA6DD8890E04A',
  GETDATE(),
  JSON_VALUE(agr.BODY, '$.technicalInformation.futureContractNumber') futureContractNumber,
  JSON_VALUE(agr.BODY, '$.basicInvestmentParameters.investmentStrategy.investmentStrategyCode') investmentStrategyCode,
  JSON_VALUE(agr.BODY, '$.basicInvestmentParameters.investmentStrategy.investmentStrategyDescription') investmentStrategyDescription
from
  PAS.CONTRACT agr,
  CFX.PUBLISHED_ARTIFACT art,
  PAS_IMPL.QUOTE_HUB qth
where art.CODE_NAME = 'InvestmentLifeInsuranceQuote'
  and agr.PUBLISHED_ARTIFACT_ID = art.PUBLISHED_ARTIFACT_ID
  and agr.CONTRACT_NUMBER = qth.CONTRACT_NUMBER