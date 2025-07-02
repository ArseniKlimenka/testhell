if (not exists(select * from sys.indexes where name = 'IX_ALLOCATION_DOCUMENT_NO'))
begin
	create nonclustered index IX_ALLOCATION_DOCUMENT_NO on acc_impl.ALLOCATION ([DOCUMENT_NO]);
end
go

if (not exists(select * from sys.indexes where name = 'IX_MATCHING_ALLOCATION_ID'))
begin
	create nonclustered index IX_MATCHING_ALLOCATION_ID on acc_impl.MATCHING ([ALLOCATION_ID]) include ([DOC_AMOUNT],[TOLERANCE_DOC_AMOUNT]);
end
go

if (not exists(select * from sys.indexes where name = 'IX_PAYABLE_COMMISSION_MATCHING_ID'))
begin
	create nonclustered index IX_PAYABLE_COMMISSION_MATCHING_ID on acc_impl.PAYABLE_COMMISSION ([MATCHING_ID]);
end
go

if (not exists(select * from sys.indexes where name = 'IX_P_INVOICED_COMMISSION_CONTRACT_NUMBER'))
begin
	create nonclustered index IX_P_INVOICED_COMMISSION_CONTRACT_NUMBER on pas_impl.P_INVOICED_COMMISSION ([CONTRACT_NUMBER]);
end
go

if (not exists(select * from sys.indexes where name = 'IX_REFERENCE_NUMBER_DOCUMENT_NO'))
begin
	create nonclustered index IX_REFERENCE_NUMBER_DOCUMENT_NO on acc_impl.REFERENCE_NUMBER (DOCUMENT_NO);
end
go

if (not exists(select * from sys.indexes where name = 'IX_ALLOCATION_BSI_ID'))
begin
	create nonclustered index IX_ALLOCATION_BSI_ID on acc_impl.ALLOCATION (BANK_STATEMENT_ITEM_ID) include (PAY_AMOUNT);
end
go

if (not exists(select * from sys.indexes where name = 'IX_BSI_REGISTRY_REFERENCE_NO'))
begin
	create nonclustered index IX_BSI_REGISTRY_REFERENCE_NO on acc_impl.BANK_STATEMENT_ITEM (REGISTRY_REFERENCE_NO);
end
go
