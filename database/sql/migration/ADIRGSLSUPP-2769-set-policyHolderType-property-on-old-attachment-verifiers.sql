update ud
   set ud.body = json_modify(ud.body,
                             '$.policyHolderType',
                             pisl.configuration_code_name)
  from pty_impl.party_hub ph
    join pty_impl.party_info_sat_latest pisl on ph.party_hkey = pisl.party_info_hkey
    join bfx.universal_document ud on json_value(ud.body, '$.policyHolderCode') = ph.party_code and json_value(ud.body, '$.policyHolderType') is null
    join cfx.published_artifact pa on pa.published_artifact_id = ud.published_artifact_id and pa.code_name = N'LifeInsuranceAttachmentVerification'
