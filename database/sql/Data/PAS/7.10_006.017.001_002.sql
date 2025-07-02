delete from bfx_impl.investment_strategy
 where code in ('lukoil')
insert into bfx_impl.investment_strategy
(id, code, description)
values
('2B2A9F39-A79B-4F5D-84BC-9636A5265539', N'lukoil', N'Акции - Лукойл')