delete from bfx_impl.products where code = N'I885VTBP'; insert into bfx_impl.products values ('A68DF0C3-B877-485B-8E3A-DAD5E81BEE7A', N'I885VTBP',N'investment',N'Стабильный процент Бонд 1RUB',N'ИСЖ', N'migrated', NULL);

delete from bfx_impl.INVESTMENT_STRATEGY
where id = 'BF317C10-1088-4E73-9F83-E9A057F0910E'
insert into bfx_impl.INVESTMENT_STRATEGY
(ID, CODE, DESCRIPTION)
values
('BF317C10-1088-4E73-9F83-E9A057F0910E', N'stablePercentageBond', N'СТАБИЛЬНЫЙ ПРОЦЕНТ. БОНД')

delete from bfx_impl.risks
 where code in (N'DNS36914')
insert into bfx_impl.risks
(id, code, type, business_line, short_description, full_description, note, payment_form, risks_group, fns_type)
values
 (N'1BC4C2F3-1265-40D9-9AC1-6EC7FBF90B0B', N'DNS36914', N'life', N'36914', N'Смерть НС', N'Смерть Застрахованного в результате несчастного случая',NULL,'InsuranceAmount',N'Death',N'nonLife')