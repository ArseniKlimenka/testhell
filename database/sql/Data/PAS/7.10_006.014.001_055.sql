IF
	exists (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'ORG_IMPL.SERVICE_PROVIDER_INFO_SAT') AND TYPE IN (N'U'))
	and
	not exists (SELECT * FROM sys.columns WHERE Name = N'PARTNER_CODE' AND Object_ID = Object_ID(N'ORG_IMPL.SERVICE_PROVIDER_INFO_SAT'))
BEGIN
	ALTER TABLE ORG_IMPL.SERVICE_PROVIDER_INFO_SAT ADD PARTNER_CODE NVARCHAR(max) NULL;

	EXEC(N'
update spis
   set spis.partner_code = json_value(sp.body, ''$.partnerCode'')
  from org.service_provider sp,
       org_impl.service_provider_hub sph,
       org_impl.service_provider_info_sat spis
 where sp.service_provider_code = sph.service_provider_code
   and sph.service_provider_hkey = spis.service_provider_info_hkey');
END
GO