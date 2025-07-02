-- just in case, save previous data in temp table

IF EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'[BFX_IMPL].[TEMP_ADIRGSL_584]') AND TYPE IN (N'U'))
BEGIN
DROP TABLE [BFX_IMPL].[TEMP_ADIRGSL_584]
END
GO

CREATE TABLE [BFX_IMPL].[TEMP_ADIRGSL_584] (
[CONTRACT_NUMBER] NVARCHAR(MAX),
[OLD_BIP] NVARCHAR(MAX),
[NEW_BIP] NVARCHAR(MAX)
)
GO

insert into [BFX_IMPL].[TEMP_ADIRGSL_584]
select contract_number,
       json_query(body, '$.basicInvestmentParameters') as old_bip,
       json_modify(
         json_modify(
           json_modify(
             json_query(body, '$.basicInvestmentParameters'),
             '$.investmentStrategy',
             json_query(N'{"investmentStrategyCode": "'
                        +json_value(body, '$.basicInvestmentParameters.investmentStrategyCode')
                        +'", "investmentStrategyDescription": "'
                        +json_value(body, '$.basicInvestmentParameters.investmentStrategyDescription')
                        +'"}'
                       )
                      ),
           '$.investmentStrategyCode',
           NULL
                    ),
         '$.investmentStrategyDescription',
         NULL                    
                  ) as new_bip
  from pas.contract
 where json_query(body, '$.basicInvestmentParameters.investmentStrategy') is null
 
-- update script
update pas.contract
   set body = json_modify(body, '$.basicInvestmentParameters', json_modify(
         json_modify(
           json_modify(
             json_query(body, '$.basicInvestmentParameters'),
             '$.investmentStrategy',
             json_query(N'{"investmentStrategyCode": "'
                        +json_value(body, '$.basicInvestmentParameters.investmentStrategyCode')
                        +'", "investmentStrategyDescription": "'
                        +json_value(body, '$.basicInvestmentParameters.investmentStrategyDescription')
                        +'"}'
                       )
                      ),
           '$.investmentStrategyCode',
           NULL
                    ),
         '$.investmentStrategyDescription',
         NULL                    
                  ))
 where json_query(body, '$.basicInvestmentParameters.investmentStrategy') is null