-- add new migration risk CDH210800
delete from BFX_IMPL.RISKS
where code IN('I36404')
insert into BFX_IMPL.RISKS
(ID, CODE, TYPE, BUSINESS_LINE, SHORT_DESCRIPTION, FULL_DESCRIPTION, NOTE, PAYMENT_FORM, RISKS_GROUP, FNS_TYPE)
values
('FC55620B-A23B-4D96-A9E5-134A8720CC08', N'I36404', N'life', '36404', N'Травма', N'Травма Застрахованного в результате несчастного случая', NULL, N'InsuranceAmount', N'NULL', N'nonLife')