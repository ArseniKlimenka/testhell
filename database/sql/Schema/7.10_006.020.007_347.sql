if (not exists(select * from sys.indexes where name = 'IX_CA_ACT_ITEM_ACT_ID'))
begin
	create nonclustered index IX_CA_ACT_ITEM_ACT_ID on acc_impl.CA_ACT_ITEM (ACT_ID) include
	(
		STATUS_ID,
		PAYMENT_LC_AMOUNT,
		LC_COMM_AMOUNT_CALC,
		LC_COMM_AMOUNT_EXTRA,
		LC_COMM_AMOUNT_FINAL,
		LC_VAT_AMOUNT,
		IS_TECHNICAL
	);
end
go
