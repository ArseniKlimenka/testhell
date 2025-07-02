if not exists (select * from acc_impl.ct_bsi_source_account where account_no = N'00000000000000000000')
begin
insert into acc_impl.ct_bsi_source_account
(account_no, income_source_id, payment_source_id, description)
values
('00000000000000000000', 0, 1, N'Дефолтный счет для ХМL файлов РФМ')
end

if not exists (select * from acc_impl.ct_bsi_source_account where account_no = N'40701810201700000144')
begin
insert into acc_impl.ct_bsi_source_account
(account_no, income_source_id, payment_source_id, description)
values
('40701810201700000144', 71, 1, N'Банк ФК Открытие')
end