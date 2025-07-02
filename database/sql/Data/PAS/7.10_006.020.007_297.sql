delete from bfx_impl.risks
 where code in ('DC12A33102')
insert into bfx_impl.risks
(ID, CODE, TYPE, BUSINESS_LINE, SHORT_DESCRIPTION, FULL_DESCRIPTION, PAYMENT_FORM, RISKS_GROUP)
values
('CB718744-8D67-4185-BD02-F27DD8320E69', N'DC12A33102', N'life', '33102', N'Инвалидность 1,2 гр. или категория "ребенок-инвалид" в результате НС', N'Инвалидность Застрахованного с установлением категории «ребенок-инвалид» или I, II группы инвалидности в результате несчастного случая', N'InsuranceAmount', N'Disability')