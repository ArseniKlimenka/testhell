-- helper functions
DECLARE @SQLString nvarchar(max)
SET @SQLString =  
N'create function [dbo].[impl_get_address](@partyAddresses nvarchar(max), @addressType nvarchar(1))
returns nvarchar(max)
as
begin
  return null 
end';
IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[dbo].[impl_get_address]') AND type IN (N'FN', N'FS', N'FT', N'TF', N'IF'))
BEGIN
       EXECUTE sp_executesql @SQLString
END
GO

ALTER function impl_get_address(@partyAddresses nvarchar(max), @addressType nvarchar(1))
returns nvarchar(max)
as
begin

  declare @address nvarchar(max)

  select @address = value
    from (select row_number() over(order by [key]) as row_number, value
            from OPENJSON((JSON_QUERY(@partyAddresses))) 
           where JSON_VALUE(value, '$.addressType.addressTypeCode') = @addressType
         ) t
   where row_number = 1
  
  return @address
  
end
GO

DECLARE @SQLString nvarchar(max)
SET @SQLString =  
N'create function [dbo].[impl_get_document](@partyAddresses nvarchar(max), @addressType nvarchar(1))
returns nvarchar(max)
as
begin
  return null 
end';
IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[dbo].[impl_get_document]') AND type IN (N'FN', N'FS', N'FT', N'TF', N'IF'))
BEGIN
       EXECUTE sp_executesql @SQLString
END
GO

ALTER function impl_get_document(@partyDocuments nvarchar(max))
returns nvarchar(max)
as
begin

  declare @document nvarchar(max)

  select @document = value
    from (select row_number() over(order by case JSON_VALUE(value, '$.docType.docTypeCode') when 'passport' then 1 else 2 end asc, TRY_CAST(JSON_VALUE(value, '$.issueDate') as DATETIME) desc, [key] desc) as row_number, value
          from OPENJSON((JSON_QUERY(@partyDocuments)))
         ) t
   where row_number = 1
  
  return @document
  
end
GO

DECLARE @SQLString nvarchar(max)
SET @SQLString =  
N'create function [dbo].[impl_get_email](@partyAddresses nvarchar(max), @addressType nvarchar(1))
returns nvarchar(max)
as
begin
  return null 
end';
IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[dbo].[impl_get_email]') AND type IN (N'FN', N'FS', N'FT', N'TF', N'IF'))
BEGIN
       EXECUTE sp_executesql @SQLString
END
GO

ALTER function impl_get_email(@partyEmails nvarchar(max))
returns nvarchar(max)
as
begin

  declare @email nvarchar(max)

  select @email = value
    from (select row_number() over(order by [key] desc) as row_number, value
            from OPENJSON((JSON_QUERY(@partyEmails)))
         ) t
   where row_number = 1
  
  return @email
  
end
GO

DECLARE @SQLString nvarchar(max)
SET @SQLString =  
N'create function [dbo].[impl_get_phone](@partyAddresses nvarchar(max), @addressType nvarchar(1))
returns nvarchar(max)
as
begin
  return null 
end';
IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[dbo].[impl_get_phone]') AND type IN (N'FN', N'FS', N'FT', N'TF', N'IF'))
BEGIN
       EXECUTE sp_executesql @SQLString
END
GO

ALTER function impl_get_phone(@partyPhones nvarchar(max))
returns nvarchar(max)
as
begin

  declare @phone nvarchar(max)

  select @phone = value
    from (select row_number() over(order by JSON_VALUE(value, '$.phoneType.phoneTypeCode') desc, [key] desc) as row_number, value
          from OPENJSON((JSON_QUERY(@partyPhones)))
         ) t
   where row_number = 1
  
  return @phone
  
end
GO

-- main function
DECLARE @SQLString nvarchar(max)
SET @SQLString =  
N'create function [dbo].[impl_get_sap_integration_data](@partyAddresses nvarchar(max), @addressType nvarchar(1))
returns table
as
begin
  return null 
end';
IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[dbo].[impl_get_sap_integration_data]') AND type IN (N'FN', N'FS', N'FT', N'TF', N'IF'))
BEGIN
       EXECUTE sp_executesql @SQLString
END
GO

