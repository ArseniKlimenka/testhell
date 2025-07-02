update mig
    set mig.VERSION_STATE = case
								when st.CODE_NAME  = 'Issued' then 'Applied'
								when st.CODE_NAME = 'Cancelled' then 'Discarded'
								else null
							end
from bfx.UNIVERSAL_VERSIONED_DOCUMENT mig
join bfx.UNIVERSAL_DOCUMENT orig on orig.UNIVERSAL_DOCUMENT_ID = mig.UNIVERSAL_VERSIONED_DOCUMENT_ID
join cfg.PROCESS_STATE st on st.PROCESS_STATE_ID = orig.STATE_ID
join cfx.PUBLISHED_ARTIFACT art on orig.PUBLISHED_ARTIFACT_ID = art.PUBLISHED_ARTIFACT_ID
where art.CODE_NAME in ('AccountingCertificate', 'AccountingCertificateCorrection')