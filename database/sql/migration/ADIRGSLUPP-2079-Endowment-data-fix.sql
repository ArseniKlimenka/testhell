update EWT_IMPL.ENDOWMENT_INQUIRY_SAT 
   set CONTRACT_CONF_CODE_NAME = json_value(ud.COMMON_BODY, '$.contractConfigurationCodeName')
  from EWT_IMPL.ENDOWMENT_INQUIRY_HUB endowmentInquiryHub
       join EWT_IMPL.ENDOWMENT_INQUIRY_SAT endowmentInquirySat on endowmentInquirySat.ENDOWMENT_INQUIRY_HKEY = endowmentInquiryHub.ENDOWMENT_INQUIRY_HKEY
	   join BFX.UNIVERSAL_DOCUMENT ud on endowmentInquiryHub.INQUIRY_NUMBER = ud.UNIVERSAL_DOCUMENT_NUMBER