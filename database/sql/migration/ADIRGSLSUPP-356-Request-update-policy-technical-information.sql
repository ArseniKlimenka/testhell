UPDATE
    PAS.CONTRACT
SET
    BODY = JSON_MODIFY(
        JSON_MODIFY(
            JSON_MODIFY(
                JSON_MODIFY(
                    c.BODY,
                    '$.technicalInformation.requestState',
                    rqtS.REQUEST_STATE
                ),
                '$.technicalInformation.requestAmendmentReason',
                rqtS.AMENDMENT_REASON
            ),
            '$.technicalInformation.requestId',
            LOWER(convert(nvarchar(36), ud.UNIVERSAL_DOCUMENT_ID))
        ),
        '$.technicalInformation.requestNumber',
        ud.UNIVERSAL_DOCUMENT_NUMBER
    )
FROM
    bfx.UNIVERSAL_DOCUMENT ud
    LEFT JOIN cfg.PROCESS_STATE psU on ud.STATE_ID = psU.PROCESS_STATE_ID
    LEFT JOIN UNI_IMPL.RQT_HUB rqtH ON rqtH.REQUEST_NUMBER = ud.UNIVERSAL_DOCUMENT_NUMBER
    LEFT JOIN UNI_IMPL.RQT_SAT_LATEST rqtS on rqtS.RQT_HKEY = rqtH.RQT_HKEY
    LEFT JOIN pas.CONTRACT c on c.ORIGINAL_DOCUMENT_ID = (
        SELECT
            ORIGINAL_DOCUMENT_ID
        FROM
            pas.CONTRACT
        WHERE
            CONTRACT_NUMBER = rqtS.CONTRACT_NUMBER
    )
    LEFT JOIN cfg.PROCESS_STATE psC on c.STATE_ID = psC.PROCESS_STATE_ID
WHERE
    psU.CODE_NAME = 'ISSUED'
    AND (
        c.VERSION_STATE = 'Applied'
        OR c.VERSION_STATE IS NULL
    )
    AND c.SEQ_NUMBER != 0
    AND rqtS.TYPE_OF_REQUEST = 'Cancellation'
    AND JSON_VALUE(c.BODY, '$.technicalInformation.requestNumber') IS NULL