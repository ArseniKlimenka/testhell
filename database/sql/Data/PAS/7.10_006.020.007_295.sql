-- products
delete from bfx_impl.products
where code in ('NOTE3BFKO')

insert into bfx_impl.products
(id, code, product_group, description, product_class)
values
('6A54FA03-9A4B-49C6-9730-015D5DA96CF7', N'NOTE3BFKO', N'investment', N'Нота Премиум (3 года)', N'НСЖ')


--bfx_impl.investment_strategy
delete from bfx_impl.INVESTMENT_STRATEGY 
 where code in ('majorLeague')
insert into bfx_impl.INVESTMENT_STRATEGY
(ID, CODE, DESCRIPTION)
values
('52309078-3167-416A-98F9-9EB3AD340535', N'majorLeague', N'Высшая лига')