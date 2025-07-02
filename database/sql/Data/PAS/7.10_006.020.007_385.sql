-- Добавление стратегий 
delete from bfx_impl.investment_strategy
 where code in ('rosneft')
insert into bfx_impl.investment_strategy
(id, code, description)
values
('030C895D-7A45-4A93-80A2-D685E28F4D16', N'rosneft', N'Акции - Роснефть')