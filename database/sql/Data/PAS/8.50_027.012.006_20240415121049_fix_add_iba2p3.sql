-- products
delete from bfx_impl.PRODUCTS
 where CODE in ('IBA2P3')
 insert into bfx_impl.PRODUCTS
 (ID, CODE, PRODUCT_GROUP, DESCRIPTION, PRODUCT_CLASS, SALES_SEGMENT)
 VALUES
('180678AA-0481-49B1-9937-504B8EDEA1FB', N'IBA2P3', N'investment', N'Базис Актив Премиум 2.0', N'ИСЖ', N'affluent')
