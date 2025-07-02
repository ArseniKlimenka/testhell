-- products
delete from bfx_impl.products
where code in ('GENCHKSPORT','GENCHKTALENTS','GENCHKHEALTH')

insert into bfx_impl.products
(id, code, product_group, description)
values
('94CC2B73-11AB-4931-9FEE-C9C2543522DD', N'GENCHKSPORT', N'med', N'Генетический чек-ап «Питание и спорт»'),
('A4B0F822-E342-4568-9316-D30AEE500721', N'GENCHKTALENTS', N'med', N'Генетический чек-ап «Таланты и способности»'),
('33C2FB9F-F39C-4F53-AB73-1367D34D3C55', N'GENCHKHEALTH', N'med', N'Генетический чек-ап «Мое здоровье»')