--bfx_impl.investment_strategy
delete from bfx_impl.INVESTMENT_STRATEGY 
 where code in ('majorLeague 6.0')
insert into bfx_impl.INVESTMENT_STRATEGY
(ID, CODE, DESCRIPTION)
values
('7FA2318D-DE85-4740-A25B-8C44D135F531', N'majorLeague 6.0', N'Высшая лига 6.0')