ALTER function [dbo].[impl_get_sap_integration_data](@date date, @contract_number nvarchar(50))
returns table
as
return(
with 
t_list as
(
	select 
	c.CONTRACT_NUMBER 
	from pas.contract c,
		 pas_impl.policy_hub h,
		 pas_impl.POLICY_SAT s,
		 pas_impl.POLICY_SAT_LATEST sl
	where c.contract_number = h.contract_number
		 and h.policy_hkey = s.policy_hkey
		 and h.policy_hkey = sl.policy_hkey
		 and ISNULL(s.IS_MIGRATED, 0) = 0
		 and s.state = 'Active'
		 and sl.state in ('Active','Activated')
		 AND  (@date IS NOT NULL AND cast(s.load_date as date) = @date)
),
daily_contracts as (
	select 
	c.CONTRACT_NUMBER ,c.BODY
	,JSON_VALUE(c.body, '$.mainInsuranceConditions.insuranceProduct.productCode') AS productCode
	from pas.contract c
	INNER JOIN t_list
	ON t_list.CONTRACT_NUMBER = c.CONTRACT_NUMBER
),
security_codes as (
select 
     sq.reference_number as contract_number,
     sq.product_group,
     sq.security_code as ROW9_1,
     convert(varchar, CAST(sq.notification_date as date), 104) as ROW9_2,
     convert(varchar(8), CAST(sq.notification_date as time)) as ROW9_3
from (select 
          ssn.security_code,
          ssn.reference_number,
          ssn.notification_date,
          rank() over (partition by ssn.reference_number order by ssn.notification_date desc) as rank,
          JSON_VALUE(c.body, '$.mainInsuranceConditions.insuranceProduct.productGroup') as product_group
     from bfx_impl.sms_security_notification ssn,
          daily_contracts c
     where ssn.reference_number = c.contract_number
          and ssn.is_verified = 1) sq
where sq.rank = 1
),
integration_data as (
select c.contract_number,
------------------------------------------------------------------------------------------------------------------------------------------------------
----------------------------------------------------------------------ROW1----------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------------------------------
     JSON_VALUE(c.body, '$.mainInsuranceConditions.insuranceProduct.productGroup') as product_group,
     '1' as ROW1_1,
     JSON_VALUE(c.body, '$.policyHolder.partyData.partyBody.partyPersonData.firstName') as ROW1_2,
     isnull(JSON_VALUE(c.body, '$.policyHolder.partyData.partyBody.partyPersonData.middleName'), '-') as ROW1_3,
     JSON_VALUE(c.body, '$.policyHolder.partyData.partyBody.partyPersonData.lastName') as ROW1_4,
     isnull(JSON_VALUE(c.body, '$.policyHolder.partyData.partyBody.partyPersonData.citizenship[0].alfa2'), 'RU') as ROW1_5,
     isnull(JSON_VALUE(c.body, '$.policyHolder.partyData.partyBody.partyPersonData.citizenship[0].alfa2'), 'RU') as ROW1_6,
     case JSON_VALUE(c.body, '$.policyHolder.partyData.partyBody.partyPersonData.personGender')
          when 'Female' then '2'
          else '1'
     end as ROW1_7,
     convert(varchar, CAST(JSON_VALUE(c.body, '$.policyHolder.partyData.partyBody.partyPersonData.dateOfBirth') as date), 104) as ROW1_8,
     isnull(JSON_VALUE(c.body, '$.policyHolder.partyData.partyBody.partyPersonData.birthPlace'), 'не требуется') as ROW1_9,
     case JSON_VALUE(c.body, '$.policyHolder.partyData.partyBody.partyPersonData.personGender')
          when 'Female' then '002'
          else '001'
     end as ROW1_10,
     case isnull(JSON_VALUE(c.body, '$.policyHolder.partyData.partyBody.partyFatca.confirmationDate'), 'isnull')
          when 'isnull' then '2'
          else '1'
     end as ROW1_11,
     isnull(convert(varchar, CAST(JSON_VALUE(dbo.impl_get_document(JSON_QUERY(c.body, '$.policyHolder.partyData.partyBody.partyDocuments')), '$.issueDate') as date), 104), convert(varchar, CAST('2099-01-01' as date), 104)) as ROW1_12,
     isnull(JSON_VALUE(dbo.impl_get_document(JSON_QUERY(c.body, '$.policyHolder.partyData.partyBody.partyDocuments')), '$.issuerName'), 'не требуется') as ROW1_13,
     isnull(JSON_VALUE(dbo.impl_get_document(JSON_QUERY(c.body, '$.policyHolder.partyData.partyBody.partyDocuments')), '$.issuerCode'), '000-000') as ROW1_14,
     JSON_VALUE(dbo.impl_get_document(JSON_QUERY(c.body, '$.policyHolder.partyData.partyBody.partyDocuments')), '$.docNumber') as ROW1_15,
     case 
        when EXISTS (
            select 1 
            from OPENJSON(JSON_QUERY(c.body, '$.policyHolder.partyData.partyBody.partyDocuments')) 
            with (
                docTypeCode nvarchar(50) '$.docType.docTypeCode'
            ) as docs
            where docs.docTypeCode in ('passport', 'incurredIdentityCard', 'foreignCitPassport')
        )
        then 
            (select top 1 
                case 
                    when docTypeCode = 'passport' then '001'
                    when docTypeCode = 'incurredIdentityCard' then '009'
                    when docTypeCode = 'foreignCitPassport' then '003'
                end
            from OPENJSON(JSON_QUERY(c.body, '$.policyHolder.partyData.partyBody.partyDocuments')) 
            with (
                docTypeCode nvarchar(50) '$.docType.docTypeCode'
            ) as docs
            where docs.docTypeCode in ('passport', 'incurredIdentityCard', 'foreignCitPassport')
            order by 
                case docTypeCode 
                    when 'passport' then 1
                    when 'incurredIdentityCard' then 2
                    when 'foreignCitPassport' then 3
                    else 4
                end
            )
        when EXISTS (
            select 1 
            from OPENJSON(JSON_QUERY(c.body, '$.policyHolder.partyData.partyBody.partyDocuments')) 
            with (
                docTypeCode nvarchar(50) '$.docType.docTypeCode'
            ) as docs
            where docs.docTypeCode in ('foreignTravelPassport', 'militaryID', 'driverID', 'birthCertificate')
        )
        then 
            (select top 1 
                case 
                    when docTypeCode = 'foreignTravelPassport' then '002'
                    when docTypeCode = 'militaryID' then '005'
                    when docTypeCode = 'driverID' then '006'
                    when docTypeCode = 'birthCertificate' then '007'
                end
            from OPENJSON(JSON_QUERY(c.body, '$.policyHolder.partyData.partyBody.partyDocuments')) 
            with (
                docTypeCode nvarchar(50) '$.docType.docTypeCode'
            ) as docs
            where docs.docTypeCode in ('foreignTravelPassport', 'militaryID', 'driverID', 'birthCertificate')
            order by 
                case docTypeCode 
                    when 'foreignTravelPassport' then 1
                    when 'militaryID' then 2
                    when 'driverID' then 3
                    when 'birthCertificate' then 4
                    else 5
                end
            )
        else 'NO_MAPPING'
     end as ROW1_16,
     JSON_VALUE(dbo.impl_get_document(JSON_QUERY(c.body, '$.policyHolder.partyData.partyBody.partyDocuments')), '$.docSeries') as ROW1_17,       
     case JSON_VALUE(c.body, '$.policyHolder.partyData.partyBody.partyPersonData.executivePerson.executivePersonCode')
          when '6' then '00'
          when '1' then '01'
          when '2' then '02'
          when '3' then '03'
          when '4' then '04'
          else 'NO_MAPPING'
     end as ROW1_18,
     case JSON_VALUE(c.body, '$.policyHolder.partyData.partyBody.partyPersonData.executivePerson.executivePersonCode')
          when '4' then JSON_VALUE(c.body, '$.policyHolder.partyData.partyBody.partyPersonData.relationType')
          else '-'
     end as ROW1_19,
     '01' as ROW1_20,
     '-' as ROW1_21,
     '01' as ROW1_22,
     'X' as ROW1_23,
     'X' as ROW1_24,
     '001' as ROW1_25,
     isnull(JSON_VALUE(dbo.impl_get_address(JSON_QUERY(c.body, '$.policyHolder.partyData.partyBody.partyAddresses'), 'R'), '$.street'), 'не требуется') as ROW1_26,
     isnull(JSON_VALUE(dbo.impl_get_address(JSON_QUERY(c.body, '$.policyHolder.partyData.partyBody.partyAddresses'), 'R'), '$.house'), '-') as ROW1_27,
     isnull(JSON_VALUE(dbo.impl_get_address(JSON_QUERY(c.body, '$.policyHolder.partyData.partyBody.partyAddresses'), 'R'), '$.houseExtension'), '') as ROW1_28,
     isnull(JSON_VALUE(dbo.impl_get_address(JSON_QUERY(c.body, '$.policyHolder.partyData.partyBody.partyAddresses'), 'R'), '$.flat'), '') as ROW1_29,
     '' as ROW1_30,
     isnull(JSON_VALUE(dbo.impl_get_address(JSON_QUERY(c.body, '$.policyHolder.partyData.partyBody.partyAddresses'), 'R'), '$.postalCode'), '000000') as ROW1_31,
     isnull(nullif(JSON_VALUE(dbo.impl_get_address(JSON_QUERY(c.body, '$.policyHolder.partyData.partyBody.partyAddresses'), 'R'), '$.city'), ''), '-') as ROW1_32,
     case 
          when JSON_VALUE(c.body, '$.mainInsuranceConditions.insuranceProduct.productGroup') = 'credit' then 'RU'
          --WHEN JSON_VALUE (BODY,'$.technicalInformation.apiSender') = 'API_EFR' then 'RU'
          else ISNULL(JSON_VALUE(dbo.impl_get_address(JSON_QUERY(c.body, '$.policyHolder.partyData.partyBody.partyAddresses'), 'R'), '$.fullAddress.data.country_iso_code'),'RU')
     end as ROW1_33,
     '002' as ROW1_34,
     isnull(JSON_VALUE(dbo.impl_get_address(JSON_QUERY(c.body, '$.policyHolder.partyData.partyBody.partyAddresses'), 'F'), '$.street'), 'не требуется') as ROW1_35,
     isnull(JSON_VALUE(dbo.impl_get_address(JSON_QUERY(c.body, '$.policyHolder.partyData.partyBody.partyAddresses'), 'F'), '$.house'), '-') as ROW1_36,
     isnull(JSON_VALUE(dbo.impl_get_address(JSON_QUERY(c.body, '$.policyHolder.partyData.partyBody.partyAddresses'), 'F'), '$.houseExtension'), '') as ROW1_37,
     isnull(JSON_VALUE(dbo.impl_get_address(JSON_QUERY(c.body, '$.policyHolder.partyData.partyBody.partyAddresses'), 'F'), '$.flat'), '') as ROW1_38,
     '' as ROW1_39,
     isnull(JSON_VALUE(dbo.impl_get_address(JSON_QUERY(c.body, '$.policyHolder.partyData.partyBody.partyAddresses'), 'F'), '$.postalCode'), '000000') as ROW1_40,
     isnull(nullif(JSON_VALUE(dbo.impl_get_address(JSON_QUERY(c.body, '$.policyHolder.partyData.partyBody.partyAddresses'), 'F'), '$.city'), ''), '-') as ROW1_41,
     case JSON_VALUE(c.body, '$.mainInsuranceConditions.insuranceProduct.productGroup')
          when 'credit' then 'RU'
          else isnull(JSON_VALUE(dbo.impl_get_address(JSON_QUERY(c.body, '$.policyHolder.partyData.partyBody.partyAddresses'), 'F'), '$.fullAddress.data.country_iso_code'), 'RU')
     end as ROW1_42,
     '007' as ROW1_43,
     isnull(JSON_VALUE(dbo.impl_get_phone(JSON_QUERY(c.body, '$.policyHolder.partyData.partyBody.partyPhones')), '$.countryCode.alfa2'), 'RU') as ROW1_44,
     JSON_VALUE(dbo.impl_get_phone(JSON_QUERY(c.body, '$.policyHolder.partyData.partyBody.partyPhones')), '$.fullNumber') as ROW1_45,
     '' as ROW1_46,
     JSON_VALUE(dbo.impl_get_email(JSON_QUERY(c.body, '$.policyHolder.partyData.partyBody.partyEmails')), '$.email') as ROW1_47,
     JSON_VALUE(c.body, '$.policyHolder.partyData.partyBody.partyGeneralData.INNKIO') as ROW1_48,
     replace(replace(JSON_VALUE(c.body, '$.policyHolder.partyData.partyBody.partyPersonData.SNILS'), ' ', ''), '-', '') as ROW1_49,
     JSON_VALUE(c.body, '$.policyHolder.partyData.partyId') as ROW1_50,
     JSON_VALUE(c.body, '$.policyHolder.partyData.partyCode') as ROW1_51,
------------------------------------------------------------------------------------------------------------------------------------------------------
----------------------------------------------------------------------ROW2----------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------------------------------
     'X' as ROW2_1,
     '1' as ROW2_2,
     JSON_VALUE(c.body, '$.insuredPerson.partyData.partyBody.partyPersonData.firstName') as ROW2_3,
     isnull(JSON_VALUE(c.body, '$.insuredPerson.partyData.partyBody.partyPersonData.middleName'), '-') as ROW2_4,
     JSON_VALUE(c.body, '$.insuredPerson.partyData.partyBody.partyPersonData.lastName') as ROW2_5,
     isnull(JSON_VALUE(c.body, '$.insuredPerson.partyData.partyBody.partyPersonData.citizenship[0].alfa2'), 'RU') as ROW2_6,
     isnull(JSON_VALUE(c.body, '$.insuredPerson.partyData.partyBody.partyPersonData.citizenship[0].alfa2'), 'RU') as ROW2_7,
     case JSON_VALUE(c.body, '$.insuredPerson.partyData.partyBody.partyPersonData.personGender')
          when 'Female' then '2'
          else '1'
     end as ROW2_8,
     convert(varchar, CAST(JSON_VALUE(c.body, '$.insuredPerson.partyData.partyBody.partyPersonData.dateOfBirth') as date), 104) as ROW2_9,
     isnull(JSON_VALUE(c.body, '$.insuredPerson.partyData.partyBody.partyPersonData.birthPlace'), 'не требуется') as ROW2_10,
     case JSON_VALUE(c.body, '$.insuredPerson.partyData.partyBody.partyPersonData.personGender')
          when 'Female' then '002'
          else '001'
     end as ROW2_11,
     case isnull(JSON_VALUE(c.body, '$.insuredPerson.partyData.partyBody.partyFatca.confirmationDate'), 'isnull')
          when 'isnull' then '2'
          else '1'
     end as ROW2_12,
     isnull(convert(varchar, CAST(JSON_VALUE(dbo.impl_get_document(JSON_QUERY(c.body, '$.insuredPerson.partyData.partyBody.partyDocuments')), '$.issueDate') as date), 104), 
         case JSON_VALUE(dbo.impl_get_document(JSON_QUERY(c.body, '$.insuredPerson.partyData.partyBody.partyDocuments')), '$.docType.docTypeCode')
            when 'birthCertificate' then convert(varchar, CAST(JSON_VALUE(c.body, '$.insuredPerson.partyData.partyBody.partyPersonData.dateOfBirth') as date), 104)
            else convert(varchar, CAST('2099-01-01' as date), 104)
         end)
     as ROW2_13,
     isnull(JSON_VALUE(dbo.impl_get_document(JSON_QUERY(c.body, '$.insuredPerson.partyData.partyBody.partyDocuments')), '$.issuerName'), 'не требуется') as ROW2_14,
     isnull(JSON_VALUE(dbo.impl_get_document(JSON_QUERY(c.body, '$.insuredPerson.partyData.partyBody.partyDocuments')), '$.issuerCode'), '000-000') as ROW2_15,
     JSON_VALUE(dbo.impl_get_document(JSON_QUERY(c.body, '$.insuredPerson.partyData.partyBody.partyDocuments')), '$.docNumber') as ROW2_16,
     case 
        when EXISTS (
            select 1 
            from OPENJSON(JSON_QUERY(c.body, '$.insuredPerson.partyData.partyBody.partyDocuments')) 
            with (
                docTypeCode nvarchar(50) '$.docType.docTypeCode'
            ) as docs
            where docs.docTypeCode in ('passport', 'incurredIdentityCard', 'foreignCitPassport')
        )
        then 
            (select top 1 
                case 
                    when docTypeCode = 'passport' then '001'
                    when docTypeCode = 'incurredIdentityCard' then '009'
                    when docTypeCode = 'foreignCitPassport' then '003'
                end
            from OPENJSON(JSON_QUERY(c.body, '$.insuredPerson.partyData.partyBody.partyDocuments')) 
            with (
                docTypeCode nvarchar(50) '$.docType.docTypeCode'
            ) as docs
            where docs.docTypeCode in ('passport', 'incurredIdentityCard', 'foreignCitPassport')
            order by 
                case docTypeCode 
                    when 'passport' then 1
                    when 'incurredIdentityCard' then 2
                    when 'foreignCitPassport' then 3
                    else 4
                end
            )
        when EXISTS (
            select 1 
            from OPENJSON(JSON_QUERY(c.body, '$.insuredPerson.partyData.partyBody.partyDocuments')) 
            with (
                docTypeCode nvarchar(50) '$.docType.docTypeCode'
            ) as docs
            where docs.docTypeCode in ('foreignTravelPassport', 'militaryID', 'driverID', 'birthCertificate')
        )
        then 
            (select top 1 
                case 
                    when docTypeCode = 'foreignTravelPassport' then '002'
                    when docTypeCode = 'militaryID' then '005'
                    when docTypeCode = 'driverID' then '006'
                    when docTypeCode = 'birthCertificate' then '007'
                end
            from OPENJSON(JSON_QUERY(c.body, '$.insuredPerson.partyData.partyBody.partyDocuments')) 
            with (
                docTypeCode nvarchar(50) '$.docType.docTypeCode'
            ) as docs
            where docs.docTypeCode in ('foreignTravelPassport', 'militaryID', 'driverID', 'birthCertificate')
            order by 
                case docTypeCode 
                    when 'foreignTravelPassport' then 1
                    when 'militaryID' then 2
                    when 'driverID' then 3
                    when 'birthCertificate' then 4
                    else 5
                end
            )
          else 'NO_MAPPING'
     end as ROW2_17,
     JSON_VALUE(dbo.impl_get_document(JSON_QUERY(c.body, '$.insuredPerson.partyData.partyBody.partyDocuments')), '$.docSeries') as ROW2_18,       
     case JSON_VALUE(c.body, '$.insuredPerson.partyData.partyBody.partyPersonData.executivePerson.executivePersonCode')
          when '6' then '00'
          when '1' then '01'
          when '2' then '02'
          when '3' then '03'
          when '4' then '04'
          else 'NO_MAPPING'
     end as ROW2_19,
          case JSON_VALUE(c.body, '$.insuredPerson.partyData.partyBody.partyPersonData.executivePerson.executivePersonCode') when '4'
          then JSON_VALUE(c.body, '$.insuredPerson.partyData.partyBody.partyPersonData.relationType')
          else '-'
     end as ROW2_20,
     '01' as ROW2_21,
     '-' as ROW2_22,
     '01' as ROW2_23,
     'X' as ROW2_24,
     'X' as ROW2_25,
     '001' as ROW2_26,
     isnull(JSON_VALUE(dbo.impl_get_address(JSON_QUERY(c.body, '$.insuredPerson.partyData.partyBody.partyAddresses'), 'R'), '$.street'), 'не требуется') as ROW2_27,
     isnull(JSON_VALUE(dbo.impl_get_address(JSON_QUERY(c.body, '$.insuredPerson.partyData.partyBody.partyAddresses'), 'R'), '$.house'), '-') as ROW2_28,
     isnull(JSON_VALUE(dbo.impl_get_address(JSON_QUERY(c.body, '$.insuredPerson.partyData.partyBody.partyAddresses'), 'R'), '$.houseExtension'), '') as ROW2_29,
     isnull(JSON_VALUE(dbo.impl_get_address(JSON_QUERY(c.body, '$.insuredPerson.partyData.partyBody.partyAddresses'), 'R'), '$.flat'), '') as ROW2_30,
     '' as ROW2_31,
     isnull(JSON_VALUE(dbo.impl_get_address(JSON_QUERY(c.body, '$.insuredPerson.partyData.partyBody.partyAddresses'), 'R'), '$.postalCode'), '000000') as ROW2_32,
     isnull(nullif(JSON_VALUE(dbo.impl_get_address(JSON_QUERY(c.body, '$.insuredPerson.partyData.partyBody.partyAddresses'), 'R'), '$.city'), ''), '-') as ROW2_33,
     case 
          when JSON_VALUE(c.body, '$.mainInsuranceConditions.insuranceProduct.productGroup') = 'credit' then 'RU'
          --WHEN JSON_VALUE (BODY,'$.technicalInformation.apiSender') = 'API_EFR' then 'RU'
          else ISNULL(JSON_VALUE(dbo.impl_get_address(JSON_QUERY(c.body, '$.insuredPerson.partyData.partyBody.partyAddresses'), 'R'), '$.fullAddress.data.country_iso_code'),'RU')
     end as ROW2_34,
     '002' as ROW2_35,
     isnull(JSON_VALUE(dbo.impl_get_address(JSON_QUERY(c.body, '$.insuredPerson.partyData.partyBody.partyAddresses'), 'F'), '$.street'), 'не требуется') as ROW2_36,
     isnull(JSON_VALUE(dbo.impl_get_address(JSON_QUERY(c.body, '$.insuredPerson.partyData.partyBody.partyAddresses'), 'F'), '$.house'), '-') as ROW2_37,
     isnull(JSON_VALUE(dbo.impl_get_address(JSON_QUERY(c.body, '$.insuredPerson.partyData.partyBody.partyAddresses'), 'F'), '$.houseExtension'), '') as ROW2_38,
     isnull(JSON_VALUE(dbo.impl_get_address(JSON_QUERY(c.body, '$.insuredPerson.partyData.partyBody.partyAddresses'), 'F'), '$.flat'), '') as ROW2_39,
     '' as ROW2_40,
     isnull(JSON_VALUE(dbo.impl_get_address(JSON_QUERY(c.body, '$.insuredPerson.partyData.partyBody.partyAddresses'), 'F'), '$.postalCode'), '000000') as ROW2_41,
     isnull(nullif(JSON_VALUE(dbo.impl_get_address(JSON_QUERY(c.body, '$.insuredPerson.partyData.partyBody.partyAddresses'), 'F'), '$.city'), ''), '-') as ROW2_42,
     case JSON_VALUE(c.body, '$.mainInsuranceConditions.insuranceProduct.productGroup')
          when 'credit' then 'RU'
          else isnull(JSON_VALUE(dbo.impl_get_address(JSON_QUERY(c.body, '$.insuredPerson.partyData.partyBody.partyAddresses'), 'F'), '$.fullAddress.data.country_iso_code'), 'RU')
     end as ROW2_43,   
     '007' as ROW2_44,
     isnull(JSON_VALUE(dbo.impl_get_phone(JSON_QUERY(c.body, '$.insuredPerson.partyData.partyBody.partyPhones')), '$.countryCode.alfa2'), 'RU') as ROW2_45,
     isnull(JSON_VALUE(dbo.impl_get_phone(JSON_QUERY(c.body, '$.insuredPerson.partyData.partyBody.partyPhones')), '$.fullNumber'), 'не требуется') as ROW2_46,
     '' as ROW2_47,
     isnull(JSON_VALUE(dbo.impl_get_email(JSON_QUERY(c.body, '$.insuredPerson.partyData.partyBody.partyEmails')), '$.email'), '') as ROW2_48,
     JSON_VALUE(c.body, '$.insuredPerson.partyData.partyBody.partyGeneralData.INNKIO') as ROW2_49,
     replace(replace(JSON_VALUE(c.body, '$.insuredPerson.partyData.partyBody.partyPersonData.SNILS'), ' ', ''), '-', '') as ROW2_50,   
     JSON_VALUE(c.body, '$.insuredPerson.partyData.partyId') as ROW2_51,
     JSON_VALUE(c.body, '$.insuredPerson.partyData.partyCode') as ROW2_52,
------------------------------------------------------------------------------------------------------------------------------------------------------
----------------------------------------------------------------------ROW4----------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------------------------------
     c.contract_number as ROW4_1,
     case ISNULL(JSON_VALUE(c.body, '$.basicConditions.currency.currencyCode'),'')
          when '' then 'RUB'
          else JSON_VALUE(c.body, '$.basicConditions.currency.currencyCode')     --валюта договора
     end as ROW4_2,
	 case JSON_VALUE(c.body, '$.policyTerms.startDate') 
	 WHEN '2024-02-29' THEN '28.02.2024'  --leap-year
	 ELSE convert(varchar, CAST(JSON_VALUE(c.body, '$.policyTerms.startDate') as date), 104) 
	 END as ROW4_3,
     case JSON_VALUE(c.body, '$.policyTerms.startDate')
	 WHEN '2024-02-29' THEN   --leap-year
						CASE SUBSTRING( convert(varchar,DATEADD(d,1, CAST(JSON_VALUE(c.body, '$.policyTerms.endDate') as date)), 104),1,5)
						WHEN '29.02' THEN convert(varchar,DATEADD(d,-1, CAST(JSON_VALUE(c.body, '$.policyTerms.endDate') as date)), 104)
						ELSE convert(varchar, CAST(JSON_VALUE(c.body, '$.policyTerms.endDate') as date), 104) END
	 ELSE convert(varchar, CAST(JSON_VALUE(c.body, '$.policyTerms.endDate') as date), 104)
	 END as ROW4_4,     
      case JSON_VALUE(c.body, '$.basicConditions.paymentFrequency.paymentFrequencyCode')
          when '1' then '99'
          when '2' then '12'
          when '3' then '6'
          when '5' then '1'
          when '4' then '3'
     end as ROW4_5,
     case JSON_VALUE(c.body, '$.policyTerms.startDate')
	 WHEN '2024-02-29' --leap-year
	 THEN convert(varchar, DATEADD(d,-1, CAST(JSON_VALUE(c.body, '$.basicConditions.issueDate') as date)), 104)
	 ELSE convert(varchar, CAST(JSON_VALUE(c.body, '$.basicConditions.issueDate') as date), 104) 
	 END as ROW4_6,
     '' as ROW4_7,
     '' as ROW4_8,
     '00' as ROW4_9,
     --JSON_VALUE(c.body, '$.basicConditions.insuranceTerms') as ROW4_10,
     case JSON_VALUE(c.body, '$.basicConditions.paymentFrequency.paymentFrequencyCode')
          when '1'
          then '01'
          else JSON_VALUE(c.body, '$.basicConditions.insuranceTerms')
     end as ROW4_10,
     convert(varchar, CAST(JSON_VALUE(c.body, '$.basicConditions.issueDate') as date), 104) as ROW4_11,
     '000000' as ROW4_12,
     convert(varchar, CAST(JSON_VALUE(c.body, '$.basicConditions.issueDate') as date), 104) as ROW4_13,
     /*
     case JSON_VALUE(c.body, '$.mainInsuranceConditions.insuranceProduct.productGroup')
          when 'credit'
          then '100930'
          else '94831'
     end as ROW4_14,
     */
     case JSON_VALUE(c.body, '$.mainInsuranceConditions.partner.partnerBusinessCode')
          when '15' then '94831'
          when '249411' then case JSON_VALUE(c.body, '$.mainInsuranceConditions.insuranceProduct.productGroup')
                                   when 'credit' then '100930'
                                   else '22521'
                              end
          when '999999' then '999999'
          when '431120' then '89309'
          when '112479' then '99319'
          when '191127' then '47060'
          when '107093' then '107093'
          when '191130' then '99316'
          when '113302' then '113302'
          when '110256' then '110256'
          when '247457' then (select JSON_VALUE(sp.body, '$.tabNumber')
                                   from org.service_provider sp
                                   where sp.service_provider_code = JSON_VALUE(c.body, '$.initiator.employeeCode'))
          when '866288' then '113748'
          when '249411' then '22521'
          when '191127' then '47060'
          when '247457' then '22703'
          when '23472' then '23472'
          when '76421' then '76421'
          when '677' then '6453'
          when '117903' then '117903'
          when '115870' then '115870'
          when '118594' then '118594'
          when '118880' then '118880'
          when '192559' then '19633'
          when '124402' then '124402'
          else 'N/A'
     end as ROW4_14,
     (select JSON_VALUE(dbo.impl_get_address(JSON_QUERY(u.body, '$.partyAddresses'), 'R'), '$.city')
          from org.organisation_unit u
          where u.organisation_unit_code = JSON_VALUE(c.body, '$.initiator.organisationUnitCode')) as ROW4_15,
     (select JSON_VALUE(dbo.impl_get_address(JSON_QUERY(u.body, '$.partyAddresses'), 'R'), '$.region')
          from org.organisation_unit u
          where u.organisation_unit_code = JSON_VALUE(c.body, '$.initiator.organisationUnitCode')) as ROW4_16,
     --'' as ROW4_17, --A! begin
     CASE ISNULL(JSON_VALUE(c.body, '$.creditProgram.creditProgramId'), '')
          WHEN 'п00732022' THEN '244'
          WHEN 'п00742022' THEN '559'
          WHEN 'п00752022' THEN '560'
          WHEN 'п00762022' THEN '561'
          WHEN 'п00772022' THEN '260'
          WHEN 'п00782022' THEN '562'
          WHEN 'п00792022' THEN '265'
          WHEN 'п00802022' THEN '563'
          WHEN 'п00812022' THEN '564'
          WHEN 'п00822022' THEN '565'
          WHEN 'п00832022' THEN '272'

          WHEN 'п00012023' THEN '569'
          WHEN 'п00022023' THEN '570'
          WHEN 'п00032023' THEN '571'
          WHEN 'п00042023' THEN '572'
          WHEN 'п00052023' THEN '573'
          WHEN 'п00062023' THEN '574'
          WHEN 'п00072023' THEN '575'
          WHEN 'п00082023' THEN '576'
          WHEN 'п00092023' THEN '577'
          WHEN 'п00102023' THEN '578'
          WHEN 'п00112023' THEN '579'

          WHEN 'п00712022' THEN '230'
          WHEN 'п00722022' THEN '558'
          WHEN 'п01272022' THEN '230'
          WHEN 'п01282022' THEN '558'
          WHEN 'п01292022' THEN '244'
          WHEN 'п01302022' THEN '559'
          WHEN 'п01312022' THEN '560'
          WHEN 'п01322022' THEN '561'
          WHEN 'п01332022' THEN '260'
          WHEN 'п01342022' THEN '562'
          WHEN 'п01352022' THEN '265'
          WHEN 'п01362022' THEN '563'
          WHEN 'п01372022' THEN '564'
          WHEN 'п01382022' THEN '565'
          WHEN 'п01392022' THEN '272'
          WHEN 'п01402022' THEN '230'
          WHEN 'п01412022' THEN '558'
          WHEN 'п01422022' THEN '244'
          WHEN 'п01432022' THEN '559'
          WHEN 'п01442022' THEN '560'
          WHEN 'п01452022' THEN '561'
          WHEN 'п01462022' THEN '260'
          WHEN 'п01472022' THEN '562'
          WHEN 'п01482022' THEN '265'
          WHEN 'п01492022' THEN '563'
          WHEN 'п01502022' THEN '564'
          WHEN 'п01512022' THEN '565'
          WHEN 'п01522022' THEN '272'        
          ELSE CASE 
                    WHEN JSON_VALUE(c.body, '$.mainInsuranceConditions.insuranceProduct.productCode') 
                         IN ('IBAP3VTB','IDG1EKSPO', 'IDGN2RETVTB', 'IDGN3RETVTB', 'IDGN5RETVTB', 'IDGVN2PPVTB', 'IDGVN3PPVTB', 'IDGVN4PPVTB', 'IDGVN5PPVTB', 'IDGP2PPVTB', 'IDGVN2VTB', 'IDGVN3VTB', 'IDGVN4VTB', 'IDGVN5VTB', 'IDGVN1VTB', 'IDGP2VTB', 'IDGP3PPVTB', 'IDGP3VTB', 'IDGP4PPVTB', 'IDGP4VTB', 'IDGP5PPVTB', 'IDGP5VTB', 'IDGV2PPVTB', 'IDGV2VTB', 'IDGV3PPVTB', 'IDGV3VTB', 'IDGV4PPVTB', 'IDGV4VTB', 'IDGV5PPVTB', 'IDGV5VTB', 'IBAV3VTB', 'IBAV5VTB', 'IDGPN2PPVTB', 'IDGPN2VTB', 'IDGPN3PPVTB', 'IDGPN3VTB', 'IDGPN5PPVTB', 'IDGPN5VTB', 'IDGPN4VTB', 'IDGPN4PPVTB', 'IDGPN1VTB', 'IDGP1VTB', 'IDGV1VTB', 'EBMGVTB','PREEQUITYVTB')
                    THEN CASE ISNULL(JSON_VALUE(c.body, '$.commission.policyCommissionItems[0].manualRate'), '')
                              WHEN '0.005' THEN '312'
                              WHEN '0.01' THEN '201'
                              WHEN '0.0125' THEN '585'
                              WHEN '0.015' THEN '301'
                              WHEN '0.0175' THEN '461'
                              WHEN '0.02' THEN '202'
                              WHEN '0.0225' THEN '590'
                              WHEN '0.025' THEN '302'
                              WHEN '0.0275' THEN '457'
                              WHEN '0.03' THEN '203'
                              WHEN '0.0325' THEN '580'
                              WHEN '0.035' THEN '303'
                              WHEN '0.0375' THEN '594'
                              WHEN '0.04' THEN '204'
                              WHEN '0.0425' THEN '473'
                              WHEN '0.045' THEN '304'
                              WHEN '0.0475' THEN '589'
                              WHEN '0.05' THEN '205'              
                              WHEN '0.0525' THEN '595'              
                              WHEN '0.055' THEN '305'              
                              WHEN '0.0575' THEN '596'              
                              WHEN '0.06' THEN '206'
                              WHEN '0.0625' THEN '597'
                              WHEN '0.065' THEN '306'
                              WHEN '0.0675' THEN '598'
                              WHEN '0.07' THEN '207'
                              WHEN '0.08' THEN '208'
                              WHEN '0.085' THEN '308'
                              WHEN '0.095' THEN '309'
                              WHEN '0.1' THEN '210'
                              WHEN '0.12' THEN '212'
                              WHEN '0.15' THEN '215'
                              WHEN '0.2' THEN '220'
                              WHEN '0.1047' THEN '612'
                              WHEN '0.1247' THEN '613'
                              WHEN '0.022' THEN '222'
                              WHEN '0.2096' THEN '619'
                              WHEN '0.1150' THEN '311'
                              ELSE ''
                         END
                    ELSE ''
               END
     END as ROW4_17,
     case JSON_VALUE(c.body, '$.basicInvestmentParameters.participationCoeff')
     when null
     then ''
     else case 
               when JSON_VALUE(c.body, '$.mainInsuranceConditions.insuranceProduct.productCode') 
                    in ('IDC3', 'IDC5', 'IDCP3', 'IDCP5', 'IBA3', 'IBA5', 'IBA3BFKO', 'IBA5BFKO', 'IBAP3', 'IBAP5', 'EBMIBFKO', 'IBA3SMP', 'IBA5SMP', 'IBA3REINVEST', 'IBA5REINVEST', 'IBAP3VTB', 'IBAP5VTB', 'IBAV3VTB', 'IBAV5VTB', 'IBA2P3', 'IBA2P3VTB', 'IBA2P5VTB', 'IBA2V3VTB', 'IBA2V5VTB')
               then replace(cast(convert(decimal(18,4), JSON_VALUE(c.body, '$.basicInvestmentParameters.participationCoeff')) * 100 as nvarchar(max)), '.', ',')
               else ''
          end
     end as ROW4_18,
     case JSON_VALUE(c.body, '$.basicInvestmentParameters.participationCoeff')
     when null
     then ''
     else case 
               when JSON_VALUE(c.body, '$.mainInsuranceConditions.insuranceProduct.productCode') 
                    in ('IBAV3VTB', 'IBAV5VTB')
               then ''
               when JSON_VALUE(c.body, '$.mainInsuranceConditions.insuranceProduct.productCode') 
                    in ('IDC', 'IDCP')
               then replace(cast(convert(decimal(18,4), JSON_VALUE(c.body, '$.basicInvestmentParameters.participationCoeff')) * 100 as nvarchar(max)), '.', ',')
               when (JSON_VALUE(c.body, '$.basicInvestmentParameters.fixRate') is not null 
                    and JSON_VALUE(c.body, '$.basicInvestmentParameters.emitent') is not null)
               then replace(cast(convert(decimal(18,4), JSON_VALUE(c.body, '$.basicInvestmentParameters.fixRate')) as nvarchar(max)), '.', ',')
               else ''
          end
     end as ROW4_19,
     case
          when JSON_VALUE(c.body, '$.mainInsuranceConditions.insuranceProduct.productCode') not in ('IBAKSV3VTB', 'IBAKSP3VTB', 'IBAKVP5VTB', 'IBAKVV5VTB', 'IBAKVV5PEVTB', 'IBAKVP5PEVTB') 
          then convert(varchar, CAST(JSON_VALUE(c.body, '$.basicInvestmentParameters.purchaseDate') as date), 104)
          else ''
	 end
     as ROW4_20,
     '' as ROW4_21,
     case JSON_VALUE(c.body, '$.mainInsuranceConditions.insuranceProduct.productCode')
          when 'ERC' then '00580'
          when 'ERCP' then '00581'
          when 'EHVP' then '00582'
          when 'IDC3' then '00584'
          when 'IDC5' then '00585'
          when 'IDC' then '00583'
          when 'IDCP3' then '00587'
          when 'IDCP5' then '00588'
          when 'IDCP' then '00586'        
          when 'CCP' 
          then case JSON_VALUE(c.body, '$.issueForm.code.issueFormCode')
                    when 'paper' then '00632'
                    when 'offer' then '00633'
               end
          when 'CMS' 
          then case JSON_VALUE(c.body, '$.issueForm.code.issueFormCode')
                    when 'paper' then '00634'
                    when 'offer' then '00635'
               end
          when 'CDMS' 
          then case JSON_VALUE(c.body, '$.issueForm.code.issueFormCode')
                    when 'paper' then '00636'
                    when 'offer' then '00637'
               end
          when 'CCP2' 
          then case JSON_VALUE(c.body, '$.issueForm.code.issueFormCode')
                    when 'paper' then '00674'
                    when 'offer' then '00675'
               end
          when 'CMP' 
          then case JSON_VALUE(c.body, '$.issueForm.code.issueFormCode')
                    when 'paper' then '00676'
                    when 'offer' then '00677'
               end
          when 'IBG3' then '00666'
          when 'IBGP3' then '00666'
          when 'IBG5' then '00667'
          when 'IBGP5' then '00667'
          when 'IBG7' then '00695'
          when 'IBGP7' then '00695'
          when 'IBG10' then '00657'
          when 'IBGP10' then '00657'
          when 'IBI3' 
          then case JSON_VALUE(c.body, '$.basicInvestmentParameters.investmentStrategy.investmentStrategyCode')
                    when 'gazprom' then '00652'
                    when 'fosagro' then '00648'
               end
          when 'IBI5' 
          then case JSON_VALUE(c.body, '$.basicInvestmentParameters.investmentStrategy.investmentStrategyCode')
                    when 'gazprom' then '00653'
                    when 'fosagro' then '00649'
               end
          when 'IBI10' 
          then case JSON_VALUE(c.body, '$.basicInvestmentParameters.investmentStrategy.investmentStrategyCode')
                    when 'gazprom' then '00654'
                    when 'fosagro' then '00655'
               end
          when 'IBIP3' 
          then case JSON_VALUE(c.body, '$.basicInvestmentParameters.investmentStrategy.investmentStrategyCode')
                    when 'gazprom' then '00658'
                    when 'fosagro' then '00692'
               end
          when 'IBIP5' 
          then case JSON_VALUE(c.body, '$.basicInvestmentParameters.investmentStrategy.investmentStrategyCode')
                    when 'gazprom' then '00659'
                    when 'fosagro' then '00693'
               end
          when 'IBIP10' 
          then case JSON_VALUE(c.body, '$.basicInvestmentParameters.investmentStrategy.investmentStrategyCode')
                    when 'gazprom' then '00660'
                    when 'fosagro' then '00694'
               end
          when 'ERC2' then '00577'
          when 'EHVP2' then '00576'
          when 'ERCP2' then '00578'
          when 'IBG3BFKO' then '00666'
          when 'IBG5BFKO' then '00667'
          when 'EFRBFKO' then '00641'
          when 'IBI3BFKO' 
          then case JSON_VALUE(c.body, '$.basicInvestmentParameters.investmentStrategy.investmentStrategyCode')
                    when 'fosagro' then '00648'
                    when 'gazprom' then '00652'
                    when 'lukoil' then '00684'
               end
          when 'IBI5BFKO' 
          then case JSON_VALUE(c.body, '$.basicInvestmentParameters.investmentStrategy.investmentStrategyCode')
                    when 'fosagro' then '00649'
                    when 'gazprom' then '00653'
                    when 'lukoil' then '00685'
               end
          when 'IBG1AKCEPT' then '00656'
          when 'IBI3AKCEPT' 
          then case JSON_VALUE(c.body, '$.basicInvestmentParameters.investmentStrategy.investmentStrategyCode')
                    when 'gazprom' then '00652'
                    when 'fosagro' then '00648'
               end
          when 'IBI5AKCEPT' 
          then case JSON_VALUE(c.body, '$.basicInvestmentParameters.investmentStrategy.investmentStrategyCode')
                    when 'gazprom' then '00653'
                    when 'fosagro' then '00649'
               end
          when 'EPGPAKBARS' then '00638'
          when 'EBMBFKO' then '00703'
          when 'EPCLZENIT' then '00662'
          when 'IDG1ZENIT' then '00619'
          when 'IBI2ZENIT' 
          then case JSON_VALUE(c.body, '$.basicInvestmentParameters.investmentStrategy.investmentStrategyCode')
                    when 'gazprom' then '00678'
                    when 'fosagro' then '00696'
               end
          when 'IBI3ZENIT' 
          then case JSON_VALUE(c.body, '$.basicInvestmentParameters.investmentStrategy.investmentStrategyCode')
                    when 'gazprom' then '00652'
                    when 'fosagro' then '00648'
                    when 'tatneft' then '00728'
               end
          when 'IBI5ZENIT' 
          then case JSON_VALUE(c.body, '$.basicInvestmentParameters.investmentStrategy.investmentStrategyCode')
                    when 'gazprom' then '00653'
                    when 'fosagro' then '00649'
                    when 'tatneft' then '00729'
               end
          when 'EBMZENIT' then '00703'
          when 'EPGPZENIT' then '00638'
          when 'IDG3' then '00664'
          when 'IDGP3' then '00664'
          when 'IDG5' then '00665'
          when 'IDGP5' then '00665'
          when 'IDG5ZENIT' then '00665'
          when 'IDG7' then '00706'
          when 'IDGP7' then '00706'
          when 'IDG10' then '00707'
          when 'IDGP10' then '00707'
          when 'IBA3' then '00709'
          when 'IBA5' then '00710'
          when 'IBAP3' then '00711'
          when 'IBAP5' then '00712'
          when 'IBA3BFKO' then '00709'
          when 'IBA5BFKO' then '00710'
          when 'CACB' 
          then case JSON_VALUE(c.body, '$.creditProgram.creditProgramId')
                    when N'РЖ08' then '00705'
                    when N'РЖ36' then '00741'
                    else '00704'
               end
          when 'EBMAKCEPT' then '00703'
          when 'IDGV2' then '00663'
          when 'IDGV3' then '00664'
          when 'IBI3OAS' 
          then case JSON_VALUE(c.body, '$.basicInvestmentParameters.investmentStrategy.investmentStrategyCode')
                    when 'fosagro' then '00648'
                    when 'lukoil' then '00684'
                    when 'gazprom' then '00652'
               end
          when 'IBI5OAS' 
          then case JSON_VALUE(c.body, '$.basicInvestmentParameters.investmentStrategy.investmentStrategyCode')
                    when 'fosagro' then '00649'
                    when 'lukoil' then '00685'
                    when 'gazprom' then '00653'
               end
          when 'IBG3OAS' then '00666'
          when 'IBG5OAS' then '00667'
          when 'EBMOAS' then '00703'
          when 'IDG2ZENIT' then '00663'
          when 'EBMAKBARS' then '00703'
          when 'CAPCLCHILDOAS' then '00681'
          when 'RHEBASEOAS' then '00697'
          when 'RHEOPTIMAOAS' then '00697'
          when 'RHELIGHTOAS' then '00701'
          when 'GENCHKHEALTH' then '00682'
          when 'GENCHKTALENTS' then '00683'
          when 'GENCHKSPORT' then '00683'
          when 'CCP3' 
          then case JSON_VALUE(c.body, '$.issueForm.code.issueFormCode')
                    when 'paper' then '00719'
                    when 'offer' then '00720'
               end
          when 'CMP3'
          then case JSON_VALUE(c.body, '$.issueForm.code.issueFormCode')
                    when 'paper' then '00717'
                    when 'offer' then '00718'
               end
          when 'CMP4'
          then case JSON_VALUE(c.body, '$.issueForm.code.issueFormCode')
                    when 'paper' then '00733'
                    when 'offer' then '00734'
               end   
          when 'CMP5'
          then case JSON_VALUE(c.body, '$.issueForm.code.issueFormCode')
                    when 'paper' then '00746'
                    when 'offer' then '00747'
               end  
          when 'CMS2'
          then case JSON_VALUE(c.body, '$.issueForm.code.issueFormCode')
                    when 'paper' then '00748'
                    when 'offer' then '00749'
               end 
          when 'CCP4'
          then case JSON_VALUE(c.body, '$.issueForm.code.issueFormCode')
                    when 'paper' then '00744'
                    when 'offer' then '00745'
               end 
          when 'EBMGBFKO'  then '00724'
          when 'EBMIBFKO'  then '00727'
          when 'EBMPFBFKO' then '00723'
          when 'EBMPYBFKO' then '00722'
          when 'CAPCLRELOAS' then '00680'
          when 'WCENOAS' then '00725'
          when 'CAPCLRELBOXOAS' then '00680'
          when 'CAPCLCHILDBOXOAS' then '00681'
          when 'EBMGMINBANK' then '00724'
          when 'EBMOAS2' then '00724'
          when 'EBMG' then '00724'
          when 'EBMGP' then '00724'
          when 'IDGV2PP' then '00735'
          when 'IDGV3PP' then '00721'
          when 'PROZOZHBFKO' then '00737'
          when 'PROHEALTHBFKO' then '00738'
          when 'PROGENTICSBFKO' then '00739'
          when 'IBG5BFKO2' then '00665'
          when 'IBA3SMP' then '00709'
          when 'IBA5SMP' then '00710'
          when 'EBMGSMP' then '00724'
          when 'ERC2SMP' then '00577'
          when 'NOTE3BFKO' then '00766'
          when 'IBA3REINVEST' then '00709'
          when 'IBA5REINVEST' then '00710'
          when 'EBMGREINVEST' then '00724'
          when 'IDG1REINVEST' then '00619'
          when 'IDG3REINVEST' then '00664'
          when 'IDG5REINVEST' then '00665'
          when 'NOTE1BFKO' then '00770'
          when 'EBMGZENIT' then '00724'
          when 'EBMOPTIMAOAS2' then '00767'
          when 'NOTE1BFKO3' then '00776'
          when 'NOTE1BFKO4' 
          then case 
                    when CAST(JSON_VALUE(c.body, '$.basicConditions.issueDate') AS date) < '2023-09-28' then '00783'
                    when CAST(JSON_VALUE(c.body, '$.basicConditions.issueDate') AS date) >= '2023-09-28' 
                         and CAST(JSON_VALUE(c.body, '$.basicConditions.issueDate') AS date) < '2023-11-27'  then '00786'
                    when CAST(JSON_VALUE(c.body, '$.basicConditions.issueDate') AS date) >= '2023-11-27' then '00806'
               end
          when 'IBI3BFKO17' then '00772'
          when 'IBI5BFKO17' then '00773'
          when 'IBG3BFKO2' then '00664'
          when 'NOTEV3BFKO' then '00788'
          when 'EBMGVTB' then '00792'
          when 'IDGV2PPVTB'
          then case JSON_VALUE(c.body, '$.basicConditions.currency.currencyCode')
                    when 'RUB' then '00735'
                    when 'USD' then '00781'
                    when 'EUR' then '00759'
               end
          when 'IDGV3PPVTB'
          then case JSON_VALUE(c.body, '$.basicConditions.currency.currencyCode')
                    when 'RUB' then '00721'
                    when 'USD' then '00760'
               end
          when 'IDGV5PPVTB'
          then case JSON_VALUE(c.body, '$.basicConditions.currency.currencyCode')
                    when 'RUB' then '00713'
                    when 'USD' then '00790'
               end
          when 'IDGV2VTB'
          then case JSON_VALUE(c.body, '$.basicConditions.currency.currencyCode')
                    when 'RUB' then '00663'
                    when 'USD' then '00780'
                    when 'EUR' then '00758'
               end
          when 'IDGV3VTB'
          then case JSON_VALUE(c.body, '$.basicConditions.currency.currencyCode')
                    when 'RUB' then '00664'
                    when 'USD' then '00726'
               end
          when 'IDGV5VTB'
          then case JSON_VALUE(c.body, '$.basicConditions.currency.currencyCode')
                    when 'RUB' then '00665'
                    when 'USD' then '00736'
               end
          when 'IDGP2VTB'
          then case JSON_VALUE(c.body, '$.basicConditions.currency.currencyCode')
                    when 'RUB' then '00794'
                    when 'USD' then '00797'
               end
          when 'IDGP3VTB'
          then case JSON_VALUE(c.body, '$.basicConditions.currency.currencyCode')
                    when 'RUB' then '00795'
                    when 'USD' then '00798'
               end
          when 'IDGP5VTB'
          then case JSON_VALUE(c.body, '$.basicConditions.currency.currencyCode')
                    when 'RUB' then '00796'
                    when 'USD' then '00799'
               end
          when 'IDGP2PPVTB'
          then case JSON_VALUE(c.body, '$.basicConditions.currency.currencyCode')
                    when 'RUB' then '00800'
                    when 'USD' then '00803'
               end
          when 'IDGP3PPVTB'
          then case JSON_VALUE(c.body, '$.basicConditions.currency.currencyCode')
                    when 'RUB' then '00801'
                    when 'USD' then '00804'
               end
          when 'IDGP5PPVTB'
          then case JSON_VALUE(c.body, '$.basicConditions.currency.currencyCode')
                    when 'RUB' then '00802'
                    when 'USD' then '00805'
               end
          when 'CMC'
          then case JSON_VALUE(c.body, '$.issueForm.code.issueFormCode')
                    when 'offer' then '00778'
                    when 'paper' then '00777'
               end
          when 'IBI3ZENIT17' then '00772'
          when 'IBI5ZENIT17' then '00773'
          when 'EBMGVVTB' then '00791'
          when 'IDGV4VTB'
          then case JSON_VALUE(c.body, '$.basicConditions.currency.currencyCode')
                    when 'USD' then '00808'
                    when 'EUR' then '00810'
                    when 'RUB' then '00873'
               end
          when 'IDGV4PPVTB'
          then case JSON_VALUE(c.body, '$.basicConditions.currency.currencyCode')
                    when 'USD' then '00809'
                    when 'EUR' then '00811'
                    when 'RUB' then '00878'
               end
          when 'NOTEV1BFKO' then '00814'
          when 'EBMGBESTVTB' then '00792'
          when 'TERMVVTB' then '00807'
          when 'IDGP4VTB' 
          then case JSON_VALUE(c.body, '$.basicConditions.currency.currencyCode')
                    when 'USD' then '00812'
                    when 'RUB' then '00879'
               end
          when 'IDGP4PPVTB' 
          then case JSON_VALUE(c.body, '$.basicConditions.currency.currencyCode')
                    when 'USD' then '00813'
                    when 'RUB' then '00880'
               end
          when 'IBAP3VTB' then '00821'
          when 'IBAP5VTB' then '00822'
          when 'IBAV3VTB' then '00823'
          when 'IBAV5VTB' then '00824'
          when 'ECATFPVTB' then '00818'
          when 'ECATFVVTB' then '00819'
          when 'ECOFPVTB' then '00825'
          when 'ECOFVVTB' then '00826'
          when 'IBA2P3' then '00821'
          when 'EBMGLIFEINVEST' then '00724'
          when 'EBMGRETVTB' then '00792'
          when 'EBMMGREINVEST' then '00816'
          when 'IDG1LIFEINVEST' then '00619'
          when 'IDG3LIFEINVEST' then '00664'
          when 'IDG5LIFEINVEST' then '00665'
          when 'IBAKVP5VTB' then '00830'
          when 'IBAKVV5VTB' then '00829'
          when 'IDGP1VTB' then '00619'
          when 'IDGV1VTB' then '00838'
          when 'IDGP2PB' then '00794'
          when 'IDGP3PB' then '00795'
          when 'IDGP5PB' then '00796'
          when 'EBMGPB' then '00792'
          when 'IDGV3OAS' then '00795'
          when 'IDGV5OAS' then '00796'
          when 'IDGV3PPOAS' then '00801'
          when 'IDGV5PPOAS' then '00802'
          when 'IDGN3' then '00664'
          when 'IDGN5' then '00665'
          when 'EBMGN' then '00724'
          when 'IBA2P3VTB' then '00840'
          when 'IBA2P5VTB' then '00841'
          when 'IBA2V3VTB' then '00842'
          when 'IBA2V5VTB' then '00843'
          when 'EBMGNRETVTB' then '00845'
          when 'EBMGNVTB' then '00845'
          when 'IDGPN2VTB'
          then case JSON_VALUE(c.body, '$.basicConditions.currency.currencyCode')
                    when 'RUB' then '00794'
                    when 'USD' then '00797'
               end
          when 'IDGPN3VTB'
          then case JSON_VALUE(c.body, '$.basicConditions.currency.currencyCode')
                    when 'RUB' then '00795'
                    when 'USD' then '00798'
               end
          when 'IDGPN5VTB'
          then case JSON_VALUE(c.body, '$.basicConditions.currency.currencyCode')
                    when 'RUB' then '00796'
                    when 'USD' then '00799'
               end
          when 'IDGPN2PPVTB'
          then case JSON_VALUE(c.body, '$.basicConditions.currency.currencyCode')
                    when 'RUB' then '00800'
                    when 'USD' then '00803'
               end
          when 'IDGPN3PPVTB'
          then case JSON_VALUE(c.body, '$.basicConditions.currency.currencyCode')
                    when 'RUB' then '00801'
                    when 'USD' then '00804'
               end
          when 'IDGPN5PPVTB'
          then case JSON_VALUE(c.body, '$.basicConditions.currency.currencyCode')
                    when 'RUB' then '00802'
                    when 'USD' then '00805'
               end
          when 'IDGPN4VTB'
          then case JSON_VALUE(c.body, '$.basicConditions.currency.currencyCode')
                    when 'USD' then '00812'
                    when 'RUB' then '00879'
               end
          when 'IDGPN4PPVTB'
          then case JSON_VALUE(c.body, '$.basicConditions.currency.currencyCode')
                    when 'USD' then '00813'
                    when 'RUB' then '00880'
               end
          when 'EBMGNT' then '00724'
          when 'IDG3NT' then '00664'
          when 'IDG5NT' then '00665'
          when 'ECATFZENIT' then '00818'
          when 'IDG3UBRR' then '00664'
          when 'IDG5UBRR' then '00665'
          when 'IDG2UBRR' then '00794'
          when 'IDGPN1VTB' then '00619'
          when 'IBAKVV5PEVTB' then '00848'
          when 'IBAKVP5PEVTB' then '00849'
          when 'ECATFUBRR' then '00818'
          when 'EBMGUBRR' then '00724'
          when 'PREEQUITYVTB' then '00850'
          when 'ACCIDPC' then '00858'
          when 'IDG3ZENIT' then '00664'
          when 'ECOF2ZENIT' then '00868'
          when 'EBM3GUBRR' then '00869'
          when 'IDG2RETVTB' then '00794'
          when 'IDG3RETVTB' then '00795'
          when 'IDG5RETVTB' then '00796'
          when 'WCEN3OAS' then '00870'
          when 'IDGVN2PPVTB' then '00735'
          when 'IDGVN3PPVTB' then '00721'
          when 'IDGVN4PPVTB' then '00878'
          when 'IDGVN5PPVTB' then '00713'
          when 'IDGVN2VTB' then '00663'
          when 'IDGVN3VTB' then '00664'
          when 'IDGVN4VTB' then '00873'
          when 'IDGVN5VTB' then '00665'
          when 'IDGVN1VTB' then '00838'
          when 'IDGN2RETVTB' then '00794'
          when 'IDGN3RETVTB' then '00795'
          when 'IDGN5RETVTB' then '00796'
          when 'IDG1EKSPO' then '00619'
     end as ROW4_22,
     case JSON_VALUE(c.body, '$.mainInsuranceConditions.insuranceProduct.productCode')
          when 'IBG3' then '2022'
          when 'IBG5' then '2022'
          when 'IBG7' then '2022'
          when 'IBG10' then '2022'
          when 'IBGP3' then '2022'
          when 'IBGP5' then '2022'
          when 'IBGP7' then '2022'
          when 'IBGP10' then '2022'
          when 'IBI3' then '2022'
          when 'IBI5' then '2022'
          when 'IBI10' then '2022'
          when 'IBIP3' then '2022'
          when 'IBIP5' then '2022'
          when 'IBIP10' then '2022'
          when 'ERC2' then '2022'
          when 'EHVP2' then '2022'
          when 'ERCP2' then '2022'
          when 'CCP2' then '2022'
          when 'CMP' then '2022'
          when 'IBG3BFKO' then '2022'
          when 'IBG5BFKO' then '2022'
          when 'EFRBFKO' then '2022'
          when 'IBI3BFKO' then '2022'
          when 'IBI5BFKO' then '2022'
          when 'IBG1AKCEPT' then '2022'
          when 'IBI3AKCEPT' then '2022'
          when 'IBI5AKCEPT' then '2022'
          when 'EPGPAKBARS' then '2022'
          when 'EBMBFKO' then '2022'
          when 'EPCLZENIT' then '2022'
          when 'IBI2ZENIT' then '2022'
          when 'IBI3ZENIT' then '2022'
          when 'IDG5ZENIT' then '2022'
          when 'IBI5ZENIT' then '2022'
          when 'EBMZENIT' then '2022'
          when 'EPGPZENIT' then '2022'
          when 'IDG3' then '2022'
          when 'IDGP3' then '2022'
          when 'IDG5' then '2022'
          when 'IDGP5' then '2022'
          when 'IDG7' then '2022'
          when 'IDGP7' then '2022'
          when 'IDG10' then '2022'
          when 'IDGP10' then '2022'
          when 'IBA3' then '2022'
          when 'IBA5' then '2022'
          when 'IBAP3' then '2022'
          when 'IBAP5' then '2022'
          when 'IBA3BFKO' then '2022'
          when 'IBA5BFKO' then '2022'
          when 'CACB' then '2022'
          when 'EBMAKCEPT'then '2022'
          when 'IDGV2' then '2022'
          when 'IDGV3' then '2022'
          when 'IBI3OAS' then '2022'
          when 'IBI5OAS' then '2022'
          when 'IBG3OAS' then '2022'
          when 'IBG5OAS' then '2022'
          when 'EBMOAS' then '2022'
          when 'IDG2ZENIT' then '2022'
          when 'EBMAKBARS'  then '2022'
          when 'CCP3' then '2022'
          when 'CMP3' then '2022'
          when 'EBMGBFKO' then '2022'
          when 'EBMIBFKO' then '2022'
          when 'EBMPFBFKO' then '2022'
          when 'EBMPYBFKO' then '2022'  
          when 'CAPCLCHILDOAS' then '2022'
          when 'RHEBASEOAS' then '2022'
          when 'RHEOPTIMAOAS' then '2022'
          when 'RHELIGHTOAS' then '2022'  
          when 'GENCHKHEALTH' then '2022'  
          when 'GENCHKTALENTS' then '2022'  
          when 'GENCHKSPORT' then '2022'  
          when 'WCENOAS' then '2022'
          when 'CAPCLRELOAS' then '2022'
          when 'CAPCLRELBOXOAS' then '2022'
          when 'CAPCLCHILDBOXOAS' then '2022'
          when 'EBMGMINBANK' then '2022'
          when 'EBMOAS2' then '2022'
          when 'EBMG' then '2022'
          when 'EBMGP'  then '2022'
          when 'CMP4' then '2022'
          when 'CMP5' then '2022'
          when 'IDGV2PP' then '2022'
          when 'IDGV3PP' then '2022'
          when 'PROZOZHBFKO' then '2023'
          when 'PROHEALTHBFKO' then '2023'
          when 'PROGENTICSBFKO' then '2023'
          when 'IBG5BFKO2' then '2022'
          when 'CMS2' then '2021'
          when 'CCP4' then '2022'
          when 'IBA3SMP' then '2022'
          when 'IBA5SMP' then '2022'
          when 'EBMGSMP' then '2022'
          when 'ERC2SMP' then '2022'
          when 'NOTE3BFKO' then '2023'
          when 'IBA3REINVEST' then '2022'
          when 'IBA5REINVEST' then '2022'
          when 'EBMGREINVEST' then '2022'
          when 'IDG1REINVEST' then '2021'
          when 'IDG3REINVEST' then '2022'
          when 'IDG5REINVEST' then '2022'
          when 'NOTE1BFKO' then '2023'
          when 'EBMGZENIT' then '2022'
          when 'EBMOPTIMAOAS2' then '2023'
          when 'NOTE1BFKO3' then '2023'
          when 'NOTE1BFKO4' then '2023'
          when 'IBI3BFKO17' then '2023'
          when 'IBI5BFKO17' then '2023'
          when 'IBG3BFKO2' then '2022'
          when 'NOTEV3BFKO' then '2023'
          when 'EBMGVTB' then '2023'
          when 'IDGV2PPVTB'
          then case JSON_VALUE(c.body, '$.basicConditions.currency.currencyCode')
                    when 'RUB' then '2022'
                    else '2023'
               end
          when 'IDGV3PPVTB'
          then case JSON_VALUE(c.body, '$.basicConditions.currency.currencyCode')
                    when 'RUB' then '2022'
                    else '2023'
               end
          when 'IDGV5PPVTB'
          then case JSON_VALUE(c.body, '$.basicConditions.currency.currencyCode')
                    when 'RUB' then '2022'
                    else '2023'
               end
          when 'IDGV2VTB'
          then case JSON_VALUE(c.body, '$.basicConditions.currency.currencyCode')
                    when 'RUB' then '2022'
                    else '2023'
               end
          when 'IDGV3VTB' then '2022'
          when 'IDGV5VTB' then '2022'
          when 'IDGP2VTB' then '2023'
          when 'IDGP3VTB' then '2023'
          when 'IDGP5VTB' then '2023'
          when 'IDGP2PPVTB' then '2023'
          when 'IDGP3PPVTB' then '2023'
          when 'IDGP5PPVTB' then '2023'
          when 'CMC' then '2023'
          when 'IBI3ZENIT17' then '2023'
          when 'IBI5ZENIT17' then '2023'
          when 'EBMGVVTB' then '2023'
          when 'IDGV4VTB' 
          then case JSON_VALUE(c.body, '$.basicConditions.currency.currencyCode')
                    when 'RUB' then '2025'
                    else '2023'
               end
          when 'IDGV4PPVTB' 
          then case JSON_VALUE(c.body, '$.basicConditions.currency.currencyCode')
                    when 'RUB' then '2025'
                    else '2023'
               end
          when 'IDGP4VTB' 
          then case JSON_VALUE(c.body, '$.basicConditions.currency.currencyCode')
                    when 'RUB' then '2025'
                    else '2023'
               end
          when 'IDGP4PPVTB' 
          then case JSON_VALUE(c.body, '$.basicConditions.currency.currencyCode')
                    when 'RUB' then '2025'
                    else '2023'
               end
          when 'NOTEV1BFKO' then '2023'
          when 'EBMGBESTVTB' then '2023'
          when 'TERMVVTB' then '2023'
          when 'IBAP3VTB' then '2024'
          when 'IBAP5VTB' then '2024'
          when 'IBAV3VTB' then '2024'
          when 'IBAV5VTB' then '2024'
          when 'ECATFPVTB' then '2024'
          when 'ECATFVVTB' then '2024'
          when 'ECOFPVTB' then '2024'
          when 'ECOFVVTB' then '2024'
          when 'IBA2P3' then '2024'
          when 'EBMGLIFEINVEST'then '2022'
          when 'EBMGRETVTB' then '2023'
          when 'EBMMGREINVEST' then '2024'
          when 'IDG1LIFEINVEST' then '2021'
          when 'IDG3LIFEINVEST' then '2022'
          when 'IDG5LIFEINVEST' then '2022'
          when 'IBAKVP5VTB' then '2024'
          when 'IBAKVV5VTB' then '2024'
          when 'IDGP1VTB' then '2021'
          when 'IDGV1VTB' then '2024'
          when 'IDGP2PB' then '2023'
          when 'IDGP3PB' then '2023'
          when 'IDGP5PB' then '2023'
          when 'EBMGPB' then '2023'
          when 'IDGV3OAS' then '2023'
          when 'IDGV5OAS' then '2023'
          when 'IDGV3PPOAS' then '2023'
          when 'IDGV5PPOAS' then '2023'
          when 'IDGN3' then '2022'
          when 'IDGN5' then '2022'
          when 'EBMGN' then '2022'
          when 'IBA2P3VTB' then '2024'
          when 'IBA2P5VTB' then '2024'
          when 'IBA2V3VTB' then '2024'
          when 'IBA2V5VTB' then '2024'
          when 'EBMGNRETVTB' then '2024'
          when 'EBMGNVTB' then '2024'
          when 'IDGPN2VTB' then '2023'
          when 'IDGPN3VTB' then '2023'
          when 'IDGPN5VTB' then '2023'
          when 'IDGPN2PPVTB' then '2023'
          when 'IDGPN3PPVTB' then '2023'
          when 'IDGPN5PPVTB' then '2023'
          when 'IDGPN4VTB'
          then case JSON_VALUE(c.body, '$.basicConditions.currency.currencyCode')
                    when 'RUB' then '2025'
                    else '2023'
               end
          when 'IDGPN4PPVTB' 
          then case JSON_VALUE(c.body, '$.basicConditions.currency.currencyCode')
                    when 'RUB' then '2025'
                    else '2023'
               end
          when 'EBMGNT' then '2022'
          when 'IDG3NT' then '2022'
          when 'IDG5NT' then '2022'
          when 'ECATFZENIT' then '2024'
          when 'IDG3UBRR' then '2022'
          when 'IDG5UBRR' then '2022'
          when 'IDG2UBRR' then '2023'
          when 'IDGPN1VTB' then '2021'
          when 'IBAKVV5PEVTB' then '2024'
          when 'IBAKVP5PEVTB' then '2024'
          when 'ECATFUBRR' then '2024'
          when 'EBMGUBRR' then '2022'
          when 'PREEQUITYVTB' then '2024'
          when 'ACCIDPC' then '2024'
          when 'IDG3ZENIT' then '2022'
          when 'ECOF2ZENIT' then '2025'
          when 'EBM3GUBRR' then '2025'
          when 'IDG2RETVTB' then '2023'
          when 'IDG3RETVTB' then '2023'
          when 'IDG5RETVTB' then '2023'
          when 'WCEN3OAS' then '2025'
          when 'IDGVN2PPVTB' then '2022'
          when 'IDGVN3PPVTB' then '2022'
          when 'IDGVN4PPVTB' then '2025'
          when 'IDGVN5PPVTB' then '2022'
          when 'IDGVN2VTB' then '2022'
          when 'IDGVN3VTB' then '2022'
          when 'IDGVN4VTB' then '2025'
          when 'IDGVN5VTB' then '2022'
          when 'IDGVN1VTB' then '2024'
          when 'IDGN2RETVTB' then '2023'
          when 'IDGN3RETVTB' then '2023'
          when 'IDGN5RETVTB' then '2023'
          when 'IDG1EKSPO' then '2021'
          else '2021'
     end as ROW4_23,
     case JSON_VALUE(c.body, '$.creditProgram.creditProgramId')
          when N'п00012021' then '00001'
          when N'п00022021' then '00002'
          when N'п00032021' then '00003'
          when N'п00042021' then '00004'
          when N'п00052021' then '00005'
          when N'п00062021' then '00006'
          when N'п00072021' then '00001'
          when N'п00082021' then '00002'
          when N'п00082021' then '00003'
          when N'п00102021' then '00004'
          when N'п00112021' then '00005'
          when N'п00122021' then '00006'
          when N'п00132021' then '00001'
          when N'п00142021' then '00002'
          when N'п00152021' then '00003'
          when N'п00162021' then '00004'
          when N'п00172021' then '00005'
          when N'п00182021' then '00006'
          when N'п00192021' then '00007'
          when N'п00202021' then '00008'
          when N'п00212021' then '00009'
          when N'п00222021' then '00001'
          when N'п00232021' then '00002'
          when N'п00242021' then '00003'
          when N'п00252021' then '00004'
          when N'п00262021' then '00005'
          when N'п00272021' then '00006'
          when N'п00282021' then '00007'
          when N'п00292021' then '00008'
          when N'п00302021' then '00009'
          when N'п00312021' then '00001'
          when N'п00322021' then '00002'
          when N'п00012022' then '00001'
          when N'п00022022' then '00002'
          when N'п00032022' then '00003'
          when N'п00042022' then '00001'
          when N'п00052022' then '00002'
          when N'п00062022' then '00003'
          when N'п00072022' then '00004'
          when N'п00082022' then '00005'
          when N'п00092022' then '00006'
          when N'п00102022' then '00007'
          when N'п00112022' then '00008'
          when N'п00122022' then '00009'
          when N'п00132022' then '00010'
          when N'п00142022' then '00011'
          when N'п00152022' then '00012'
          when N'п00162022' then '00013'
          when N'п00172022' then '00014'
          when N'п00182022' then '00015'
          when N'п00192022' then '00016'
          when N'п00202022' then '00017'
          when N'п00212022' then '00018'
          when N'п00222022' then '00019'
          when N'п00232022' then '00020'
          when N'п00242022' then '00021'
          when N'п00252022' then '00022'
          when N'п00262022' then '00023'
          when N'п00272022' then '00024'
          when N'РЖ08' then '00001'
          when N'РЖ12' then '00001'
          when N'РЖ15' then '00002'
          when N'РЖ20' then '00003'
          when N'РЖ24' then '00004'
          when N'РЖ27' then '00005'
          when N'РЖ30' then '00006'
          when N'РЖ33' then '00007'
          when N'РЖ35' then '00008'
          when N'РЖ36' then '00001'
		WHEN 'п00282022' THEN '00001'
		WHEN 'п00292022' THEN '00002'
		WHEN 'п00302022' THEN '00003'
		WHEN 'п00312022' THEN '00004'
		WHEN 'п00322022' THEN '00005'
		WHEN 'п00332022' THEN '00006'
		WHEN 'п00342022' THEN '00007'
		WHEN 'п00352022' THEN '00008'
		WHEN 'п00362022' THEN '00009'
		WHEN 'п00372022' THEN '00010'
		WHEN 'п00382022' THEN '00011'
		WHEN 'п00392022' THEN '00012'
		WHEN 'п00402022' THEN '00013'
		WHEN 'п00412022' THEN '00014'
		WHEN 'п00422022' THEN '00015'
		WHEN 'п00432022' THEN '00016'
		WHEN 'п00442022' THEN '00017'
		WHEN 'п00452022' THEN '00018'
		WHEN 'п00462022' THEN '00019'
		WHEN 'п00472022' THEN '00020'
		WHEN 'п00482022' THEN '00021'
		WHEN 'п00492022' THEN '00022'
		WHEN 'п00502022' THEN '00023'
		WHEN 'п00512022' THEN '00024'
		WHEN 'п00522022' THEN '00025'
		WHEN 'п00532022' THEN '00026'
		WHEN 'п00542022' THEN '00027'
		WHEN 'п00552022' THEN '00028'
		WHEN 'п00562022' THEN '00029'
		WHEN 'п00572022' THEN '00030'
		WHEN 'п00582022' THEN '00031'
		WHEN 'п00592022' THEN '00032'
		WHEN 'п00602022' THEN '00033'
		WHEN 'п00612022' THEN '00034'
		WHEN 'п00622022' THEN '00035'
		WHEN 'п00632022' THEN '00036'
		WHEN 'п00642022' THEN '00037'
		WHEN 'п00652022' THEN '00038'
		WHEN 'п00662022' THEN '00039'
		WHEN 'п00672022' THEN '00040'
		WHEN 'п00682022' THEN '00041'
		WHEN 'п00692022' THEN '00042'
		WHEN 'п00702022' THEN '00043'

          WHEN 'п00842022' THEN '00001'
          WHEN 'п00852022' THEN '00002'
          WHEN 'п00862022' THEN '00003'
          WHEN 'п00872022' THEN '00004'
          WHEN 'п00882022' THEN '00005'
          WHEN 'п00892022' THEN '00006'
          WHEN 'п00902022' THEN '00007'
          WHEN 'п00912022' THEN '00008'
          WHEN 'п00922022' THEN '00009'
          WHEN 'п00932022' THEN '00010'
          WHEN 'п00942022' THEN '00011'
          WHEN 'п00952022' THEN '00012'
          WHEN 'п00962022' THEN '00013'
          WHEN 'п00972022' THEN '00014'
          WHEN 'п00982022' THEN '00015'
          WHEN 'п00992022' THEN '00016'
          WHEN 'п01002022' THEN '00017'
          WHEN 'п01012022' THEN '00018'
          WHEN 'п01022022' THEN '00019'
          WHEN 'п01032022' THEN '00020'
          WHEN 'п01042022' THEN '00021'
          WHEN 'п01052022' THEN '00022'
          WHEN 'п01062022' THEN '00023'
          WHEN 'п01072022' THEN '00024'
          WHEN 'п01082022' THEN '00025'
          WHEN 'п01092022' THEN '00026'
          WHEN 'п01102022' THEN '00027'
          WHEN 'п01112022' THEN '00028'
          WHEN 'п01122022' THEN '00029'
          WHEN 'п01132022' THEN '00030'
          WHEN 'п01142022' THEN '00031'
          WHEN 'п01152022' THEN '00032'
          WHEN 'п01162022' THEN '00033'
          WHEN 'п01172022' THEN '00034'
          WHEN 'п01182022' THEN '00035'
          WHEN 'п01192022' THEN '00036'
          WHEN 'п01202022' THEN '00037'
          WHEN 'п01212022' THEN '00038'
          WHEN 'п01222022' THEN '00039'
          WHEN 'п01232022' THEN '00040'
          WHEN 'п01242022' THEN '00041'
          WHEN 'п01252022' THEN '00042'
          WHEN 'п01262022' THEN '00043'

          when 'п00712022' then '00001'
          when 'п00722022' then '00002'
          when 'п00732022' then '00003'
          when 'п00742022' then '00004'
          when 'п00752022' then '00005'
          when 'п00762022' then '00006'
          when 'п00772022' then '00007'
          when 'п00782022' then '00008'
          when 'п00792022' then '00009'
          when 'п00802022' then '00010'
          when 'п00812022' then '00011'
          when 'п00822022' then '00012'
          when 'п00832022' then '00013'
          when 'п00552023' then '00001'

          when N'п00012023' then '00003'
          when N'п00022023' then '00004'
          when N'п00032023' then '00005'
          when N'п00042023' then '00006'
          when N'п00052023' then '00007'
          when N'п00062023' then '00008'
          when N'п00072023' then '00009'
          when N'п00082023' then '00010'
          when N'п00092023' then '00011'
          when N'п00102023' then '00012'
          when N'п00112023' then '00013'
          
          when N'п00122023' then '00001'
          when N'п00132023' then '00002'
          when N'п00142023' then '00003'
          when N'п00152023' then '00004'
          when N'п00162023' then '00005'
          when N'п00172023' then '00006'
          when N'п00182023' then '00007'
          when N'п00192023' then '00008'
          when N'п00202023' then '00009'

          when N'п00122023' then '00001'
          when N'п00132023' then '00002'
          when N'п00142023' then '00003'
          when N'п00152023' then '00004'
          when N'п00162023' then '00005'
          when N'п00172023' then '00006'
          when N'п00182023' then '00007'
          when N'п00192023' then '00008'
          when N'п00202023' then '00009'
          when N'п00212023' then '00010'
          when N'п00222023' then '00011'
          when N'п00232023' then '00012'
          when N'п00242023' then '00013'
          when N'п00252023' then '00014'
          when N'п00262023' then '00015'
          when N'п00272023' then '00016'
          when N'п00282023' then '00017'
          when N'п00292023' then '00018'
          when N'п00302023' then '00019'
          when N'п00312023' then '00020'
          when N'п00322023' then '00021'
          when N'п00332023' then '00022'
          when N'п00342023' then '00023'
          when N'п00352023' then '00024'
          when N'п00362023' then '00025'
          when N'п00372023' then '00026'
          when N'п00382023' then '00027'
          when N'п00392023' then '00028'
          when N'п00402023' then '00029'
          when N'п00412023' then '00030'
          when N'п00422023' then '00031'
          when N'п00432023' then '00032'
          when N'п00442023' then '00033'
          when N'п00452023' then '00034'
          when N'п00462023' then '00035'
          when N'п00472023' then '00036'
          when N'п00482023' then '00037'
          when N'п00492023' then '00038'
          when N'п00502023' then '00039'
          when N'п00512023' then '00040'
          when N'п00522023' then '00041'
          when N'п00532023' then '00042'
          when N'п00542023' then '00043'

          when N'п01272022' then '00014'
          when N'п01282022' then '00015'
          when N'п01292022' then '00016'
          when N'п01302022' then '00017'
          when N'п01312022' then '00018'
          when N'п01322022' then '00019'
          when N'п01332022' then '00020'
          when N'п01342022' then '00021'
          when N'п01352022' then '00022'
          when N'п01362022' then '00023'
          when N'п01372022' then '00024'
          when N'п01382022' then '00025'
          when N'п01392022' then '00026'
          when N'п01402022' then '00027'
          when N'п01412022' then '00028'
          when N'п01422022' then '00029'
          when N'п01432022' then '00030'
          when N'п01442022' then '00031'
          when N'п01452022' then '00032'
          when N'п01462022' then '00033'
          when N'п01472022' then '00034'
          when N'п01482022' then '00035'
          when N'п01492022' then '00036'
          when N'п01502022' then '00037'
          when N'п01512022' then '00038'
          when N'п01522022' then '00039'
          else
          case JSON_VALUE(body, '$.basicConditions.isReinvest')
               when 'true' then 
                    case JSON_VALUE(c.body, '$.mainInsuranceConditions.insuranceProduct.productCode')
                         when 'IBA3REINVEST' then '00002'
                         when 'IBA5REINVEST' then '00002'
                         when 'EBMGREINVEST' then '00003'
                         when 'IDG1REINVEST' then '00003'
                         when 'IDG3REINVEST' then '00004'
                         when 'IDG5REINVEST' then '00004'
                         when 'NOTE1BFKO' then '00001'
                         when 'NOTE1BFKO3' then '00001'
                         when 'NOTE1BFKO4' then '00001'
                         when 'IBI3BFKO17' then '00001'
                         when 'IBI5BFKO17' then '00001'
                         when 'IBG3BFKO2' then '00001'
                         when 'NOTEV3BFKO' then '00001'
                         when 'IBI3ZENIT17' then '00001'
                         when 'IBI5ZENIT17' then '00001'
                         when 'EBMGLIFEINVEST' then '00003'
                         when 'EBMMGREINVEST' then '00001'
                         when 'IDG1LIFEINVEST' then '00003'
                         when 'IDG3LIFEINVEST' then '00004'
                         when 'IDG5LIFEINVEST' then '00004'
                         --when 'GENCHKSPORT' then '00002'
                         else '00002'
                    end
               else  
               case JSON_VALUE(c.body, '$.mainInsuranceConditions.insuranceProduct.productCode')
                    when 'RHEOPTIMAOAS' then '00002'
                    when 'EBMGZENIT' then '00001'
                    when 'EBMOPTIMAOAS2' then '00001'
                    when 'EBMGVTB' then '00001'
                    when 'IDGV2PPVTB'
                         then case JSON_VALUE(c.body, '$.basicConditions.currency.currencyCode')
                                   when 'RUB' then '00001'
                                   else '00002'
                         end
                    when 'IDGV3PPVTB'
                         then case JSON_VALUE(c.body, '$.basicConditions.currency.currencyCode')
                                   when 'RUB' then '00001'
                                   else '00002'
                         end
                    when 'IDGV2VTB'
                         then case JSON_VALUE(c.body, '$.basicConditions.currency.currencyCode')
                                   when 'RUB' then '00001'
                                   else '00002'
                         end
                    when 'IDGV5PPVTB' then '00001'
                    when 'IDGV3VTB' then '00001'
                    when 'IDGV5VTB' then '00001'
                    when 'IDGP2VTB' then '00001'
                    when 'IDGP3VTB' then '00001'
                    when 'IDGP5VTB' then '00001'
                    when 'IDGP2PPVTB' then '00001'
                    when 'IDGP3PPVTB' then '00001'
                    when 'IDGP5PPVTB' then '00001'
                    when 'CMC' then '00001'
                    when 'EBMGVVTB' then '00001'
                    when 'IDGP4VTB' then '00001'
                    when 'IDGP4PPVTB' then '00001'
                    when 'NOTEV1BFKO' then '00001'
                    when 'EBMGBESTVTB' then '00001'
                    when 'TERMVVTB' then '00001'
                    when 'IDGV4VTB' then '00001'
                    when 'IDGV4PPVTB' then '00001'
                    when 'IBAP3VTB' then '00001'
                    when 'IBAP5VTB' then '00001'
                    when 'IBAV3VTB' then '00001'
                    when 'IBAV5VTB' then '00001'
                    when 'ECATFPVTB' then '00001'
                    when 'ECATFVVTB' then '00001'
                    when 'ECOFPVTB' then '00001'
                    when 'ECOFVVTB' then '00001'
                    when 'IBA2P3' then '00001'
                    when 'EBMGRETVTB' then '00001'
                    when 'IBAKVP5VTB' then '00001'
                    when 'IBAKVV5VTB' then '00001'
                    when 'IDGP1VTB' then '00001'
                    when 'IDGV1VTB' then '00001'
                    when 'IDGP2PB' then '00002'
                    when 'IDGP3PB' then '00002'
                    when 'IDGP5PB' then '00002'
                    when 'EBMGPB' then '00001'
                    when 'IDGV3OAS' then '00001'
                    when 'IDGV5OAS' then '00001'
                    when 'IDGV3PPOAS' then '00001'
                    when 'IDGV5PPOAS' then '00001'
                    when 'IDGN3' then '00001'
                    when 'IDGN5' then '00001'
                    when 'EBMGN' then '00001'
                    when 'IBA2P3VTB' then '00001'
                    when 'IBA2P5VTB' then '00001'
                    when 'IBA2V3VTB' then '00001'
                    when 'IBA2V5VTB' then '00001'
                    when 'EBMGNRETVTB' then '00001'
                    when 'EBMGNVTB' then '00001'
                    when 'IDGPN2VTB' then '00001'
                    when 'IDGPN3VTB' then '00001'
                    when 'IDGPN5VTB' then '00001'
                    when 'IDGPN4VTB' then '00001'
                    when 'IDGPN2PPVTB' then '00001'
                    when 'IDGPN3PPVTB' then '00001'
                    when 'IDGPN5PPVTB' then '00001'
                    when 'IDGPN4PPVTB' then '00001'
                    when 'EBMGNT' then '00001'
                    when 'IDG3NT' then '00001'
                    when 'IDG5NT' then '00001'
                    when 'ECATFZENIT' then '00001'
                    when 'IDG3UBRR' then '00001'
                    when 'IDG5UBRR' then '00001'
                    when 'IDG2UBRR' then '00001'
                    when 'IDGPN1VTB' then '00001'
                    when 'IBAKVV5PEVTB' then '00001'
                    when 'IBAKVP5PEVTB' then '00001'
                    when 'ECATFUBRR' then '00001'
                    when 'EBMGUBRR' then '00001'
                    when 'PREEQUITYVTB' then '00001'
                    when 'ACCIDPC' then '00001'
                    when 'IDG3ZENIT' then '00001'
                    when 'ECOF2ZENIT' then '00001'
                    when 'EBM3GUBRR' then '00001'
                    when 'IDG2RETVTB' then '00002'
                    when 'IDG3RETVTB' then '00002'
                    when 'IDG5RETVTB' then '00002'
                    when 'WCEN3OAS' then '00001'
                    when 'IDGVN2PPVTB' then '00001'
                    when 'IDGVN3PPVTB' then '00001'
                    when 'IDGVN4PPVTB' then '00001'
                    when 'IDGVN5PPVTB' then '00001'
                    when 'IDGVN2VTB' then '00001'
                    when 'IDGVN3VTB' then '00001'
                    when 'IDGVN4VTB' then '00001'
                    when 'IDGVN5VTB' then '00001'
                    when 'IDGVN1VTB' then '00001'
                    when 'IDGN2RETVTB' then '00002'
                    when 'IDGN3RETVTB' then '00002'
                    when 'IDGN5RETVTB' then '00002'
                    when 'IDG1EKSPO' then '00001'
                    else '00001'
               end
          end
     end as ROW4_24,

       --convert(varchar, DATEADD(day, 1, convert(date, JSON_VALUE(c.body, '$.policyTerms.paymentPeriodEndDate'))), 104) as ROW4_26,
       '' as ROW4_25,
       '' as ROW4_26,
     ((select JSON_VALUE(u.body, '$.code')
          from org.organisation_unit u
          where u.organisation_unit_code = JSON_VALUE(c.body, '$.initiator.organisationUnitCode')) +
          '/' +
       /*
       (select JSON_VALUE(sp.body, '$.tabNumber')
          from org.service_provider sp
         where sp.service_provider_code = JSON_VALUE(c.body, '$.initiator.employeeCode'))) as ROW4_28,
       */
     JSON_VALUE(c.body, '$.initiator.userName')) as ROW4_27,
     CASE JSON_VALUE (BODY,'$.technicalInformation.apiSender')    
          WHEN 'API_EFR' THEN 'API_EFR'    
          ELSE CASE DB_NAME()
                    WHEN 'AdInsure_PRD' THEN 'ADAKTA'
                    WHEN 'AdInsure_PRD_COPY' THEN 'ADAKTA' 
                    ELSE 'TEST_ADAKTA'
               END
     END as ROW4_28,
     JSON_VALUE(c.body, '$.creditContract.creditContractId') as ROW4_29,
     JSON_VALUE(c.body, '$.creditSalesPlace.sellerEmail') as ROW4_30,
     JSON_VALUE(c.body, '$.creditProgram.externalContractId') as ROW4_31,
	 '' as ROW4_32,
     case 
          when JSON_VALUE(c.body, '$.mainInsuranceConditions.insuranceProduct.productCode') 
               in ('IBI5BFKO17', 'IBI3BFKO17', 'IBI3ZENIT17', 'IBI5ZENIT17', 'IBAV3VTB', 'IBAV5VTB', 'IBAP3VTB', 'IBAP5VTB', 'IBA2V3VTB', 'IBA2V5VTB', 'IBA2P3VTB', 'IBA2P5VTB')
          then case JSON_VALUE(c.body, '$.basicInvestmentParameters.investmentStrategy.investmentStrategyCode')
                    when 'vtb' then '0123'
                    when 'sberbank' then CASE DB_NAME()
                                             WHEN 'AdInsure' THEN '0097'
                                             ELSE '0106'
                                         END
                    when 'mosbirzha' then '0133'
                    when 'magnit' then '0124'
                    when 'novatek' then '0125'
                    when 'rosneft' then '0126'
                    when 'tatneft' then '0108'
                    when 'polusZoloto' then '0127'
                    when 'alrosa' then '0128'
                    when 'afkSystem' then '0129'
                    when 'severstal' then '0130'
                    when 'nlmk' then '0131'
                    when 'mmk' then '0132'
                    when 'nornikel' then CASE DB_NAME()
                                             WHEN 'AdInsure' THEN '0096'
                                             ELSE '0104'
                                         END
                    when 'fosagro' then '0107'
                    when 'lukoil' then '0105'
                    when 'gazprom' then '0103'
                    when 'technologiesOfRussia' then '0144'
                    when 'marketFavorites' then '0141'
                    else ''
               end
          else ''
     end as ROW4_33,
	 CASE ISNULL(JSON_VALUE(c.body, '$.basicInvestmentParameters.variant.variantCode'),'')
	 WHEN '' THEN ''
	 ELSE JSON_VALUE(c.body, '$.basicInvestmentParameters.variant.variantCode')
	 END AS ROW4_34
 	 ,productCode AS ROW4_35
  from daily_contracts c
),
------------------------------------------------------------------------------------------------------------------------------------------------------
----------------------------------------------------------------------ROW3----------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------------------------------
beneficiaries as (
select c.contract_number,
     JSON_VALUE(c.body, '$.mainInsuranceConditions.insuranceProduct.productGroup') as product_group,
     case 
          when JSON_VALUE(c.body, '$.mainInsuranceConditions.insuranceProduct.productCode') 
               in ('GENCHKHEALTH', 'GENCHKTALENTS', 'GENCHKSPORT', 'RHEBASEOAS', 'RHEOPTIMAOAS', 'RHELIGHTOAS') 
          then ''
          else '001'
     end as ROW3_1,
     case JSON_VALUE(c.body, '$.beneficiaries.isHeritors')
          when 'true'
          then '100'
          else case 
                    when JSON_VALUE(c.body, '$.mainInsuranceConditions.insuranceProduct.productCode') 
                         in ('GENCHKHEALTH', 'GENCHKTALENTS', 'GENCHKSPORT', 'RHEBASEOAS', 'RHEOPTIMAOAS', 'RHELIGHTOAS') 
                    then '100'
                    else cast(replace(convert(decimal(18,2), convert(decimal(18,4), b.share) * 100), '.', ',') as nvarchar)
               end
     end as ROW3_2,    
     case JSON_VALUE(c.body, '$.beneficiaries.isHeritors')
          when 'true' then '001'
          else '002'
     end as ROW3_3,
     '' as ROW3_4,
     case JSON_VALUE(c.body, '$.beneficiaries.isHeritors')
          when 'true' 
          then ''
          else case 
                    when JSON_VALUE(c.body, '$.mainInsuranceConditions.insuranceProduct.productCode') 
                         in ('GENCHKHEALTH', 'GENCHKTALENTS', 'GENCHKSPORT', 'RHEBASEOAS', 'RHEOPTIMAOAS', 'RHELIGHTOAS') 
                    then JSON_VALUE(c.body, '$.insuredPerson.partyData.partyFullName') 
                    else b.partyFullName
               end
     end as ROW3_5
from daily_contracts c
     left join (SELECT c.contract_number,
                    t.value,
                    JSON_VALUE(t.value, '$.partyFullName') as partyFullName,
                    JSON_VALUE(t.value, '$.share') as share
               FROM daily_contracts c
                    CROSS APPLY OPENJSON(JSON_QUERY(c.body, '$.beneficiaries.beneficiaries')) t
               ) b on c.contract_number = b.contract_number
),
------------------------------------------------------------------------------------------------------------------------------------------------------
----------------------------------------------------------------------ROW5----------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------------------------------
risks as (
select c.contract_number,
     JSON_VALUE(c.body, '$.mainInsuranceConditions.insuranceProduct.productGroup') as product_group,
	 sap.COVER as ROW5_1,
     replace(convert(decimal(18,2), b.riskInsuredSum), '.', ',') as ROW5_2,
     '' as ROW5_3,
     '' as ROW5_4,
     case JSON_VALUE(c.body, '$.basicConditions.paymentFrequency.paymentFrequencyCode')
          when '1' then replace(convert(decimal(18,2), b.riskPremium) * 1, '.', ',')
          when '2' then replace(convert(decimal(18,2), b.riskPremium) * 1, '.', ',')
          when '3' then replace(convert(decimal(18,2), b.riskPremium) * 2, '.', ',')
          when '4' then replace(convert(decimal(18,2), b.riskPremium) * 4, '.', ',')
          when '5' then replace(convert(decimal(18,2), b.riskPremium) * 12, '.', ',')
          else replace(convert(decimal(18,2), b.riskPremium), '.', ',')
     end as ROW5_5,
     '' as ROW5_6,
	 CASE JSON_VALUE(c.body, '$.policyTerms.startDate')
	 WHEN '2024-02-29' THEN --leap-year
						 CASE SUBSTRING(b.startdate,6,5) WHEN '02-29' THEN convert(varchar, DATEADD(d,-1, CAST(b.startdate as date)), 104)
						 ELSE convert(varchar, CAST(b.startdate as date), 104) END
	 ELSE convert(varchar, CAST(b.startdate as date), 104) 
	 END as ROW5_7,
	 CASE JSON_VALUE(c.body, '$.policyTerms.startDate')
	 WHEN '2024-02-29' THEN    --leap-year
						CASE SUBSTRING(convert(varchar,  DATEADD(day, 1, CAST(b.endDate as date)), 104),1,5) 
						WHEN '29.02' THEN convert(varchar,  CAST(b.endDate as date), 104)
						ELSE convert(varchar,  DATEADD(day, 1, CAST(b.endDate as date)), 104) 
						END
	 ELSE convert(varchar,  DATEADD(day, 1, CAST(b.endDate as date)), 104) 
	 END as ROW5_8
	 from daily_contracts c
     left join (SELECT c.contract_number,
                    t.value,
                    JSON_VALUE(t.value, '$.risk.riskCode') as riskCode,
                    JSON_VALUE(t.value, '$.riskInsuredSum') as riskInsuredSum,
                    JSON_VALUE(t.value, '$.riskPremium') as riskPremium,
                    JSON_VALUE(t.value, '$.startDate') as startDate,
                    JSON_VALUE(t.value, '$.endDate') as endDate
               FROM daily_contracts c
                    CROSS APPLY OPENJSON(JSON_QUERY(c.body, '$.risks')) t
               ) b on c.contract_number = b.contract_number
	 LEFT JOIN [BFX_IMPL].[RISK_PRODUCT_SAP_INTEGRATION] sap
	 ON sap.[PRODUCT_CODE] = c.productCode AND b.riskCode = sap.[RISK_CODE]
),
------------------------------------------------------------------------------------------------------------------------------------------------------
----------------------------------------------------------------------ROW6----------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------------------------------
surrender as (
select 
     c.contract_number,
     JSON_VALUE(c.body, '$.mainInsuranceConditions.insuranceProduct.productGroup') as product_group,
     b.rowNumber,
     convert(varchar, b.rowNumber) as ROW6_1,
	 CASE JSON_VALUE(c.body, '$.policyTerms.startDate')
	 WHEN '2024-02-29' THEN  --leap-year
							CASE SUBSTRING(b.periodStartDate,6,5) WHEN '02-29' THEN convert(varchar,DATEADD(d,-1, CAST(b.periodStartDate as date)), 104)
							ELSE convert(varchar, CAST(b.periodStartDate as date), 104) END
     ELSE convert(varchar, CAST(b.periodStartDate as date), 104) 
	 END as ROW6_2,
	 CASE JSON_VALUE(c.body, '$.policyTerms.startDate')
	 WHEN '2024-02-29' THEN  --leap-year
							CASE SUBSTRING(b.periodEndDate,6,5) WHEN '02-28' THEN convert(varchar, DATEADD(d,-1,CAST(b.periodEndDate as date)), 104)
							ELSE convert(varchar, CAST(b.periodEndDate as date), 104) END
     ELSE convert(varchar, CAST(b.periodEndDate as date), 104) 
	 END as ROW6_3,
     replace(convert(decimal(18,2), b.surrenderValue), '.', ',') as ROW6_4,
     replace(convert(decimal(18,2), isnull(deathGuaranteeSum, deathSum)), '.', ',') as ROW6_5,
     case
          when b.contractEndDate = b.periodEndDate
          then isnull(replace(convert(decimal(18,2), endowmentSum), '.', ','), '0')
          else '0'
     end as ROW6_6,
     replace(convert(decimal(18,2), wopGuaranteeSum), '.', ',') as ROW6_7
from daily_contracts c
     left join (SELECT c.contract_number,
                    t.value,
                    row_number() over(partition by c.contract_number order by JSON_VALUE(t.value, '$.periodStartDate')) as rowNumber,
                    JSON_VALUE(t.value, '$.periodStartDate') as periodStartDate,
                    JSON_VALUE(t.value, '$.periodEndDate') as periodEndDate,
                    JSON_VALUE(t.value, '$.surrenderValue') as surrenderValue,
                    JSON_VALUE(c.body, '$.policyTerms.endDate') as contractEndDate,
                    JSON_VALUE((select sp.value
                                   from OPENJSON(JSON_QUERY((select r.value
                                                                 from OPENJSON(JSON_QUERY(c.body, '$.risks')) r
                                                                 where JSON_VALUE(r.value, '$.risk.riskCode') = 'DPVV36102'),
                                                            '$.riskInsuredSumByPeriod')) sp
                                   where JSON_VALUE(sp.value, '$.periodStartDate') = JSON_VALUE(t.value, '$.periodStartDate')),
                                   '$.insuredSum') as deathGuaranteeSum,
                    JSON_VALUE((select r.value
                                   from OPENJSON(JSON_QUERY(c.body, '$.risks')) r
                                   where JSON_VALUE(r.value, '$.risk.riskCode') in ('DLPSS36102', 'DLP36904', 'DLPDP36904')),
                                   '$.riskInsuredSum') as deathSum,
                    JSON_VALUE((select r.value
                                   from OPENJSON(JSON_QUERY(c.body, '$.risks')) r
                                   where JSON_VALUE(r.value, '$.risk.riskCode') in ('E36102', 'E36904')),
                                   '$.riskInsuredSum') as endowmentSum,
                    round(JSON_VALUE((select sp.value
                                   from OPENJSON(JSON_QUERY((select r.value
                                                                 from OPENJSON(JSON_QUERY(c.body, '$.risks')) r
                                                                 where JSON_VALUE(r.value, '$.risk.riskCode') in('D36102', 'DA36102')),
                                                            '$.riskInsuredSumByPeriod')) sp
                                   where JSON_VALUE(sp.value, '$.periodStartDate') = JSON_VALUE(t.value, '$.periodStartDate')),
                                   '$.insuredSum'), 2) as wopGuaranteeSum
               FROM daily_contracts c
                    CROSS APPLY OPENJSON(JSON_QUERY(c.body, '$.surrenderValues')) t
               ) b on c.contract_number = b.contract_number
),
------------------------------------------------------------------------------------------------------------------------------------------------------
----------------------------------------------------------------------ROW10---------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------------------------------
additionalServices as (
select c.contract_number,
     JSON_VALUE(c.body, '$.mainInsuranceConditions.insuranceProduct.productGroup') AS product_group,
     CASE
          WHEN JSON_VALUE(c.body, '$.mainInsuranceConditions.insuranceProduct.productCode') IN ('ECOFPVTB', 'ECOFVVTB', 'EBMGVTB', 'EBMGNVTB') 
               AND JSON_VALUE(c.body, '$.giftServices.selectedGiftServices.giftServiceCodes[0]') IN ('MED85')
          THEN 'MED85'
          WHEN JSON_VALUE(c.body, '$.mainInsuranceConditions.insuranceProduct.productCode') IN ('EBMGVTB', 'EBMGNVTB') 
               AND JSON_VALUE(c.body, '$.giftServices.selectedGiftServices.giftServiceCodes[0]') IN ('FIN4')
          THEN 'FIN4'
          WHEN JSON_VALUE(c.body, '$.mainInsuranceConditions.insuranceProduct.productCode') IN ('EBMGVVTB') 
               AND JSON_VALUE(c.body, '$.giftServices.selectedGiftServices.giftServiceCodes[0]') IN ('MED96')
          THEN 'MED96'
          WHEN JSON_VALUE(c.body, '$.mainInsuranceConditions.insuranceProduct.productCode') IN ('EBMGVVTB') 
               AND JSON_VALUE(c.body, '$.giftServices.selectedGiftServices.giftServiceCodes[0]') IN ('MED97')
          THEN 'MED97'
          WHEN JSON_VALUE(c.body, '$.mainInsuranceConditions.insuranceProduct.productCode') IN ('EFRBFKO', 'EBMGBFKO','EBMIBFKO','IBA5BFKO', 'IBA3BFKO', 'IBI5BFKO', 'IBI3BFKO', 'ECOFPVTB', 'ECOFVVTB')
          THEN b.serviceCode
          ELSE ''
     END AS ROW10_1
from daily_contracts c 
     INNER JOIN(
          SELECT c.contract_number,
                 json_value(t.value, '$.serviceCode') AS serviceCode
          FROM daily_contracts c
               CROSS APPLY OPENJSON(JSON_QUERY(c.body, '$.additionalServices')) t
          WHERE json_value(t.value, '$.serviceTypeCode') in ('MED', 'FIN')
          ) b ON c.contract_number = b.contract_number   
),
------------------------------------------------------------------------------------------------------------------------------------------------------
----------------------------------------------------------------------ROW8----------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------------------------------
finQuestionnaire as (
select 
     c.contract_number,
     JSON_VALUE(c.body, '$.mainInsuranceConditions.insuranceProduct.productGroup') as product_group,
     b.itemNumber as rowNumber,
     '1' as ROW8_1,
     convert(varchar, CAST(b.lastUpdateDate as date), 104) as ROW8_2,
     b.itemNumber as ROW8_3,
     case b.itemConfirmation
          when 'true' then '1'
          when 'false' then '2'        
          else ''
     end as ROW8_4,
     '' as ROW8_5,
     b.maxAnswer,
     case b.confirmation
          when 'true' then '1'
          when 'false' then '2'        
          else ''
     end as lastAnswer
from daily_contracts c
     left join (SELECT 
                    c.contract_number,
                    t.value,
                    JSON_VALUE(c.body, '$.policyHolder.partyData.partyBody.finKnowledgeQuestionnaire.lastUpdateDate') as lastUpdateDate,
                    JSON_VALUE(t.value, '$.itemNumber') as itemNumber,
                    JSON_VALUE(t.value, '$.itemConfirmation') as itemConfirmation,
                    max(isnull(JSON_VALUE(t.value, '$.itemConfirmation'), 'z')) over(partition by c.contract_number) as maxAnswer,
                    JSON_VALUE(c.body, '$.policyHolder.partyData.partyBody.finKnowledgeQuestionnaire.confirmation') as confirmation
               FROM daily_contracts c
                         CROSS APPLY OPENJSON(JSON_QUERY(c.body, '$.policyHolder.partyData.partyBody.finKnowledgeQuestionnaire.questionnaire')) t
                  ) b on c.contract_number = b.contract_number  
WHERE JSON_VALUE(c.body, '$.policyTerms.startDate') < '2023-01-24'
),
finQuestionnaire2023 as (
select 
     c.contract_number,
     JSON_VALUE(c.body, '$.mainInsuranceConditions.insuranceProduct.productGroup') as product_group,
     b.itemNumber as rowNumber,
     '3' as ROW8_1,
     convert(varchar, CAST(b.lastUpdateDate as date), 104) as ROW8_2,
     b.itemNumber as ROW8_3,
     case b.itemConfirmation
          when 'true' then '1'
          when 'false' then '2'        
          else ''
     end as ROW8_4,
     '' as ROW8_5,
     b.maxAnswer,
     case b.confirmation
          when 'true' then '1'
          when 'false' then '2'        
          else ''
     end as lastAnswer
from daily_contracts c
     left join (SELECT 
                    c.contract_number,
                    t.value,
                    JSON_VALUE(c.body, '$.policyHolder.partyData.partyBody.finKnowledgeQuestionnaire2023.lastUpdateDate') as lastUpdateDate,
                    JSON_VALUE(t.value, '$.itemNumber') as itemNumber,
                    JSON_VALUE(t.value, '$.itemConfirmation') as itemConfirmation,
                    max(isnull(JSON_VALUE(t.value, '$.itemConfirmation'), 'z')) over(partition by c.contract_number) as maxAnswer,
                    JSON_VALUE(c.body, '$.policyHolder.partyData.partyBody.finKnowledgeQuestionnaire2023.confirmation') as confirmation
               FROM daily_contracts c
                    CROSS APPLY OPENJSON(JSON_QUERY(c.body, '$.policyHolder.partyData.partyBody.finKnowledgeQuestionnaire2023.questionnaire')) t
               ) b on c.contract_number = b.contract_number  
WHERE JSON_VALUE(c.body, '$.policyTerms.startDate') >= '2023-01-24' AND JSON_VALUE(c.body, '$.policyTerms.startDate') < '2024-11-01'
),
finQuestionnaire2024 as (
select 
     c.contract_number,
     JSON_VALUE(c.body, '$.mainInsuranceConditions.insuranceProduct.productGroup') as product_group,
     b.itemNumber as rowNumber,
     '4' as ROW8_1,
     convert(varchar, CAST(b.lastUpdateDate as date), 104) as ROW8_2,
     b.itemNumber as ROW8_3,
     case b.itemConfirmation
          when 'true' then '1'
          when 'false' then '2'        
          else ''
     end as ROW8_4,
     '' as ROW8_5,
     b.maxAnswer,
     case b.confirmation
          when 'true' then '1'
          when 'false' then '2'        
          else ''
     end as lastAnswer
from daily_contracts c
     left join (SELECT 
                    c.contract_number,
                    t.value,
                    JSON_VALUE(c.body, '$.policyHolder.partyData.partyBody.finKnowledgeQuestionnaire2024.lastUpdateDate') as lastUpdateDate,
                    JSON_VALUE(t.value, '$.itemNumber') as itemNumber,
                    JSON_VALUE(t.value, '$.itemConfirmation') as itemConfirmation,
                    max(isnull(JSON_VALUE(t.value, '$.itemConfirmation'), 'z')) over(partition by c.contract_number) as maxAnswer,
                    JSON_VALUE(c.body, '$.policyHolder.partyData.partyBody.finKnowledgeQuestionnaire2024.confirmation') as confirmation
               FROM daily_contracts c
                    CROSS APPLY OPENJSON(JSON_QUERY(c.body, '$.policyHolder.partyData.partyBody.finKnowledgeQuestionnaire2024.questionnaire')) t
               ) b on c.contract_number = b.contract_number  
WHERE JSON_VALUE(c.body, '$.policyTerms.startDate') >= '2024-11-01'
)
select contract_number,
       product_group,
       1 as order_number,
       'row1|'+isnull(ROW1_1,'')+'|'+isnull(ROW1_2,'')+'|'+isnull(ROW1_3,'')+'|'+isnull(ROW1_4,'')+'|'+isnull(ROW1_5,'')+'|'+isnull(ROW1_6,'')+'|'+isnull(ROW1_7,'')+'|'+isnull(ROW1_8,'')+'|'+isnull(ROW1_9,'')+'|'+isnull(ROW1_10,'')+'|'+isnull(ROW1_11,'')+'|'+isnull(ROW1_12,'')+'|'+isnull(ROW1_13,'')+'|'+isnull(ROW1_14,'')+'|'+isnull(ROW1_15,'')+'|'+isnull(ROW1_16,'')+'|'+isnull(ROW1_17,'')+'|'+isnull(ROW1_18,'')+'|'+isnull(ROW1_19,'')+'|'+isnull(ROW1_20,'')+'|'+isnull(ROW1_21,'')+'|'+isnull(ROW1_22,'')+'|'+isnull(ROW1_23,'')+'|'+isnull(ROW1_24,'')+'|'+isnull(ROW1_25,'')+'|'+isnull(ROW1_26,'')+'|'+isnull(ROW1_27,'')+'|'+isnull(ROW1_28,'')+'|'+isnull(ROW1_29,'')+'|'+isnull(ROW1_30,'')+'|'+isnull(ROW1_31,'')+'|'+isnull(ROW1_32,'')+'|'+isnull(ROW1_33,'')+'|'+isnull(ROW1_34,'')+'|'+isnull(ROW1_35,'')+'|'+isnull(ROW1_36,'')+'|'+isnull(ROW1_37,'')+'|'+isnull(ROW1_38,'')+'|'+isnull(ROW1_39,'')+'|'+isnull(ROW1_40,'')+'|'+isnull(ROW1_41,'')+'|'+isnull(ROW1_33,'')+'|'+isnull(ROW1_43,'')+'|'+isnull(ROW1_44,'')+'|'+isnull(ROW1_45,'')+'|'+isnull(ROW1_46,'')+'|'+isnull(ROW1_47,'')+'|'+isnull(ROW1_48,'')+'|'+isnull(ROW1_49,'')  +'|'+isnull(ROW1_50,'') +'|'+isnull(ROW1_51,'') as row_data
  from integration_data
union
select contract_number,
       product_group,
       2 as order_number,
       'row2|'+isnull(ROW2_1,'')+'|'+isnull(ROW2_2,'')+'|'+isnull(ROW2_3,'')+'|'+isnull(ROW2_4,'')+'|'+isnull(ROW2_5,'')+'|'+isnull(ROW2_6,'')+'|'+isnull(ROW2_7,'')+'|'+isnull(ROW2_8,'')+'|'+isnull(ROW2_9,'')+'|'+isnull(ROW2_10,'')+'|'+isnull(ROW2_11,'')+'|'+isnull(ROW2_12,'')+'|'+isnull(ROW2_13,'')+'|'+isnull(ROW2_14,'')+'|'+isnull(ROW2_15,'')+'|'+isnull(ROW2_16,'')+'|'+isnull(ROW2_17,'')+'|'+isnull(ROW2_18,'')+'|'+isnull(ROW2_19,'')+'|'+isnull(ROW2_20,'')+'|'+isnull(ROW2_21,'')+'|'+isnull(ROW2_22,'')+'|'+isnull(ROW2_23,'')+'|'+isnull(ROW2_24,'')+'|'+isnull(ROW2_25,'')+'|'+isnull(ROW2_26,'')+'|'+isnull(ROW2_27,'')+'|'+isnull(ROW2_28,'')+'|'+isnull(ROW2_29,'')+'|'+isnull(ROW2_30,'')+'|'+isnull(ROW2_31,'')+'|'+isnull(ROW2_32,'')+'|'+isnull(ROW2_33,'')+'|'+isnull(ROW2_34,'')+'|'+isnull(ROW2_35,'')+'|'+isnull(ROW2_36,'')+'|'+isnull(ROW2_37,'')+'|'+isnull(ROW2_38,'')+'|'+isnull(ROW2_39,'')+'|'+isnull(ROW2_40,'')+'|'+isnull(ROW2_41,'')+'|'+isnull(ROW2_42,'')+'|'+isnull(ROW2_34,'')+'|'+isnull(ROW2_44,'')+'|'+isnull(ROW2_45,'')+'|'+isnull(ROW2_46,'')+'|'+isnull(ROW2_47,'')+'|'+isnull(ROW2_48,'')+'|'+isnull(ROW2_49,'')+'|'+isnull(ROW2_50,'')+'|'+isnull(ROW2_51,'')  +'|'+isnull(ROW2_52,'') as row_data
  from integration_data
union
select contract_number,
       product_group,
       3 as order_number,
       'row3|'+isnull(ROW3_1,'')+'|'+isnull(ROW3_2,'')+'|'+isnull(ROW3_3,'')+'|'+isnull(ROW3_4,'')+'|'+isnull(ROW3_5,'')+'|||||||||||||||||||||||||||||||||||||||||||||||' as row_data
  from beneficiaries
union  
select contract_number,
       product_group,
       4 as order_number,
       'row4|'+isnull(ROW4_1,'')+'|'+isnull(ROW4_2,'')+'|'+isnull(ROW4_3,'')+'|'+isnull(ROW4_4,'')+'|'+isnull(ROW4_5,'')+'|'+isnull(ROW4_6,'')+'|'+isnull(ROW4_7,'')+'|'+isnull(ROW4_8,'')+'|'+isnull(ROW4_9,'')+'|'+isnull(ROW4_10,'')+'|'+isnull(ROW4_11,'')+'|'+isnull(ROW4_12,'')+'|'+isnull(ROW4_13,'')+'|'+isnull(ROW4_14,'')+'|'+isnull(ROW4_15,'')+'|'+isnull(ROW4_16,'')+'|'+isnull(ROW4_17,'')+'|'+isnull(ROW4_18,'')+'|'+isnull(ROW4_19,'')+'|'+isnull(ROW4_20,'')+'|'+isnull(ROW4_21,'')+'|'+isnull(ROW4_22,'')+'|'+isnull(ROW4_23,'')+'|'+isnull(ROW4_24,'')+'|'+isnull(ROW4_25,'')+'|'+isnull(ROW4_26,'')+'|'+isnull(ROW4_27,'')+'|'+isnull(ROW4_28,'')+'|'+isnull(ROW4_29,'')+'|'+isnull(ROW4_30,'')+'|'+isnull(ROW4_31,'')+'|'+isnull(ROW4_32,'')+'|'+isnull(ROW4_33,'')+'|'+isnull(ROW4_34,'')+'|'+isnull(ROW4_35,'') as row_data
  from integration_data
union
select contract_number,
       product_group,
       5 as order_number,
       'row5|'+isnull(ROW5_1,'')+'|'+isnull(ROW5_2,'')+'|'+isnull(ROW5_3,'')+'|'+isnull(ROW5_4,'')+'|'+isnull(ROW5_5,'')+'|'+isnull(ROW5_6,'')+'|'+isnull(ROW5_7,'')+'|'+isnull(ROW5_8,'') as row_data
  from risks
union
select contract_number,
       product_group,
       600 + rowNumber as order_number,
       'row6|'+isnull(ROW6_1,'')+'|'+isnull(ROW6_2,'')+'|'+isnull(ROW6_3,'')+'|'+isnull(ROW6_4,'')+'|'+isnull(ROW6_5,'')+'|'+isnull(ROW6_6,'')+'|'+isnull(ROW6_7,'') as row_data
  from surrender
union
select contract_number,
       product_group,
       800 + rowNumber as order_number,
       'row8|'+isnull(ROW8_1,'')+'|'+isnull(ROW8_2,'')+'|'+isnull(ROW8_3,'')+'|'+isnull(ROW8_4,'')+'|'+isnull(ROW8_5,'') as row_data
  from finQuestionnaire
 where ((maxAnswer = 'false' and lastAnswer != '') or (maxAnswer = 'true'))
union
select contract_number,
       product_group,
       805 as order_number,
       'row8|'+isnull(ROW8_1,'')+'|'+isnull(ROW8_2,'')+'|'+'5'+'|'+isnull(lastAnswer,'')+'|'+isnull(ROW8_5,'') as row_data
  from finQuestionnaire
 where rowNumber = 1
   and (maxAnswer = 'false' and lastAnswer != '')
union
select contract_number,
       product_group,
       800 + rowNumber as order_number,
       'row8|'+isnull(ROW8_1,'')+'|'+isnull(ROW8_2,'')+'|'+isnull(ROW8_3,'')+'|'+isnull(ROW8_4,'')+'|'+isnull(ROW8_5,'') as row_data
  from finQuestionnaire2023
 where ((maxAnswer = 'false' and lastAnswer != '') or (maxAnswer = 'true'))
union
select contract_number,
       product_group,
       805 as order_number,
       'row8|'+isnull(ROW8_1,'')+'|'+isnull(ROW8_2,'')+'|'+'5'+'|'+isnull(lastAnswer,'')+'|'+isnull(ROW8_5,'') as row_data
  from finQuestionnaire2023
 where rowNumber = 1
   and (maxAnswer = 'false' and lastAnswer != '')
union
select contract_number,
       product_group,
       800 + rowNumber as order_number,
       'row8|'+isnull(ROW8_1,'')+'|'+isnull(ROW8_2,'')+'|'+isnull(ROW8_3,'')+'|'+isnull(ROW8_4,'')+'|'+isnull(ROW8_5,'') as row_data
  from finQuestionnaire2024
 where ((maxAnswer = 'false' and lastAnswer != '') or (maxAnswer = 'true'))
union
select contract_number,
       product_group,
       805 as order_number,
       'row8|'+isnull(ROW8_1,'')+'|'+isnull(ROW8_2,'')+'|'+'6'+'|'+isnull(lastAnswer,'')+'|'+isnull(ROW8_5,'') as row_data
  from finQuestionnaire2024
 where rowNumber = 1
   and (maxAnswer = 'false' and lastAnswer != '')
union
select contract_number,
       product_group,
       900 as order_number,
       'row9|'+isnull(ROW9_1,'')+'|'+isnull(ROW9_2,'')+'|'+isnull(ROW9_3,'')+'|' as row_data
  from security_codes
union
select contract_number,
       product_group,
       905 as order_number,
       'row10|'+isnull(ROW10_1,'')+'|' as row_data
  from additionalServices
)
GO

