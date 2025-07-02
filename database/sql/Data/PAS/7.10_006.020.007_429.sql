delete from bfx_impl.investment_strategy
 where code in ('indexMosbirzhi')
insert into bfx_impl.investment_strategy
(id, code, description)
values
('927B46AC-19CC-476B-8001-5B3F9D1CF90C', N'indexMosbirzhi', N'Акции - Мосбиржа')

-- Пункт 6 мед декларации
delete from bfx_impl.declaration_medical_questions where id = '87976827-EBE9-48D6-B75E-036DE21D26F5'; insert into bfx_impl.declaration_medical_questions values ('87976827-EBE9-48D6-B75E-036DE21D26F5', N'Не намереваюсь путешествовать на территории, на которой объявлено чрезвычайное положение или проводятся боевые действия.');

-- Добавление строк
delete from bfx_impl.declaration_medical where id = '22B59183-FC0E-47A1-8693-EC13F4B8D6F5'; insert into bfx_impl.declaration_medical values ('22B59183-FC0E-47A1-8693-EC13F4B8D6F5', 'IBI3BFKO17Y', '6', '87976827-EBE9-48D6-B75E-036DE21D26F5', 'underwriting','2023-08-15','2099-12-31',0);
delete from bfx_impl.declaration_medical where id = '5B781EDF-6CCD-4F7E-9167-7A990075ED2A'; insert into bfx_impl.declaration_medical values ('5B781EDF-6CCD-4F7E-9167-7A990075ED2A', 'IBI3BFKO17O', '6', '87976827-EBE9-48D6-B75E-036DE21D26F5', 'underwriting','2023-08-15','2099-12-31',0);
delete from bfx_impl.declaration_medical where id = '6ABCF44F-11F9-4A4A-8BC8-01700E5C81BF'; insert into bfx_impl.declaration_medical values ('6ABCF44F-11F9-4A4A-8BC8-01700E5C81BF', 'IBI5BFKO17Y', '6', '87976827-EBE9-48D6-B75E-036DE21D26F5', 'underwriting','2023-08-15','2099-12-31',0);
delete from bfx_impl.declaration_medical where id = '741ED46D-E8C3-481C-9FAA-A45BB770D838'; insert into bfx_impl.declaration_medical values ('741ED46D-E8C3-481C-9FAA-A45BB770D838', 'IBI5BFKO17O', '6', '87976827-EBE9-48D6-B75E-036DE21D26F5', 'underwriting','2023-08-15','2099-12-31',0);


