--bfx_impl.investment_strategy
delete from bfx_impl.INVESTMENT_STRATEGY 
 where code in ('majorLeague 5.0')
insert into bfx_impl.INVESTMENT_STRATEGY
(ID, CODE, DESCRIPTION)
values
('7BFEC72B-0D4A-4E11-A09B-18FA754E17E1', N'majorLeague 5.0', N'Высшая лига 5.0')
