IF EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'[ORG_IMPL].[SERVICE_PROVIDER_INFO_SAT]') AND TYPE IN (N'U'))
BEGIN

update spis
   set spis.receive_type = json_value(sp.body, '$.receiveType')
  from org_impl.service_provider_info_sat spis,
       org_impl.service_provider_hub sph,
       org.service_provider sp
 where sph.service_provider_hkey = spis.service_provider_info_hkey
   and sp.service_provider_code = sph.service_provider_code

END
GO