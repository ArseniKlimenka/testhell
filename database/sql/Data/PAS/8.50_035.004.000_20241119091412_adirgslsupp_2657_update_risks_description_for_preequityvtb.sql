-- fill bfx_impl.risks
delete from bfx_impl.risks
 where code in (N'E36914', N'DLP36914', N'DNS36414')
insert into bfx_impl.risks
(id, code, type, business_line, short_description, full_description, note, payment_form, risks_group, fns_type)
values
('47057bb8-15e6-4b3a-9dcc-56ef9a6dcfb1', N'E36914', N'life', N'36914', N'Дожитие', N'Дожитие Застрахованного до окончания срока страхования', NULL, N'InsuranceAmount', N'Endowment', N'life'),
('b8ed3ae7-1326-417d-ad42-99dd698634ce', N'DLP36914', N'life', N'36914', N'Смерть ЛП', N'Смерть Застрахованного по любой причине', NULL, N'InsuranceAmount', N'Death', N'life'),
('b600be3b-f52d-4351-ab17-be3b4fdc5129', N'DNS36414', N'life', N'36414', N'Смерть НС', N'Смерть Застрахованного в результате несчастного случая', NULL, N'InsuranceAmount', N'Death', N'nonLife')