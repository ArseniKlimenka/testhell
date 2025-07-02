if exists (select 1 from sys.objects
           where object_id = object_id(N'ACC_IMPL.AGGREGATED_PAYMENT_REGISTER'))
   and exists (select 1 from sys.columns
               where name = N'SOURCE_FILE_FORMAT'
               and object_id = object_id(N'ACC_IMPL.AGGREGATED_PAYMENT_REGISTER'))
begin
    update ACC_IMPL.AGGREGATED_PAYMENT_REGISTER set SOURCE_FILE_FORMAT = 1
end