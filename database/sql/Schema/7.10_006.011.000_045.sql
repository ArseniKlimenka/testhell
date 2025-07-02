
IF EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[dbo].[get_transformed_transactions]') AND type IN (N'FN', N'FS', N'FT', N'TF', N'IF'))
BEGIN
DROP FUNCTION [dbo].[get_transformed_transactions];
END
GO

create function get_transformed_transactions()
returns table
as
return (
select
s.IS_DEBIT,
aa.BALANCE_UNIT                     as BUKRS,
s.PAIR_NO                           as BELNR,
null                                as BUZEI,
tdt.TRANSACTION_DOCUMENT_TYPE_CODE  as BLART,
s.POST_DATE                         as BLDAT,
s.POST_DATE                         as BUDAT,
tc1.TRANSACTION_CODE                as TCODE,
null                                as XBLNR,
tt.DESCRIPTION                      as BKTXT, --TODO: length is defined as 25. But transaction type descriptions are defined as longer (e.g. Начисление  вознаграждения посредникам (Оценка))
s.SOURCE_CURRENCY_CODE              as WAERS,
aa.REGISTER                         as LDGRP,
aa.LOCAL_DIMENSION_1                as YYGT_FLD1,
aa.LOCAL_DIMENSION_2                as YYGT_FLD2,
ld3.LOCAL_DIMENSION_3_CODE          as YYGT_FLD3,
null                                as YYGT_FLD4,
null                                as YYGT_FLD5,
aa.AA_ORDER_NO                      as AUFNR,
null                                as BEWAR,
aa.TRANSACTION_CODE_2               as BSCHL,
s.ACCOUNTING_GROSS_AMOUNT           as DMBTR,
null                                as FWBAS,
sapa.SAP_GL_ACCOUNT_NO              as HKONT,
aa.COST_CENTER                      as KOSTL,
null                                as KUNNR,
null                                as LIFNR,
aa.PARTY_CODE                       as SGTXT, --TODO: what about customer we need here?
null                                as UMSKZ,
aa.TRADING_PARTNER                  as VBUND,
s.SOURCE_AMOUNT                     as WRBTR,
null                                as XREF1,
aa.XREF2                            as XREF2,
aa.PERSONAL_ACCOUNT_NUMBER          as XREF3,
aa.CEDENTS_COUNTRY                  as YYGT_CTY,
aa.BUSINESS_LINE                    as YYGT_LLOB,
null                                as ZFBDT,
null                                as ZTERM,
aa.DOCUMENT_NO                      as ZUONR,
null                                as LAND1
from acc.GL_SUBLEDGER_ENTRY s
inner join acc.GL_ADDITIONAL_ATTRIBUTES aa on s.GL_ADDITIONAL_ATTRIBUTE_ID = aa.GL_ADDITIONAL_ATTRIBUTE_ID
inner join ACC_IMPL.SAP_GL_ACCOUNT sapa on aa.SAP_GL_ACCOUNT_ID = sapa.SAP_GL_ACCOUNT_ID
left join ACC_IMPL.CT_TRANSACTION_DOCUMENT_TYPE tdt on aa.TRANSACTION_DOCUMENT_TYPE_ID = tdt.TRANSACTION_DOCUMENT_TYPE_ID
left join ACC_IMPL.CT_TRANSACTION_CODE_1 tc1 on aa.TRANSACTION_CODE_1 = tc1.TRANSACTION_CODE_1_ID
left join ACC_IMPL.TRANSACTION_TYPE tt on aa.TRANSACTION_TYPE_ID = tt.TRANSACTION_TYPE_ID
left join ACC_IMPL.CT_LOCAL_DIMENSION_3 ld3 on aa.LOCAL_DIMENSION_3_ID = ld3.LOCAL_DIMENSION_3_ID
);

-- examples
/*
select * from get_transformed_transactions()
where ZUONR = '88100-000004210'
order by BELNR desc, IS_DEBIT;
*/
