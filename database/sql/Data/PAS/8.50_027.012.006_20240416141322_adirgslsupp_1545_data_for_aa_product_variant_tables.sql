INSERT INTO BFX_IMPL.AA_VARIANT
(CODE, CODE_DESCRIPTION)
VALUES
(N'VARIANT_1', N'Вариант 1'),
(N'VARIANT_2', N'Вариант 2')

INSERT INTO BFX_IMPL.AA_PRODUCT_VARIANT
(PRODUCT_CODE, VARIANT_CODE)
VALUES
(N'EBMGREINVEST', N'VARIANT_1'),
(N'EBMGREINVEST', N'VARIANT_2'),
(N'IDG1REINVEST', N'VARIANT_1'),
(N'IDG1REINVEST', N'VARIANT_2'),
(N'IDG3REINVEST', N'VARIANT_1'),
(N'IDG3REINVEST', N'VARIANT_2'),
(N'IDG5REINVEST', N'VARIANT_1'),
(N'IDG5REINVEST', N'VARIANT_2')
