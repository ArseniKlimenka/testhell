if not exists (select * from sys.indexes where name = 'IX_PRODUCT_CONF_PRODUCT_CODE' )
begin
	create nonclustered index IX_PRODUCT_CONF_PRODUCT_CODE
	on BFX_IMPL.PRODUCT_CONF (PRODUCT_CODE)
	include (CONF_VERSION);
end

------------------

