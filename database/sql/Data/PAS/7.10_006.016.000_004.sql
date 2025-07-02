--bfx_impl.investment_strategy
delete from bfx_impl.investment_strategy
 where code in ('gazprom')
insert into bfx_impl.investment_strategy
(id, code, description)
values
('0d3fc848-18e3-4d5d-a6a2-74eae914e548', N'gazprom', N'Акции - Газпром')