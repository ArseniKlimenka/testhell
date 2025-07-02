insert into pas_impl.verification_error_sat
(verification_error_hkey, load_date, record_source, hash_diff, error_code, error_description_full, error_description_short, error_type, error_class, is_deleted)
select vh.verification_hkey as VERIFICATION_ERROR_HKEY,
       vs.load_date,
       N'ADINSURE' as RECORD_SOURCE,
       sys_impl.MD5(  isnull(json_value(er.value, '$.attachmentErrorCode'), '')
                    + isnull(':' + json_value(er.value, '$.attachmentErrorDescriptionFull'), '')
                    + isnull(':' + json_value(er.value, '$.attachmentErrorDescriptionShort'), '')
                    + isnull(':' + json_value(er.value, '$.attachmentErrorTypeOfError'), '')
                    + isnull(':' + json_value(er.value, '$.attachmentErrorClassOfError'), '')
                    + '0'
                   ) as HASH_DIFF,
       json_value(er.value, '$.attachmentErrorCode') as ERROR_CODE,
       json_value(er.value, '$.attachmentErrorDescriptionFull') as ERROR_DESCRIPTION_FULL,
       json_value(er.value, '$.attachmentErrorDescriptionShort') as ERROR_DESCRIPTION_SHORT,
       json_value(er.value, '$.attachmentErrorTypeOfError') as ERROR_TYPE,
       json_value(er.value, '$.attachmentErrorClassOfError') as ERROR_CLASS,
       0 as IS_DELETED
  from pas_impl.verification_hub vh,
       pas_impl.verification_sat_latest vs,
       bfx.universal_document ud
       cross apply openjson(json_query(ud.body, '$.attachmentErrorArray')) er 
 where vh.verification_hkey = vs.verification_hkey
   and ud.universal_document_number = vh.verification_number
   and not exists (select * from pas_impl.verification_error_sat ves where ves.verification_error_hkey = vh.verification_hkey)