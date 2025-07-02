IF EXISTS (SELECT * FROM SYS.OBJECTS WHERE OBJECT_ID = OBJECT_ID(N'[PAS].[CONTRACT]') AND TYPE IN (N'U'))
BEGIN

    UPDATE PAS.CONTRACT
    SET BODY = JSON_MODIFY(
                BODY,
                '$.productConfiguration.additionalServices',
                JSON_QUERY(
                    (
                        SELECT '[' + STRING_AGG('"' + JSON_VALUE(value, '$.serviceCode') + '"', ',') + ']'
                        FROM OPENJSON(JSON_QUERY(BODY, '$.productConfiguration.additionalServices'))
                        WHERE JSON_VALUE(value, '$.serviceCode') IS NOT NULL
                    )
                )
            )
    WHERE ISJSON(BODY) = 1
    AND ISJSON(JSON_QUERY(BODY, '$.productConfiguration.additionalServices')) = 1
    AND JSON_VALUE(JSON_QUERY(BODY, '$.productConfiguration.additionalServices'), '$[0].serviceCode') IS NOT NULL;

    UPDATE PAS.CONTRACT
    SET SNAPSHOT_BODY = JSON_MODIFY(
                SNAPSHOT_BODY,
                '$.productConfiguration.additionalServices',
                JSON_QUERY(
                    (
                        SELECT '[' + STRING_AGG('"' + JSON_VALUE(value, '$.serviceCode') + '"', ',') + ']'
                        FROM OPENJSON(JSON_QUERY(SNAPSHOT_BODY, '$.productConfiguration.additionalServices'))
                        WHERE JSON_VALUE(value, '$.serviceCode') IS NOT NULL
                    )
                )
            )
    WHERE ISJSON(SNAPSHOT_BODY) = 1
    AND ISJSON(JSON_QUERY(SNAPSHOT_BODY, '$.productConfiguration.additionalServices')) = 1
    AND JSON_VALUE(JSON_QUERY(SNAPSHOT_BODY, '$.productConfiguration.additionalServices'), '$[0].serviceCode') IS NOT NULL;

    UPDATE PAS.CONTRACT
    SET COMMON_BODY = JSON_MODIFY(
                COMMON_BODY,
                '$.attributes.productConfigurationData.additionalServices',
                JSON_QUERY(
                    (
                        SELECT '[' + STRING_AGG('"' + JSON_VALUE(value, '$.serviceCode') + '"', ',') + ']'
                        FROM OPENJSON(JSON_QUERY(COMMON_BODY, '$.attributes.productConfigurationData.additionalServices'))
                        WHERE JSON_VALUE(value, '$.serviceCode') IS NOT NULL
                    )
                )
            )
    WHERE ISJSON(COMMON_BODY) = 1
    AND ISJSON(JSON_QUERY(COMMON_BODY, '$.attributes.productConfigurationData.additionalServices')) = 1
    AND JSON_VALUE(JSON_QUERY(COMMON_BODY, '$.attributes.productConfigurationData.additionalServices'), '$[0].serviceCode') IS NOT NULL;

END
GO