-- examples
/*
-- data on date
select row_data
  from dbo.impl_get_sap_integration_data('2021-11-09')
 order by contract_number, order_number

-- data by contract on any date
select row_data
  from dbo.impl_get_sap_integration_data(null)
 where contract_number in ('82900-77000003')
 order by contract_number, order_number
*/

/****** Object:  StoredProcedure [dbo].[sp_getListExpiredPassword_clear]    Script Date: 01.10.2024 14:13:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		r.maslennikov (orig. v.levkovetс)
-- Create date:	2024-05-07
-- Description:	getListExpiredPassword SR-1082 Рассылка уведомлений о смене пароля и блокировке УЗ AdInsure
-- Modify:		2024-07-04 v.levkovetс SR-1136 
--				2024-07-05 r.maslennikov добавил вызов через линкед-сервер.
-- =============================================

DECLARE @SQLString nvarchar(max)
SET @SQLString =
N'create PROCEDURE [dbo].sp_getListExpiredPassword(@showBlocked int)
as
begin
    --Рассылка уведомлений о смене пароля и блокировке УЗ AdInsure
    Print @showBlocked
end';
IF NOT EXISTS (SELECT * FROM dbo.sysobjects WHERE id = OBJECT_ID(N'[dbo].[sp_getListExpiredPassword]') AND type IN (N'P'))
BEGIN
        EXECUTE sp_executesql @SQLString
END
GO

ALTER PROCEDURE [dbo].[sp_getListExpiredPassword]
    -- по умолчанию выводим список для отправки уведомлений о смене пароля
    @showBlocked int = 0
AS
    BEGIN
        SET NOCOUNT ON;
        IF
        @showBlocked = 0
        -- список пользователей для отправки уведомлений о смене пароля
            BEGIN
                with AU as -- таблица с пользователями, дополнена именами пользователей, создававших и вносивших корректировки
                (
                    select
                        auu.APPLICATION_USER_ID  as UID            , -- ИД пользователя
                        auu.USERNAME             as NameUser       , -- логин пользователя
                        auu.LOGIN_TYPE           as LoginType      , -- тип логина
                        auu.SYS_CREATED_ON       as DateCreateUser , -- дата создания пользователя
                        auu.SYS_UPDATED_ON       as DateUpdateUser , -- дата изменения пользователя
                        auu.SYS_CLIENT_ID        as ClientIDUser   , -- ИД клиента пользователя
                        aucr.APPLICATION_USER_ID as UIDCreatorUser , -- ИД пользователя, создавшего УЗ
                        aucr.USERNAME            as NameCreatorUser, -- логин пользователя, создавшего УЗ
                        auch.APPLICATION_USER_ID as UIDUpdaterUser , -- ИД пользователя, изменившего УЗ
                        auch.USERNAME            as NameUpdaterUser  -- логин пользователя, изменившего УЗ
                    FROM
                         ORG.APPLICATION_USER AUU
                    left outer join --для добавления сведений о создавшем УЗ
                         ORG.APPLICATION_USER AUCr
                    on
                        auu.SYS_CREATED_BY_ID = aucr.APPLICATION_USER_ID
                    left outer join --для добавления сведений об изменившем УЗ
                         ORG.APPLICATION_USER AUCh
                    on
                        auu.SYS_UPDATED_BY_ID = auch.APPLICATION_USER_ID ),
                    UAR as -- таблица с назначенными ролями, дополнена именами пользователей, создававших и вносивших корректировки
                    (
                SELECT
                    upr.APPLICATION_USER_ID as UID            , -- ИД пользователя
                    upr.APPLICATION_ROLE_ID as RID            , -- ИД роли
                    upr.SYS_CREATED_ON      as DateCreateRole , -- дата назначения роли
                    upr.SYS_UPDATED_ON      as DateUpdateRole , -- дата изменения роли
                    upr.SYS_CREATED_BY_ID   as UIDCreatorRole , -- ИД пользователя, назначившего роль
                    aucr.USERNAME           as RoleCreatorUser, -- логин пользователя, назначившего роль
                    upr.SYS_UPDATED_BY_ID   as UIDUpdaterRole , -- ИД пользователя, изменившего роль
                    Auch.USERNAME           as RoleUpdaterUser  -- логин пользователя, изменившего рольme, ';') within group (order by t.code_name) as user_roles
                from
                    (
                        -- роли, назначенные напрямую
                        select
                            uar.application_user_id,
                            uar.APPLICATION_ROLE_ID,
                            uar.SYS_CREATED_ON     ,
                            uar.SYS_UPDATED_ON     ,
                            uar.SYS_CREATED_BY_ID  ,
                            uar.SYS_UPDATED_BY_ID
                        from
                             cfx.user_application_role uar
                        
                        union
                        -- роли, назначенные через группу
                        select
                            auga.application_user_id,
                            ugar.APPLICATION_ROLE_ID,
                            auga.SYS_CREATED_ON     ,
                            auga.SYS_UPDATED_ON     ,
                            auga.SYS_CREATED_BY_ID  ,
                            auga.SYS_UPDATED_BY_ID
                        from
                             org.application_user_group_assignment auga,
                             cfx.user_group_application_role       ugar,
                             cfg.application_role                  ar
                        where
                            auga.application_user_group_id = ugar.application_user_group_id
                        and ar.application_role_id         = ugar.application_role_id ) upr
                left outer join --для добавления сведений о назначившем роль
                     ORG.APPLICATION_USER AUCr
                on
                    upr.SYS_CREATED_BY_ID = aucr.APPLICATION_USER_ID
                left outer join --для добавления сведений об изменившем роль
                     ORG.APPLICATION_USER AUCh
                on
                    upr.SYS_UPDATED_BY_ID = auch.APPLICATION_USER_ID ),
                        Status AS --таблица со статусом УЗ
                        (
                    SELECT
                        AUC.APPLICATION_USER_ID as UID,         --ИД пользователя
                        auc.VALUE               as IsUserActive --статус пользователя (true - активен, false - заблокирован)
                    FROM
                         ORG.APPLICATION_USER_CLAIM AUC
                    WHERE
                        AUC.CLAIM_TYPE='IsUserActive' ),
                            FIO AS --таблица с именем пользователя
                            (
                        SELECT
                            AUC.APPLICATION_USER_ID as UID, --ИД пользователя
                            auc.VALUE               as FIO  --имя пользователя
                        FROM
                             ORG.APPLICATION_USER_CLAIM AUC
                        WHERE
                            AUC.CLAIM_TYPE='DisplayName' ),
                                AUDIT_TRAIL_LAST_LOGIN as
                                (
                            select
                                username              as NameUser, --логин
                                max (event_timestamp) as LastLogin --дата и время последнего входа
                            from
                                 bfx.AUDIT_TRAIL
                            where
                                DOMAIN     = 'AccessControl'
                            and EVENT_TYPE = 'Login'
                            group by
                                username
                            
                            union
                            
                            select
                                username              as NameUser, --логин
                                max (event_timestamp) as LastLogin --дата и время последнего входа
                            from
                                 BFX_IMPL.AUDIT_TRAIL_ARCH
                            where
                                DOMAIN     = 'AccessControl'
                            and EVENT_TYPE = 'Login'
                            group by
                                username ),
                                    LastLogin AS --таблица с датой последнего входа
                                    (
                                select
                                    NameUser,                    --логин
                                    max (LastLogin) as LastLogin --дата и время последнего входа
                                from
                                    AUDIT_TRAIL_LAST_LOGIN
                                group by
                                    NameUser ),
                                        Audit_trail_CP as
                                        (
                                    select
                                        LPC.UID       ,        --ИД пользователя
                                        LPC.NameUserCP,        --логин пользователя, изменившего пароль
                                        LPC.UIDCP     ,        --ИД пользователя, изменившего пароль
                                        LPC.LastChangePassword --дата и время последнего изменения
                                    from
                                        (
                                            --текущая таблица с данными
                                            select
                                                LPC_AT.UID                ,        --ИД пользователя
                                                BAT.USERNAME              as NameUserCP,        --логин пользователя, изменившего пароль
                                                BAT.SYS_CREATED_BY_ID     as UIDCP     ,        --ИД пользователя, изменившего пароль
                                                LPC_AT.LastPasswordChange as LastChangePassword --дата и время последнего изменения
                                            from
                                                (
                                                    select
                                                        json_value(body, '$.userId') as UID,
                                                        max (event_timestamp)        as LastPasswordChange
                                                    from
                                                         bfx.audit_trail
                                                    where
                                                        domain                                  = N'UserManagement'
                                                    and event_type                              = N'Update'
                                                    and json_value(body, '$.isPasswordChanged') = N'true'
                                                    group by
                                                        json_value(body, '$.userId') ) LPC_AT
                                            inner join
                                                 bfx.audit_trail BAT
                                            on
                                                BAT.EVENT_TIMESTAMP             = LPC_AT.LastPasswordChange
                                            and json_value(BAT.body, '$.userId')=LPC_AT.uid
                                            
                                            UNION
                                            --архивная таблица с данными
                                            select
                                                LPC_ATA.UID                ,        --ИД пользователя
                                                BATA.USERNAME              as NameUserCP,        --логин пользователя, изменившего пароль
                                                BATA.SYS_CREATED_BY_ID     as UIDCP     ,        --ИД пользователя, изменившего пароль
                                                LPC_ATA.LastPasswordChange as LastChangePassword --дата и время последнего изменения
                                            from
                                                (
                                                    select
                                                        json_value(body, '$.userId') as UID,
                                                        max (event_timestamp)        as LastPasswordChange
                                                    from
                                                         BFX_IMPL.AUDIT_TRAIL_ARCH
                                                    where
                                                        domain                                  = N'UserManagement'
                                                    and event_type                              = N'Update'
                                                    and json_value(body, '$.isPasswordChanged') = N'true'
                                                    group by
                                                        json_value(body, '$.userId') ) LPC_ATA
                                            inner join
                                                 BFX_IMPL.AUDIT_TRAIL_ARCH BATA
                                            on
                                                BATA.EVENT_TIMESTAMP             = LPC_ATA.LastPasswordChange
                                            and json_value(BATA.body, '$.userId')=LPC_ATA.uid ) LPC ),
                                            CP as --таблица с информацией об изменении пароля
                                            (
                                        select
                                            LPC.UID       ,        --ИД пользователя
                                            BAT.NameUserCP,        --логин пользователя, изменившего пароль
                                            BAT.UIDCP     ,        --ИД пользователя, изменившего пароль
                                            LPC.LastChangePassword --дата и время последнего изменения
                                        from
                                            (
                                                select
                                                    UID,
                                                    max (LastChangePassword) as LastChangePassword
                                                from
                                                    Audit_trail_CP
                                                group by
                                                    UID ) LPC
                                        inner join
                                            Audit_trail_CP BAT
                                        on
                                            BAT.LastChangePassword = LPC.LastChangePassword
                                        and bat.uid                =LPC.uid ),
                                                Audit_Trail_CIA as
                                                (
                                            SELECT
                                                LCIA.UID        ,       --ИД пользователя
                                                LCIA.NameUserCIA,       --логин пользователя, изменившегоактивность УЗ
                                                LCIA.UIDCIA     ,       --ИД пользователя, изменившегоактивность УЗ
                                                LCIA.LastChangeIsActive --дата и время последнего изменения активности УЗ
                                            from
                                                (
                                                    --текущая таблица с данными
                                                    select
                                                        LCIA_AT.UID                ,       --ИД пользователя
                                                        BAT.USERNAME               as NameUserCIA,       --логин пользователя, изменившегоактивность УЗ
                                                        BAT.SYS_CREATED_BY_ID      as UIDCIA     ,       --ИД пользователя, изменившегоактивность УЗ
                                                        LCIA_AT.LastChangeIsActive as LastChangeIsActive --дата и время последнего изменения активности УЗ
                                                    from
                                                        (
                                                            select
                                                                json_value(body, '$.userId') as UID,
                                                                max (event_timestamp)        as LastChangeIsActive
                                                            from
                                                                 bfx.audit_trail
                                                            where
                                                                domain                         = N'UserManagement'
                                                            and event_type                     = N'Update'
                                                            and CHARINDEX('claimsChanges',body)<>0
                                                            group by
                                                                json_value(body, '$.userId') ) LCIA_AT
                                                    inner join
                                                        bfx.audit_trail BAT
                                                    on
                                                        BAT.EVENT_TIMESTAMP             = LCIA_AT.LastChangeIsActive
                                                    and json_value(BAT.body, '$.userId')=LCIA_AT.uid
                                                    
                                                    union
                                                    --архивная таблица с данными
                                                    select
                                                        LCIA_ATA.UID                ,       --ИД пользователя
                                                        BATA.USERNAME               as NameUserCIA,       --логин пользователя, изменившегоактивность УЗ
                                                        BATA.SYS_CREATED_BY_ID      as UIDCIA     ,       --ИД пользователя, изменившегоактивность УЗ
                                                        LCIA_ATA.LastChangeIsActive as LastChangeIsActive --дата и время последнего изменения активности УЗ
                                                    from
                                                        (
                                                            select
                                                                json_value(body, '$.userId') as UID,
                                                                max (event_timestamp)        as LastChangeIsActive
                                                            from
                                                                 BFX_IMPL.AUDIT_TRAIL_ARCH
                                                            where
                                                                domain                         = N'UserManagement'
                                                            and event_type                     = N'Update'
                                                            and CHARINDEX('claimsChanges',body)<>0
                                                            group by
                                                                json_value(body, '$.userId') ) LCIA_ATA
                                                    inner join
                                                         BFX_IMPL.AUDIT_TRAIL_ARCH BATA
                                                    on
                                                        BATA.EVENT_TIMESTAMP             = LCIA_ATA.LastChangeIsActive
                                                    and json_value(BATA.body, '$.userId')=LCIA_ATA.uid ) LCIA ),
                                                    CIA as --таблица с информацией об изменении статуса активности УЗ
                                                    (
                                                select
                                                    LCIA.UID       ,        --ИД пользователя
                                                    BAT.NameUserCIA,        --логин пользователя, изменившегоактивность УЗ
                                                    BAT.UIDCIA     ,        --ИД пользователя, изменившегоактивность УЗ
                                                    LCIA.LastChangeIsActive --дата и время последнего изменения активности УЗ
                                                from
                                                    (
                                                        select
                                                            UID,
                                                            max (LastChangeIsActive) as LastChangeIsActive
                                                        from
                                                            Audit_Trail_CIA
                                                        group by
                                                            UID ) LCIA
                                                inner join
                                                    Audit_Trail_CIA BAT
                                                on
                                                    BAT.LastChangeIsActive = LCIA.LastChangeIsActive
                                                and bat.uid                =LCIA.uid ),
                                                        EMail AS --таблица с информацией о PartyCode!!! и почтовом адресе
                                                        (
                                                    select
                                                        aup.APPLICATION_USER_ID as UID      , -- ИД пользователя
                                                        AUP.PartyCode           as PartyCode, -- ИД
                                                        SPIS.ACTUAL_EMAIL       as EMail      -- e-mail пользователя
                                                    FROM
                                                        (
                                                            select
                                                                APPLICATION_USER_ID,
                                                                VALUE as PartyCode
                                                            FROM
                                                                 ORG.APPLICATION_USER_CLAIM
                                                            where
                                                                CLAIM_TYPE = 'PartyCode' ) AUP
                                                    inner join
                                                         ORG_IMPL.SERVICE_PROVIDER_INFO_SAT_LATEST SPIS
                                                    on
                                                        SPIS.PARTY_CODE = AUP.PartyCode ),
                                                            SPSL as --таблица для определения последнего закрепления пользователя за подразделением
                                                            (
                                                        select
                                                            SPISL.*
                                                        FROM
                                                            (
                                                                select
                                                                    SPISL.PARTY_CODE,
                                                                    max (SPISL.LOAD_DATE) as LOAD_DATE
                                                                FROM
                                                                     org_impl.service_provider_info_sat_latest SPISL
                                                                group by
                                                                    SPISL.PARTY_CODE ) LS
                                                        inner join
                                                             org_impl.service_provider_info_sat_latest SPISL
                                                        on
                                                            LS.PARTY_CODE =SPISL.PARTY_CODE
                                                        and ls.LOAD_DATE  =SPISL.LOAD_DATE ),
                                                                --для получения партнера и подразделения из запроса для отчёта
                                                                levels (organisation_unit_id, top_parent, level) as
                                                                (
                                                            select
                                                                oup.organisation_unit_id              ,
                                                                oup.organisation_unit_id as top_parent,
                                                                0                        as level
                                                            from
                                                                 org.organisation_unit oup
                                                            where
                                                                oup.parent_id is null
                                                            
                                                            union all
                                                            
                                                            select
                                                                ou.organisation_unit_id   ,
                                                                c.top_parent as top_parent,
                                                                level + 1    as level
                                                            from
                                                                 org.organisation_unit ou,
                                                                levels                c
                                                            where
                                                                ou.parent_id = c.organisation_unit_id ),
                                                                    --для получения партнера и подразделения из запроса для отчёта
                                                                    org_units as
                                                                    (
                                                                select
                                                                    ou.organisation_unit_id     as organisationUnitId          ,
                                                                    ou.organisation_unit_code   as organisationUnitCode        ,
                                                                    ousat.NAME                  as organisationUnitName        ,
                                                                    ousat.full_name             as organisationUnitFullName    ,
                                                                    ousat.code                  as organisationUnitBusinessCode,
                                                                    ou.parent_id                as parentId                    ,
                                                                    oup.organisation_unit_code  as parentCode                  ,
                                                                    oupsat.NAME                 as parentName                  ,
                                                                    oupsat.full_name            as parentFullName              ,
                                                                    oupsat.code                 as parentBusinessCode          ,
                                                                    oupt.organisation_unit_id   as topParentId                 ,
                                                                    oupt.organisation_unit_code as topParentCode               ,
                                                                    ouptsat.NAME                as topParentName               ,
                                                                    ouptsat.full_name           as topParentFullName           ,
                                                                    ouptsat.code                as topParentBusinessCode       ,
                                                                    l.level
                                                                from
                                                                     org.organisation_unit ou
                                                                join
                                                                    levels l
                                                                on
                                                                    ou.organisation_unit_id = l.organisation_unit_id
                                                                left join
                                                                     org_impl.organisation_unit_hub ouhub
                                                                on
                                                                    ou.organisation_unit_code = ouhub.organisation_unit_code
                                                                left join
                                                                     org_impl.organisation_unit_info_sat_latest ousat
                                                                on
                                                                    ouhub.organisation_unit_hkey = ousat.organisation_unit_info_hkey
                                                                left join
                                                                     org.organisation_unit oup
                                                                on
                                                                    oup.organisation_unit_id = ou.parent_id
                                                                left join
                                                                     org_impl.organisation_unit_hub ouphub
                                                                on
                                                                    oup.organisation_unit_code = ouphub.organisation_unit_code
                                                                left join
                                                                     org_impl.organisation_unit_info_sat_latest oupsat
                                                                on
                                                                    ouphub.organisation_unit_hkey = oupsat.organisation_unit_info_hkey
                                                                left join
                                                                     org.organisation_unit oupt
                                                                on
                                                                    oupt.organisation_unit_id = l.top_parent
                                                                left join
                                                                     org_impl.organisation_unit_hub oupthub
                                                                on
                                                                    oupt.organisation_unit_code = oupthub.organisation_unit_code
                                                                left join
                                                                     org_impl.organisation_unit_info_sat_latest ouptsat
                                                                on
                                                                    oupthub.organisation_unit_hkey = ouptsat.organisation_unit_info_hkey )
                                                                    select                    --таблица с данными о пользователях
                                                                        distinct au.NameUser, --логин
                                                                        FIO.FIO             , --ФИО
                                                                        Email.Email         , --адрес электронной почты
                                                                        DaysToChangePassword =
                                                                        case
                                                                        when
                                                                            au.NameUser in ('API_EFR',
                                                                                            'Migration',
                                                                                            'ELMA365',
                                                                                            'bitrix')
                                                                            and CP.LastChangePassword is null
                                                                        then
                                                                            180-DATEDIFF (day,au.DateCreateUser,GETDATE())-1
                                                                        when
                                                                            au.NameUser in ('API_EFR',
                                                                                            'Migration',
                                                                                            'ELMA365',
                                                                                            'bitrix')
                                                                            and CP.LastChangePassword is not null
                                                                        then
                                                                            180-DATEDIFF (day,CP.LastChangePassword,GETDATE())-1
                                                                        when
                                                                            LastChangePassword is null
                                                                        then
                                                                            60-DATEDIFF (day,au.DateCreateUser,GETDATE())-1
                                                                        else
                                                                            60-DATEDIFF (day,CP.LastChangePassword,GETDATE())-1
                                                                        end,
                                                                        ChangePasswordDay = FORMAT (
                                                                            (
                                                                                case
                                                                                when
                                                                                    au.NameUser in ('API_EFR',
                                                                                                    'Migration',
                                                                                                    'ELMA365',
                                                                                                    'bitrix')
                                                                                    and CP.LastChangePassword is null
                                                                                then
                                                                                    DATEADD(day,180-DATEDIFF (day,au.DateCreateUser,GETDATE())-1,GETDATE())
                                                                                when
                                                                                    au.NameUser in ('API_EFR',
                                                                                                    'Migration',
                                                                                                    'ELMA365',
                                                                                                    'bitrix')
                                                                                    and CP.LastChangePassword is not null
                                                                                then
                                                                                    DATEADD(day,180-DATEDIFF (day,CP.LastChangePassword,GETDATE())-1,GETDATE())
                                                                                when
                                                                                    LastChangePassword is null
                                                                                then
                                                                                    DATEADD(day,60-DATEDIFF (day,au.DateCreateUser,GETDATE())-1,GETDATE())
                                                                                else
                                                                                    DATEADD(day,60-DATEDIFF (day,CP.LastChangePassword,GETDATE())-1,GETDATE())
                                                                                end ), 'd', 'ru-ru' )
                                                                    from
                                                                        au
                                                                    left outer join --добавление информации по ролям
                                                                        UAR
                                                                    on
                                                                        au.UID = UAR.UID
                                                                    left outer JOIN --добавление наименование роли
                                                                         CFG.APPLICATION_ROLE ar
                                                                    on
                                                                        UAR.RID = ar.APPLICATION_ROLE_ID
                                                                    left outer JOIN --добавление наименование роли
                                                                        Status
                                                                    on
                                                                        au.UID = Status.UID
                                                                    left outer JOIN --добавление ФИО
                                                                        FIO
                                                                    on
                                                                        au.UID = FIO.UID
                                                                    left outer JOIN --добавление даты и времени последнего входа
                                                                        lastlogin
                                                                    on
                                                                        au.NameUser = lastlogin.NameUser
                                                                    left outer JOIN --добавление информации о последнем изменении пароля
                                                                        CP
                                                                    on
                                                                        au.UID = CP.UID
                                                                    left outer JOIN --добавление информации о неудачных входах
                                                                         org.login_status as LS
                                                                    on
                                                                        au.NameUser = ls.USERNAME
                                                                    left outer JOIN --добавление информации об электронной почте
                                                                        EMail
                                                                    on
                                                                        au.UID = EMail.UID
                                                                    where
                                                                        ar.CODE_NAME in ('Administrator',
                                                                                         'AllowExportCredit',
                                                                                         'OrganisationAdministrator',
                                                                                         'System',
                                                                                         'UserManager',
                                                                                         'SMGO',
                                                                                         'WTTJ')
                                                                    AND status.IsUserActive= 'True'
                                                                    and (
                                                                            LS.status<>1
                                                                            or LS.status is null)
                                                                    and
                                                                        case
                                                                        when
                                                                            au.NameUser in ('API_EFR',
                                                                                            'Migration',
                                                                                            'ELMA365',
                                                                                            'bitrix')
                                                                            and CP.LastChangePassword is null
                                                                        then
                                                                            180-DATEDIFF (day,au.DateCreateUser,GETDATE())-1
                                                                        when
                                                                            au.NameUser in ('API_EFR',
                                                                                            'Migration',
                                                                                            'ELMA365',
                                                                                            'bitrix')
                                                                            and CP.LastChangePassword is not null
                                                                        then
                                                                            180-DATEDIFF (day,CP.LastChangePassword,GETDATE())-1
                                                                        when
                                                                            LastChangePassword is null
                                                                        then
                                                                            60-DATEDIFF (day,au.DateCreateUser,GETDATE())-1
                                                                        else
                                                                            60-DATEDIFF (day,CP.LastChangePassword,GETDATE())-1
                                                                        end < 11;
            END
        ELSE
        -- список пользователей для отправки уведомлений о блокировке
            BEGIN
                with AU as -- таблица с пользователями, дополнена именами пользователей, создававших и вносивших корректировки
                (
                    select
                        auu.APPLICATION_USER_ID  as UID            , -- ИД пользователя
                        auu.USERNAME             as NameUser       , -- логин пользователя
                        auu.LOGIN_TYPE           as LoginType      , -- тип логина
                        auu.SYS_CREATED_ON       as DateCreateUser , -- дата создания пользователя
                        auu.SYS_UPDATED_ON       as DateUpdateUser , -- дата изменения пользователя
                        auu.SYS_CLIENT_ID        as ClientIDUser   , -- ИД клиента пользователя
                        aucr.APPLICATION_USER_ID as UIDCreatorUser , -- ИД пользователя, создавшего УЗ
                        aucr.USERNAME            as NameCreatorUser, -- логин пользователя, создавшего УЗ
                        auch.APPLICATION_USER_ID as UIDUpdaterUser , -- ИД пользователя, изменившего УЗ
                        auch.USERNAME            as NameUpdaterUser  -- логин пользователя, изменившего УЗ
                    FROM
                         ORG.APPLICATION_USER AUU
                    left outer join --для добавления сведений о создавшем УЗ
                         ORG.APPLICATION_USER AUCr
                    on
                        auu.SYS_CREATED_BY_ID = aucr.APPLICATION_USER_ID
                    left outer join --для добавления сведений об изменившем УЗ
                         ORG.APPLICATION_USER AUCh
                    on
                        auu.SYS_UPDATED_BY_ID = auch.APPLICATION_USER_ID ),
                    UAR as -- таблица с назначенными ролями, дополнена именами пользователей, создававших и вносивших корректировки
                    (
                SELECT
                    upr.APPLICATION_USER_ID as UID            , -- ИД пользователя
                    upr.APPLICATION_ROLE_ID as RID            , -- ИД роли
                    upr.SYS_CREATED_ON      as DateCreateRole , -- дата назначения роли
                    upr.SYS_UPDATED_ON      as DateUpdateRole , -- дата изменения роли
                    upr.SYS_CREATED_BY_ID   as UIDCreatorRole , -- ИД пользователя, назначившего роль
                    aucr.USERNAME           as RoleCreatorUser, -- логин пользователя, назначившего роль
                    upr.SYS_UPDATED_BY_ID   as UIDUpdaterRole , -- ИД пользователя, изменившего роль
                    Auch.USERNAME           as RoleUpdaterUser  -- логин пользователя, изменившего рольme, ';') within group (order by t.code_name) as user_roles
                from
                    (
                        -- роли, назначенные напрямую
                        select
                            uar.application_user_id,
                            uar.APPLICATION_ROLE_ID,
                            uar.SYS_CREATED_ON     ,
                            uar.SYS_UPDATED_ON     ,
                            uar.SYS_CREATED_BY_ID  ,
                            uar.SYS_UPDATED_BY_ID
                        from
                             cfx.user_application_role uar
                        
                        union
                        -- роли, назначенные через группу
                        select
                            auga.application_user_id,
                            ugar.APPLICATION_ROLE_ID,
                            auga.SYS_CREATED_ON     ,
                            auga.SYS_UPDATED_ON     ,
                            auga.SYS_CREATED_BY_ID  ,
                            auga.SYS_UPDATED_BY_ID
                        from
                             org.application_user_group_assignment auga,
                             cfx.user_group_application_role       ugar,
                             cfg.application_role                  ar
                        where
                            auga.application_user_group_id = ugar.application_user_group_id
                        and ar.application_role_id         = ugar.application_role_id ) upr
                left outer join --для добавления сведений о назначившем роль
                     ORG.APPLICATION_USER AUCr
                on
                    upr.SYS_CREATED_BY_ID = aucr.APPLICATION_USER_ID
                left outer join --для добавления сведений об изменившем роль
                     ORG.APPLICATION_USER AUCh
                on
                    upr.SYS_UPDATED_BY_ID = auch.APPLICATION_USER_ID ),
                        Status AS --таблица со статусом УЗ
                        (
                    SELECT
                        AUC.APPLICATION_USER_ID as UID,         --ИД пользователя
                        auc.VALUE               as IsUserActive --статус пользователя (true - активен, false - заблокирован)
                    FROM
                         ORG.APPLICATION_USER_CLAIM AUC
                    WHERE
                        AUC.CLAIM_TYPE='IsUserActive' ),
                            FIO AS --таблица с именем пользователя
                            (
                        SELECT
                            AUC.APPLICATION_USER_ID as UID, --ИД пользователя
                            auc.VALUE               as FIO  --имя пользователя
                        FROM
                             ORG.APPLICATION_USER_CLAIM AUC
                        WHERE
                            AUC.CLAIM_TYPE='DisplayName' ),
                                AUDIT_TRAIL_LAST_LOGIN as
                                (
                            select
                                username              as NameUser, --логин
                                max (event_timestamp) as LastLogin --дата и время последнего входа
                            from
                                 bfx.AUDIT_TRAIL
                            where
                                DOMAIN     = 'AccessControl'
                            and EVENT_TYPE = 'Login'
                            group by
                                username
                            
                            union
                            
                            select
                                username              as NameUser, --логин
                                max (event_timestamp) as LastLogin --дата и время последнего входа
                            from
                                 BFX_IMPL.AUDIT_TRAIL_ARCH
                            where
                                DOMAIN     = 'AccessControl'
                            and EVENT_TYPE = 'Login'
                            group by
                                username ),
                                    LastLogin AS --таблица с датой последнего входа
                                    (
                                select
                                    NameUser,                    --логин
                                    max (LastLogin) as LastLogin --дата и время последнего входа
                                from
                                    AUDIT_TRAIL_LAST_LOGIN
                                group by
                                    NameUser ),
                                        Audit_trail_CP as
                                        (
                                    select
                                        LPC.UID       ,        --ИД пользователя
                                        LPC.NameUserCP,        --логин пользователя, изменившего пароль
                                        LPC.UIDCP     ,        --ИД пользователя, изменившего пароль
                                        LPC.LastChangePassword --дата и время последнего изменения
                                    from
                                        (
                                            --текущая таблица с данными
                                            select
                                                LPC_AT.UID                ,        --ИД пользователя
                                                BAT.USERNAME              as NameUserCP,        --логин пользователя, изменившего пароль
                                                BAT.SYS_CREATED_BY_ID     as UIDCP     ,        --ИД пользователя, изменившего пароль
                                                LPC_AT.LastPasswordChange as LastChangePassword --дата и время последнего изменения
                                            from
                                                (
                                                    select
                                                        json_value(body, '$.userId') as UID,
                                                        max (event_timestamp)        as LastPasswordChange
                                                    from
                                                         bfx.audit_trail
                                                    where
                                                        domain                                  = N'UserManagement'
                                                    and event_type                              = N'Update'
                                                    and json_value(body, '$.isPasswordChanged') = N'true'
                                                    group by
                                                        json_value(body, '$.userId') ) LPC_AT
                                            inner join
                                                bfx.audit_trail BAT
                                            on
                                                BAT.EVENT_TIMESTAMP             = LPC_AT.LastPasswordChange
                                            and json_value(BAT.body, '$.userId')=LPC_AT.uid
                                            
                                            UNION
                                            --архивная таблица с данными
                                            select
                                                LPC_ATA.UID                ,        --ИД пользователя
                                                BATA.USERNAME              as NameUserCP,        --логин пользователя, изменившего пароль
                                                BATA.SYS_CREATED_BY_ID     as UIDCP     ,        --ИД пользователя, изменившего пароль
                                                LPC_ATA.LastPasswordChange as LastChangePassword --дата и время последнего изменения
                                            from
                                                (
                                                    select
                                                        json_value(body, '$.userId') as UID,
                                                        max (event_timestamp)        as LastPasswordChange
                                                    from
                                                         BFX_IMPL.AUDIT_TRAIL_ARCH
                                                    where
                                                        domain                                  = N'UserManagement'
                                                    and event_type                              = N'Update'
                                                    and json_value(body, '$.isPasswordChanged') = N'true'
                                                    group by
                                                        json_value(body, '$.userId') ) LPC_ATA
                                            inner join
                                                 BFX_IMPL.AUDIT_TRAIL_ARCH BATA
                                            on
                                                BATA.EVENT_TIMESTAMP             = LPC_ATA.LastPasswordChange
                                            and json_value(BATA.body, '$.userId')=LPC_ATA.uid ) LPC ),
                                            CP as --таблица с информацией об изменении пароля
                                            (
                                        select
                                            LPC.UID       ,        --ИД пользователя
                                            BAT.NameUserCP,        --логин пользователя, изменившего пароль
                                            BAT.UIDCP     ,        --ИД пользователя, изменившего пароль
                                            LPC.LastChangePassword --дата и время последнего изменения
                                        from
                                            (
                                                select
                                                    UID,
                                                    max (LastChangePassword) as LastChangePassword
                                                from
                                                    Audit_trail_CP
                                                group by
                                                    UID ) LPC
                                        inner join
                                            Audit_trail_CP BAT
                                        on
                                            BAT.LastChangePassword = LPC.LastChangePassword
                                        and bat.uid                =LPC.uid ),
                                                Audit_Trail_CIA as
                                                (
                                            SELECT
                                                LCIA.UID        ,       --ИД пользователя
                                                LCIA.NameUserCIA,       --логин пользователя, изменившегоактивность УЗ
                                                LCIA.UIDCIA     ,       --ИД пользователя, изменившегоактивность УЗ
                                                LCIA.LastChangeIsActive --дата и время последнего изменения активности УЗ
                                            from
                                                (
                                                    --текущая таблица с данными
                                                    select
                                                        LCIA_AT.UID                ,       --ИД пользователя
                                                        BAT.USERNAME               as NameUserCIA,       --логин пользователя, изменившегоактивность УЗ
                                                        BAT.SYS_CREATED_BY_ID      as UIDCIA     ,       --ИД пользователя, изменившегоактивность УЗ
                                                        LCIA_AT.LastChangeIsActive as LastChangeIsActive --дата и время последнего изменения активности УЗ
                                                    from
                                                        (
                                                            select
                                                                json_value(body, '$.userId') as UID,
                                                                max (event_timestamp)        as LastChangeIsActive
                                                            from
                                                                 bfx.audit_trail
                                                            where
                                                                domain                         = N'UserManagement'
                                                            and event_type                     = N'Update'
                                                            and CHARINDEX('claimsChanges',body)<>0
                                                            group by
                                                                json_value(body, '$.userId') ) LCIA_AT
                                                    inner join
                                                         bfx.audit_trail BAT
                                                    on
                                                        BAT.EVENT_TIMESTAMP             = LCIA_AT.LastChangeIsActive
                                                    and json_value(BAT.body, '$.userId')=LCIA_AT.uid
                                                    
                                                    union
                                                    --архивная таблица с данными
                                                    select
                                                        LCIA_ATA.UID                ,       --ИД пользователя
                                                        BATA.USERNAME               as NameUserCIA,       --логин пользователя, изменившегоактивность УЗ
                                                        BATA.SYS_CREATED_BY_ID      as UIDCIA     ,       --ИД пользователя, изменившегоактивность УЗ
                                                        LCIA_ATA.LastChangeIsActive as LastChangeIsActive --дата и время последнего изменения активности УЗ
                                                    from
                                                        (
                                                            select
                                                                json_value(body, '$.userId') as UID,
                                                                max (event_timestamp)        as LastChangeIsActive
                                                            from
                                                                 BFX_IMPL.AUDIT_TRAIL_ARCH
                                                            where
                                                                domain                         = N'UserManagement'
                                                            and event_type                     = N'Update'
                                                            and CHARINDEX('claimsChanges',body)<>0
                                                            group by
                                                                json_value(body, '$.userId') ) LCIA_ATA
                                                    inner join
                                                         BFX_IMPL.AUDIT_TRAIL_ARCH BATA
                                                    on
                                                        BATA.EVENT_TIMESTAMP             = LCIA_ATA.LastChangeIsActive
                                                    and json_value(BATA.body, '$.userId')=LCIA_ATA.uid ) LCIA ),
                                                    CIA as --таблица с информацией об изменении статуса активности УЗ
                                                    (
                                                select
                                                    LCIA.UID       ,        --ИД пользователя
                                                    BAT.NameUserCIA,        --логин пользователя, изменившегоактивность УЗ
                                                    BAT.UIDCIA     ,        --ИД пользователя, изменившегоактивность УЗ
                                                    LCIA.LastChangeIsActive --дата и время последнего изменения активности УЗ
                                                from
                                                    (
                                                        select
                                                            UID,
                                                            max (LastChangeIsActive) as LastChangeIsActive
                                                        from
                                                            Audit_Trail_CIA
                                                        group by
                                                            UID ) LCIA
                                                inner join
                                                    Audit_Trail_CIA BAT
                                                on
                                                    BAT.LastChangeIsActive = LCIA.LastChangeIsActive
                                                and bat.uid                =LCIA.uid ),
                                                        EMail AS --таблица с информацией о PartyCode!!! и почтовом адресе
                                                        (
                                                    select
                                                        aup.APPLICATION_USER_ID as UID      , -- ИД пользователя
                                                        AUP.PartyCode           as PartyCode, -- ИД
                                                        SPIS.ACTUAL_EMAIL       as EMail      -- e-mail пользователя
                                                    FROM
                                                        (
                                                            select
                                                                APPLICATION_USER_ID,
                                                                VALUE as PartyCode
                                                            FROM
                                                                 ORG.APPLICATION_USER_CLAIM
                                                            where
                                                                CLAIM_TYPE = 'PartyCode' ) AUP
                                                    inner join
                                                         ORG_IMPL.SERVICE_PROVIDER_INFO_SAT_LATEST SPIS
                                                    on
                                                        SPIS.PARTY_CODE = AUP.PartyCode ),
                                                            SPSL as --таблица для определения последнего закрепления пользователя за подразделением
                                                            (
                                                        select
                                                            SPISL.*
                                                        FROM
                                                            (
                                                                select
                                                                    SPISL.PARTY_CODE,
                                                                    max (SPISL.LOAD_DATE) as LOAD_DATE
                                                                FROM
                                                                     org_impl.service_provider_info_sat_latest SPISL
                                                                group by
                                                                    SPISL.PARTY_CODE ) LS
                                                        inner join
                                                             org_impl.service_provider_info_sat_latest SPISL
                                                        on
                                                            LS.PARTY_CODE =SPISL.PARTY_CODE
                                                        and ls.LOAD_DATE  =SPISL.LOAD_DATE ),
                                                                --для получения партнера и подразделения из запроса для отчёта
                                                                levels (organisation_unit_id, top_parent, level) as
                                                                (
                                                            select
                                                                oup.organisation_unit_id              ,
                                                                oup.organisation_unit_id as top_parent,
                                                                0                        as level
                                                            from
                                                                 org.organisation_unit oup
                                                            where
                                                                oup.parent_id is null
                                                            
                                                            union all
                                                            
                                                            select
                                                                ou.organisation_unit_id   ,
                                                                c.top_parent as top_parent,
                                                                level + 1    as level
                                                            from
                                                                 org.organisation_unit ou,
                                                                levels                c
                                                            where
                                                                ou.parent_id = c.organisation_unit_id ),
                                                                    --для получения партнера и подразделения из запроса для отчёта
                                                                    org_units as
                                                                    (
                                                                select
                                                                    ou.organisation_unit_id     as organisationUnitId          ,
                                                                    ou.organisation_unit_code   as organisationUnitCode        ,
                                                                    ousat.NAME                  as organisationUnitName        ,
                                                                    ousat.full_name             as organisationUnitFullName    ,
                                                                    ousat.code                  as organisationUnitBusinessCode,
                                                                    ou.parent_id                as parentId                    ,
                                                                    oup.organisation_unit_code  as parentCode                  ,
                                                                    oupsat.NAME                 as parentName                  ,
                                                                    oupsat.full_name            as parentFullName              ,
                                                                    oupsat.code                 as parentBusinessCode          ,
                                                                    oupt.organisation_unit_id   as topParentId                 ,
                                                                    oupt.organisation_unit_code as topParentCode               ,
                                                                    ouptsat.NAME                as topParentName               ,
                                                                    ouptsat.full_name           as topParentFullName           ,
                                                                    ouptsat.code                as topParentBusinessCode       ,
                                                                    l.level
                                                                from
                                                                     org.organisation_unit ou
                                                                join
                                                                    levels l
                                                                on
                                                                    ou.organisation_unit_id = l.organisation_unit_id
                                                                left join
                                                                     org_impl.organisation_unit_hub ouhub
                                                                on
                                                                    ou.organisation_unit_code = ouhub.organisation_unit_code
                                                                left join
                                                                     org_impl.organisation_unit_info_sat_latest ousat
                                                                on
                                                                    ouhub.organisation_unit_hkey = ousat.organisation_unit_info_hkey
                                                                left join
                                                                     org.organisation_unit oup
                                                                on
                                                                    oup.organisation_unit_id = ou.parent_id
                                                                left join
                                                                     org_impl.organisation_unit_hub ouphub
                                                                on
                                                                    oup.organisation_unit_code = ouphub.organisation_unit_code
                                                                left join
                                                                     org_impl.organisation_unit_info_sat_latest oupsat
                                                                on
                                                                    ouphub.organisation_unit_hkey = oupsat.organisation_unit_info_hkey
                                                                left join
                                                                     org.organisation_unit oupt
                                                                on
                                                                    oupt.organisation_unit_id = l.top_parent
                                                                left join
                                                                     org_impl.organisation_unit_hub oupthub
                                                                on
                                                                    oupt.organisation_unit_code = oupthub.organisation_unit_code
                                                                left join
                                                                     org_impl.organisation_unit_info_sat_latest ouptsat
                                                                on
                                                                    oupthub.organisation_unit_hkey = ouptsat.organisation_unit_info_hkey )
                                                                    select                    --таблица с данными о пользователях
                                                                        distinct au.NameUser, --логин
                                                                        FIO.FIO             , --ФИО
                                                                        Email.Email         , --адрес электронной почты
                                                                        DaysToChangePassword =
                                                                        case
                                                                        when
                                                                            au.NameUser in ('API_EFR',
                                                                                            'Migration',
                                                                                            'ELMA365',
                                                                                            'bitrix')
                                                                            and CP.LastChangePassword is null
                                                                        then
                                                                            180-DATEDIFF (day,au.DateCreateUser,GETDATE())-1
                                                                        when
                                                                            au.NameUser in ('API_EFR',
                                                                                            'Migration',
                                                                                            'ELMA365',
                                                                                            'bitrix')
                                                                            and CP.LastChangePassword is not null
                                                                        then
                                                                            180-DATEDIFF (day,CP.LastChangePassword,GETDATE())-1
                                                                        when
                                                                            LastChangePassword is null
                                                                        then
                                                                            60-DATEDIFF (day,au.DateCreateUser,GETDATE())-1
                                                                        else
                                                                            60-DATEDIFF (day,CP.LastChangePassword,GETDATE())-1
                                                                        end,
                                                                        ChangePasswordDay = FORMAT (
                                                                            (
                                                                                case
                                                                                when
                                                                                    au.NameUser in ('API_EFR',
                                                                                                    'Migration',
                                                                                                    'ELMA365',
                                                                                                    'bitrix')
                                                                                    and CP.LastChangePassword is null
                                                                                then
                                                                                    DATEADD(day,180-DATEDIFF (day,au.DateCreateUser,GETDATE())-1,GETDATE())
                                                                                when
                                                                                    au.NameUser in ('API_EFR',
                                                                                                    'Migration',
                                                                                                    'ELMA365',
                                                                                                    'bitrix')
                                                                                    and CP.LastChangePassword is not null
                                                                                then
                                                                                    DATEADD(day,180-DATEDIFF (day,CP.LastChangePassword,GETDATE())-1,GETDATE())
                                                                                when
                                                                                    LastChangePassword is null
                                                                                then
                                                                                    DATEADD(day,60-DATEDIFF (day,au.DateCreateUser,GETDATE())-1,GETDATE())
                                                                                else
                                                                                    DATEADD(day,60-DATEDIFF (day,CP.LastChangePassword,GETDATE())-1,GETDATE())
                                                                                end ), 'd', 'ru-ru' )
                                                                    from
                                                                        au
                                                                    left outer join --добавление информации по ролям
                                                                        UAR
                                                                    on
                                                                        au.UID = UAR.UID
                                                                    left outer JOIN --добавление наименование роли
                                                                         CFG.APPLICATION_ROLE ar
                                                                    on
                                                                        UAR.RID = ar.APPLICATION_ROLE_ID
                                                                    left outer JOIN --добавление наименование роли
                                                                        Status
                                                                    on
                                                                        au.UID = Status.UID
                                                                    left outer JOIN --добавление ФИО
                                                                        FIO
                                                                    on
                                                                        au.UID = FIO.UID
                                                                    left outer JOIN --добавление даты и времени последнего входа
                                                                        lastlogin
                                                                    on
                                                                        au.NameUser = lastlogin.NameUser
                                                                    left outer JOIN --добавление информации о последнем изменении пароля
                                                                        CP
                                                                    on
                                                                        au.UID = CP.UID
                                                                    left outer JOIN --добавление информации о неудачных входах
                                                                         org.login_status as LS
                                                                    on
                                                                        au.NameUser = ls.USERNAME
                                                                    left outer JOIN --добавление информации об электронной почте
                                                                        EMail
                                                                    on
                                                                        au.UID = EMail.UID
                                                                    where
                                                                        ar.CODE_NAME in ('Administrator',
                                                                                         'AllowExportCredit',
                                                                                         'OrganisationAdministrator',
                                                                                         'System',
                                                                                         'UserManager',
                                                                                         'SMGO',
                                                                                         'WTTJ')
                                                                    AND status.IsUserActive= 'True'
                                                                    and (
                                                                            LS.status<>1
                                                                            or LS.status is null)
                                                                    and
                                                                        case
                                                                        when
                                                                            au.NameUser in ('API_EFR',
                                                                                            'Migration',
                                                                                            'ELMA365',
                                                                                            'bitrix')
                                                                            and CP.LastChangePassword is null
                                                                        then
                                                                            180-DATEDIFF (day,au.DateCreateUser,GETDATE())-1
                                                                        when
                                                                            au.NameUser in ('API_EFR',
                                                                                            'Migration',
                                                                                            'ELMA365',
                                                                                            'bitrix')
                                                                            and CP.LastChangePassword is not null
                                                                        then
                                                                            180-DATEDIFF (day,CP.LastChangePassword,GETDATE())-1
                                                                        when
                                                                            LastChangePassword is null
                                                                        then
                                                                            60-DATEDIFF (day,au.DateCreateUser,GETDATE())-1
                                                                        else
                                                                            60-DATEDIFF (day,CP.LastChangePassword,GETDATE())-1
                                                                        end < 0;
            END
    END;
--EXEC [sp_getListExpiredPassword] @showBlocked = 1
--EXEC [sp_getListExpiredPassword] @showBlocked = 0
