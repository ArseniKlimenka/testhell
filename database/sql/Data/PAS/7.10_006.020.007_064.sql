delete from bfx_impl.products
where code in ('RHELIGHTOAS','RHEBASEOAS','RHEOPTIMAOAS')

insert into bfx_impl.products
(id, code, product_group, description)
values
('F571A5CB-2ED4-4D6C-AC33-7DCA4EDB8071', N'RHELIGHTOAS', N'med', N'Восстанови здоровье Лайт'),
('F765AE69-9753-4565-BD1D-93B7A386A05D', N'RHEBASEOAS', N'med', N'Восстанови здоровье вариант Базовый'),
('E7E35111-76F8-44CF-8139-180FC946C62C', N'RHEOPTIMAOAS', N'med', N'Восстанови здоровье вариант Оптима')