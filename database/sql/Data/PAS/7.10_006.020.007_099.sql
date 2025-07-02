delete from bfx_impl.products
 where code in (
N'E703OAS',
N'E703BFKO',
N'I652BFKO',
N'I652OAS',
N'I652ZENIT',
N'I648BFKO',
N'I648ZENIT',
N'I648OAS',
N'E580PSB',
N'E638ZENIT',
N'E638AKBARS',
N'E641BFKO'
)
insert into bfx_impl.products
(id, code, product_group, description, product_class)
values
('b3b617bf-f43b-403b-898c-09d195cc70fc', N'E703OAS', N'endowment', N'Стратегия на пять RUB', N'НСЖ'),
('6d9f30d0-2874-4137-ab0c-106bb59dfdaf', N'E703BFKO', N'endowment', N'Стратегия на пять RUB', N'НСЖ'),
('45d1d156-daed-46c6-bed6-278f162b7ede', N'I652BFKO', N'investment', N'Базис Инвест Акции Газпром 3RUB', N'ИСЖ'),
('91f43314-1430-4278-94e9-2ae4751a3911', N'I652OAS', N'investment', N'Базис Инвест Акции Газпром 3RUB', N'ИСЖ'),
('ec3877d8-7d84-4e19-a8fd-47e0bfd02802', N'I652ZENIT', N'investment', N'Базис Инвест Акции Газпром 3RUB', N'ИСЖ'),
('8c94d435-5ae8-4acd-babc-4e5d0b36aac8', N'I648BFKO', N'investment', N'Базис Инвест Фосагро 3RUB', N'ИСЖ'),
('3d1f1a8e-af2f-4bb5-9a52-653b3dbde3de', N'I648ZENIT', N'investment', N'Базис Инвест Фосагро 3RUB', N'ИСЖ'),
('a20325c7-86b3-4d4b-8a85-83e8c520a81f', N'I648OAS', N'investment', N'Базис Инвест Фосагро 3RUB', N'ИСЖ'),
('a54e47dc-d634-4660-a538-86f6b3b4fada', N'E580PSB', N'endowment', N'ПСБ НСЖ Надежный Выбор Коробка RUB', N'НСЖ'),
('88445285-9e04-4844-bee6-8dfe2775ec22', N'E638ZENIT', N'endowment', N'Премиум Гарант Плюс RUB', N'НСЖ'),
('8f43f2a6-dc17-45e8-affb-97be693aaadd', N'E638AKBARS', N'endowment', N'Премиум Гарант Плюс RUB', N'НСЖ'),
('cb7b200b-48ed-40e7-9d0c-c5a035c15ab4', N'E641BFKO', N'endowment', N'Финансовый резерв БФКО RUB', N'НСЖ')