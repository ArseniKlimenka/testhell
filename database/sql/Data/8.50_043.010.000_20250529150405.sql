IF EXISTS (SELECT * FROM sys.objects WHERE object_id = object_id(N'PTY_IMPL.PARTY_HUB') AND TYPE IN (N'U'))
BEGIN
    delete hist
    FROM
        BFX.ENTITY_HISTORY hist
    INNER JOIN
        BFX.ENTITY_REF ent ON ent.ENTITY_ID = hist.ENTITY_ID
    INNER JOIN
        CFX.PUBLISHED_ARTIFACT pub ON pub.PUBLISHED_ARTIFACT_ID = ent.PUBLISHED_ARTIFACT_ID
    INNER JOIN
        ORG.APPLICATION_USER users ON users.APPLICATION_USER_ID = hist.CHANGE_CAUSED_BY
    LEFT JOIN
        ORG.APPLICATION_USER_CLAIM partyCodeClaim ON partyCodeClaim.APPLICATION_USER_ID = users.APPLICATION_USER_ID AND partyCodeClaim.CLAIM_TYPE = 'PartyCode'
    LEFT JOIN
        PTY_IMPL.PARTY_HUB phub ON phub.PARTY_CODE = partyCodeClaim.VALUE
    LEFT JOIN
        PTY_IMPL.PARTY_INFO_SAT_LATEST pinfo ON pinfo.PARTY_INFO_HKEY = phub.PARTY_HKEY
    WHERE
        CODE_NAME in ('AccountingCertificate', 'AccountingCertificateCorrection')
        AND STATE_CHANGED = 1
        AND TRANSITION in ('Draft_to_Update', 'Update_to_Draft')
END