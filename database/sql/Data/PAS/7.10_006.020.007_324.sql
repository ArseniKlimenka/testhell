-- products
delete from bfx_impl.products
where code in ('EBMGREINVEST', 'IDG3REINVEST', 'IDG5REINVEST', 'IDG1REINVEST','IBA3REINVEST','IBA5REINVEST')
insert into bfx_impl.products
(id, code, product_group, description)
values
('81805D86-EABC-4E1C-9235-39F1ECA02C4A', N'EBMGREINVEST', N'endowment', N'Стратегия на пять. Гарант'),
('94E38A6C-D1C0-4975-ABE8-80411AEE3D41', N'IDG3REINVEST', N'investment', N'Драйвер гарантия (3 года)'),
('C3C3B486-A0EA-47FC-B468-F721EBC915A8', N'IDG5REINVEST', N'investment', N'Драйвер гарантия (5 лет)'),
('D44D23B2-BB76-4B4D-9FFF-E6DCE02FBB47', N'IDG1REINVEST', N'investment', N'Драйвер гарантия (1 год)'),
('58058040-9A5F-4556-BB1D-7EEF5E125B4B', N'IBA3REINVEST', N'investment', N'Базис Актив (3 года)'),
('93360241-40DD-46EB-9006-B185C736129F', N'IBA5REINVEST', N'investment', N'Базис Актив (5 лет)')