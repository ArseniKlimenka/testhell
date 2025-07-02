delete from bfx_impl.products where code = N'I726InnResheniya'; insert into bfx_impl.products values ('A95079F3-E1EF-477A-8821-88521A6C26CD', N'I726InnResheniya',N'investment',N'Бонд Репак Драйвер Гарантия 3USD',N'НСЖ');
delete from bfx_impl.products where code = N'I736InnResheniya'; insert into bfx_impl.products values ('51612C2D-3971-44E7-B5B4-B0290DA33B7A', N'I736InnResheniya',N'investment',N'Бонд Репак Драйвер Гарантия 5USD',N'НСЖ');
delete from bfx_impl.products where code = N'I735VTBP'; insert into bfx_impl.products values ('E032B133-D4FB-4011-B4CB-6C6423F9CB27', N'I735VTBP',N'investment',N'Бонд Репак Драйвер Гарантия 2RUB',N'НСЖ');
delete from bfx_impl.products where code = N'I787InnResheniya'; insert into bfx_impl.products values ('874EFA7E-11B1-4EAD-A663-D86E7A1E608E', N'I787InnResheniya',N'investment',N'НОТА СЖ Стабильный капитал 3 RUB',N'ИСЖ');
delete from bfx_impl.products where code = N'I787BFKOP'; insert into bfx_impl.products values ('4E8E72FC-7119-47DC-B20F-38F69C8FFB83', N'I787BFKOP',N'investment',N'НОТА СЖ Стабильный капитал 3 RUB',N'ИСЖ');

delete from bfx_impl.risks
 where code in ('DNS336102','I336102','DNS3C36102','I3C36102')
insert into bfx_impl.risks
(ID, CODE, TYPE, BUSINESS_LINE, SHORT_DESCRIPTION, FULL_DESCRIPTION, NOTE, PAYMENT_FORM, RISKS_GROUP)
values
('4AB3F4DB-732E-45D1-BF6E-59D8E6FE58A5', N'DNS336102', N'life', '36102', N'Смерть НС 3 мес', N'Смерть застрахованного в результате несчастного случая 3 мес', NULL, N'InsuranceAmount', N'Death'),
('8B5C0275-410D-4C8E-89D6-BBA6B64CE4EE', N'I336102', N'life', '36102', N'Травма 3 мес', N'Травма Застрахованного в результате несчастного случая 3 мес', NULL, N'InsuranceAmount', NULL),
('69F5D75A-E8E7-4F3E-8D3E-E2C43879E6CD', N'DNS3C36102', N'life', '36102', N'Смерть НС 3 мес ребенок', N'Смерть застрахованного (ребенок) в результате несчастного случая 3 мес', NULL, N'InsuranceAmount', N'Death'),
('AB9AE9C0-80A1-41D3-9AA1-D0CCE4D1B365', N'I3C36102', N'life', '36102', N'Травма 3 мес ребенок', N'Травма Застрахованного (ребенок) в результате несчастного случая 3 мес', NULL, N'InsuranceAmount', NULL)

delete from bfx_impl.investment_strategy where code = N'stableCapital'; insert into bfx_impl.investment_strategy values ('50EBB079-5380-4355-B6A1-0D6B97DEE838', N'stableCapital', N'Стабильный капитал');