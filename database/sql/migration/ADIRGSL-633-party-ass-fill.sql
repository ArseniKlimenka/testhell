insert into pty_impl.party_bank_accounts_sat
(party_bank_accounts_hkey, load_date, record_source, hash_diff, bank_account, correspondent_account, bicswift, bic, swift, iban, currency_code, opening_date, closing_date, is_deleted)
select ph.party_hkey,
       pisl.load_date,
       N'ADINSURE',
       CONVERT(CHAR(32), HashBytes('MD5', cast(newid() as varbinary(max))), 2),
       json_value(ba.value, '$.number'),
       json_value(ba.value, '$.bankCorrespondentAccount'),
       isnull(json_value(ba.value, '$.bankBic'), json_value(ba.value, '$.SWIFT')),
       json_value(ba.value, '$.bankBic'),
       json_value(ba.value, '$.SWIFT'),
       json_value(ba.value, '$.IBAN'),
       json_value(ba.value, '$.currency.currencyCode'),
       json_value(ba.value, '$.openingDate'),
       json_value(ba.value, '$.closingDate'),
       0
  from pty_impl.party_hub ph,
       pty_impl.party_info_sat_latest pisl,
       pty.party p
       cross apply openjson(json_query(p.body, '$.partyBankAccounts')) ba
 where p.party_code = ph.party_code
   and ph.party_hkey = pisl.party_info_hkey
   and not exists (select * from pty_impl.party_bank_accounts_sat pbas where pbas.party_bank_accounts_hkey = ph.party_hkey)
GO

insert into pty_impl.party_addresses_sat
(party_addresses_hkey, load_date, record_source, hash_diff, address_type_code, full_address, actual_from, actual_to, is_deleted)
select ph.party_hkey,
       pisl.load_date,
       N'ADINSURE',
       CONVERT(CHAR(32), HashBytes('MD5', cast(newid() as varbinary(max))), 2),
       json_value(pa.value, '$.addressType.addressTypeCode'),
       json_value(pa.value, '$.fullAddress.value'),
       isnull(json_value(pa.value, '$.actualFrom'), '1900-01-01'),
       isnull(json_value(pa.value, '$.actualTo'), '2999-12-31'),
       0
  from pty_impl.party_hub ph,
       pty_impl.party_info_sat_latest pisl,
       pty.party p
       cross apply openjson(json_query(p.body, '$.partyAddresses')) pa
 where p.party_code = ph.party_code
   and ph.party_hkey = pisl.party_info_hkey
   and not exists (select * from pty_impl.party_addresses_sat pas where pas.party_addresses_hkey = ph.party_hkey)
GO

insert into pty_impl.party_documents_sat
(party_documents_hkey, load_date, record_source, hash_diff, doc_type_code, issue_date, expire_date, doc_series, doc_number, issuer_name, is_deleted)
select ph.party_hkey,
       pisl.load_date,
       N'ADINSURE',
       CONVERT(CHAR(32), HashBytes('MD5', cast(newid() as varbinary(max))), 2),
       json_value(pd.value, '$.docType.docTypeCode'),
       json_value(pd.value, '$.issueDate'),
       json_value(pd.value, '$.expireDate'),
       json_value(pd.value, '$.docSeries'),
       json_value(pd.value, '$.docNumber'),
       json_value(pd.value, '$.issuerName'),
       0
  from pty_impl.party_hub ph,
       pty_impl.party_info_sat_latest pisl,
       pty.party p
       cross apply openjson(json_query(p.body, '$.partyDocuments')) pd
 where p.party_code = ph.party_code
   and ph.party_hkey = pisl.party_info_hkey
   and not exists (select * from pty_impl.party_documents_sat pds where pds.party_documents_hkey = ph.party_hkey)
GO