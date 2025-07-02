--Создание новых продуктов для миграции
delete from bfx_impl.products where code = N'I846VTBP'; insert into bfx_impl.products values ('C634B0D9-C376-4490-AAEE-B844B2BD2210', N'I846VTBP',N'investment',N'Стабильный Процент Ультра 1RUB',N'ИСЖ', N'migrated', null);
delete from bfx_impl.products where code = N'I852VTBP'; insert into bfx_impl.products values ('8DF9F041-C450-470A-BEBF-0469E405E1EF', N'I852VTBP',N'investment',N'Драйвер Гарантия Ультра БондРепак 1USD',N'ИСЖ', N'migrated', null);
delete from bfx_impl.products where code = N'I832InnResheniya'; insert into bfx_impl.products values ('23B16334-72A3-422B-8A30-C375702E1FA4', N'I832InnResheniya',N'investment',N'Драйвер Гарантия БондРепак 0.5RUB',N'ИСЖ', N'migrated', null);


