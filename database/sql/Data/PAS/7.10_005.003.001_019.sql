DELETE FROM BFX_IMPL.COUNTRY_REF
 WHERE COUNTRY_CODE IN (N'998', N'999')
INSERT INTO BFX_IMPL.COUNTRY_REF
(COUNTRY_CODE, COUNTRY_SHORT_NAME, COUNTRY_FULL_NAME, ALFA_2, ALFA_3, IS_OBSOLETE)
VALUES
(N'998',N'РСФСР',N'Российская Советская Федеративная Социалистическая Республика',N'98',N'998', 1),
(N'999',N'СССР',N'Союз Советских Социалистических Республик',N'99',N'999', 1)
GO