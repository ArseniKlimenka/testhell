update ud
   set ud.body = json_modify(ud.body, '$.partnerBusinessCode', json_value(c.body, '$.mainInsuranceConditions.partner.partnerBusinessCode'))
  from pas_impl.policy_hub ph
       join pas_impl.policy_verification_link pvl on pvl.policy_hkey = ph.policy_hkey
       join pas_impl.verification_hub vh on vh.verification_hkey = pvl.verification_hkey
       join pas.contract c on c.contract_number = ph.contract_number
       join bfx.universal_document ud on ud.universal_document_number = vh.verification_number