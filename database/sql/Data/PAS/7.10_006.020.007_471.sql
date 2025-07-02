delete from bfx_impl.risks
 where code in ('E56102')
insert into bfx_impl.risks
(ID, CODE, TYPE, BUSINESS_LINE, SHORT_DESCRIPTION, FULL_DESCRIPTION, PAYMENT_FORM, RISKS_GROUP)
values
('88A2D3E2-D4F9-4F1F-BEE0-005FDF7F085F', N'E56102', N'life', '56102', N'Дожитие', N'Дожитие застрахованного до окончания срока страхования', N'InsuranceAmount', N'Endowment')

delete from bfx_impl.risks
 where code in ('DLPDP56102')
insert into bfx_impl.risks
(ID, CODE, TYPE, BUSINESS_LINE, SHORT_DESCRIPTION, FULL_DESCRIPTION, PAYMENT_FORM, RISKS_GROUP)
values
('8E6B5380-46C3-45CA-9C58-36288BC726EC', N'DLPDP56102', N'life', '56102', N'Смерть ЛП с отложенной выплатой', N'Смерть Застрахованного по любой причине с отложенной страховой выплатой', N'InsuranceAmount', N'Death')

delete from bfx_impl.risks
 where code in ('DDTP56102')
insert into bfx_impl.risks
(ID, CODE, TYPE, BUSINESS_LINE, SHORT_DESCRIPTION, FULL_DESCRIPTION, PAYMENT_FORM, RISKS_GROUP)
values
('14A6B26F-CA2D-4AD3-AB4B-A4BA48A98CB9', N'DDTP56102', N'life', '56102', N'Смерть в результате ДТП', N'Смерть Застрахованного в результате дорожно-транспортного происшествия', N'InsuranceAmount', N'Death')

delete from bfx_impl.risks
 where code in ('DLP56102')
insert into bfx_impl.risks
(ID, CODE, TYPE, BUSINESS_LINE, SHORT_DESCRIPTION, FULL_DESCRIPTION, PAYMENT_FORM, RISKS_GROUP)
values
('08616233-C5F0-4C90-9C50-C8A77A07B368', N'DLP56102', N'life', '56102', N'Смерть ЛП', N'Cмерть Застрахованного по любой причине', N'InsuranceAmount', N'Death')