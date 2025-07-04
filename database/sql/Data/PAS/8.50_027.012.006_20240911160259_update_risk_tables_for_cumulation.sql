-- Update CODE_DESCRIPTION for RISK_GROUP
UPDATE PAS_IMPL.CUMULATION_RISK_GROUP
 SET CODE_DESCRIPTION = N'Смерть ЛП + Смерть ЛП ОУСВ + Смерть ЛП ОтлВ + Смерть НС + Смерть ТП + Смерть ДТП'
 WHERE CODE = 'DLPWNSTPDTP'

-- Clear table
TRUNCATE TABLE PAS_IMPL.CUMULATION_RISK_GROUP_RELATION

-- Fill table
INSERT INTO PAS_IMPL.CUMULATION_RISK_GROUP_RELATION
   (ID, GROUP_CODE, RISK_CODE)
VALUES
    (N'4DC542D4-31A8-4C70-80A1-0052EA5035AD', N'DLPW', N'DLPW36404'),
    (N'1302C2A8-3E87-4C31-9D7D-013082E98DBC', N'DI', N'D36404'),
    (N'2AC964A2-7172-4B5B-9038-0163D85E2824', N'DI', N'DA36404'),
    (N'56F80C85-32D9-494C-8405-036FB0D04CEE', N'INJ', N'IH36404'),
    (N'4A8091FA-17EF-4085-ADCF-0747CD70CEEC', N'DLPW', N'DLP36404'),
    (N'3877AA69-F3AE-4FC4-82B0-0C5182A1FFA6', N'DLPWNSTPDTP', N'DNS36404'),
    (N'B1B5AE10-9DB9-472B-BC7F-0CF202F81548', N'DLPWNSTPDTP', N'DDTP36404'),
    (N'C62367BA-DDAF-4DDF-B3DD-10957DD66E6A', N'INJ', N'HI36404'),
    (N'CEE2A086-C21A-4A41-87E2-14D372EE2633', N'DNSVV', N'DNSVV36404'),
    (N'FBD79122-46CA-44C0-9896-160F6AC67206', N'DLPWNSTPDTP', N'DTP36404'),
    (N'72653193-CE0D-4706-A23E-16119D741F2D', N'CDH', N'CDHR10800'),
    (N'39D5716D-8D62-490C-8B47-192AD4D9B74F', N'CDH', N'CDHW10800'),
    (N'90298235-A14B-4B32-B161-19E9BEE01D1E', N'DLPWNSTPDTP', N'DNS36102'),
    (N'15D68684-39F4-44CC-98B8-1A6639E80F46', N'DI', N'DA36102'),
    (N'02ACDB3C-1B2F-4714-ADFB-1B0DF22428C0', N'CDH', N'CDH10800'),
    (N'02597FC4-1029-4388-AD04-1DDE82A6EDFA', N'DI', N'D36102'),
    (N'BF2B0452-2491-4219-A894-1E28BFCA37C5', N'DLPW', N'DLP42204'),
    (N'FCF6A5AF-E09F-4761-A93E-1EEE6D88D419', N'DI', N'D42204'),
    (N'3AC6BB94-0CDC-4260-8A30-22A23B9766B0', N'DLPWNSTPDTP', N'DNS42204'),
    (N'8B097996-7A1E-4AFB-94B1-22ABDACE8EF8', N'DLPWNSTPDTP', N'DTP42204'),
    (N'C981C7A9-65C2-4A9F-8C1D-24AC092B506F', N'INJ', N'I42204'),
    (N'01D5F238-085B-423C-B9B1-266744246386', N'DLPWNSTPDTP', N'DLPW36404'),
    (N'720765FB-9831-4821-BB5B-2875ED9DC80D', N'DLPWNSTPDTP', N'DLP36404'),
    (N'336E0EBD-3883-4C49-9ADE-28943ADCA49E', N'DLPWNSTPDTP', N'DLP42204'),
    (N'D36F24F0-D860-4C72-8FCE-2953D7DFD9C5', N'DNSVV', N'DNS36404'),
    (N'963F1B23-F209-4F77-9D79-29A21368A6A0', N'DNSVV', N'DNS36102'),
    (N'B37C8CE8-1154-46CA-8B71-2AB51EEAAD79', N'DNSVV', N'DNS42204'),
    (N'E18F9484-1B1A-4FA9-AC4B-2C37A230066A', N'TPDTP', N'DTP36404'),
    (N'C28DF05F-B052-40EC-8192-2F06CA0AD029', N'TPDTP', N'DTP42204'),
    (N'206D7882-D8A3-4E55-B2E9-2F85366B6975', N'TPDTP', N'DDTP36404'),
    (N'49F6E7CF-A1B1-4858-AC94-301B6077386F', N'DLPWNSTPDTP', N'DLPDPE36404'),
    (N'039CE389-B0FB-422B-8EED-315A4D9CBFFA', N'DLPW', N'DLPSS36404'),
    (N'19CC614C-656F-4181-A038-33B807401E27', N'DLPW', N'DLPSS36102'),
    (N'2E12B1C3-6775-4650-98C4-355134E393E6', N'INJ', N'HI36102'),
    (N'33732006-BF4E-4249-9AEB-3C91CF14AB75', N'DLPWNSTPDTP', N'DLPSS36404'),
    (N'2EA0A577-2FA9-4ADF-938C-3F2A04E828CD', N'DI', N'DVV36404'),
    (N'5924695F-8BE6-49EF-8773-4062A01A2A9C', N'DI', N'DAVV36404'),
    (N'D4E31BBE-FAAF-4198-8B77-449B407586D9', N'DI', N'DASS36404'),
    (N'9208F82F-77F1-4EF1-BF68-44A10B9E2172', N'DLPW', N'DLP242204'),
    (N'1939A7A7-3A41-4AA9-8DE3-4594CD4EA822', N'DLPW', N'DLPT33102'),
    (N'91F158D0-8663-4876-8949-46A896DA47E7', N'DLPW', N'DLPW33102'),
    (N'72F6FA62-791C-4392-B7D7-4AF60D794ECE', N'DLPW', N'DLP36102'),
    (N'6CB27522-06A5-46F0-AF1B-4D477A2CB949', N'DLPW', N'DLPW36102'),
    (N'FD12622B-0D95-40FE-923D-5708ABFA82E4', N'DLPW', N'DLP31102'),
    (N'F1334E9D-3671-4DAB-9D91-583138D361D5', N'DLPW', N'DLP33102'),
    (N'E1469A43-C75F-4B90-8636-5E74847FAB85', N'DLPWNSTPDTP', N'DLP242204'),
    (N'8253074D-B062-4874-8CFA-5E83D34A20AD', N'DLPWNSTPDTP', N'DLPT33102'),
    (N'85BF0D2E-EACF-426C-A241-5F6A88E3FB72', N'DLPWNSTPDTP', N'DLPW33102'),
    (N'F0C87D6F-F101-48B9-A650-660CF3CD066D', N'DLPWNSTPDTP', N'DLP36102'),
    (N'4B1825EC-5DB7-4EB6-A3A7-66249BAEAC0B', N'DLPWNSTPDTP', N'DLPW36102'),
    (N'FBDA13F0-9638-4D22-8CD1-6681C827DE6A', N'DLPWNSTPDTP', N'DLP31102'),
    (N'8A7D2272-B690-44CA-B8A9-68EAE55E01C4', N'DLPWNSTPDTP', N'DLP33102'),
    (N'54B404D4-1EA9-47AB-87B2-6EABB1EC4C1E', N'DLPWNSTPDTP', N'DLPSS36102'),
    (N'A1D7A076-0F02-4959-8B8B-744480531F3C', N'TPDTP', N'DDTP36102'),
    (N'B4F76403-DE40-4AFB-A6C6-789D3857DF05', N'TPDTP', N'DTP36102'),
    (N'AC9C70F7-2EF9-4650-B044-7E9DBAB3C3E8', N'TPDTP', N'DTP33102'),
    (N'07D11742-8F12-46FB-A228-8074002DF35B', N'TPDTP', N'DAT36102'),
    (N'A2637B00-53B7-4A92-A08F-87B87641FCB7', N'TPDTP', N'DDTPA36102'),
    (N'29EE754D-12E0-44B5-BEC9-87FEC33EBFED', N'DLPWNSTPDTP', N'DDTP36102'),
    (N'2486ABFD-2320-4E6C-8EC7-8833DC1FC211', N'DLPWNSTPDTP', N'DTP36102'),
    (N'72864FAA-AED1-4F37-ACBB-88DA2E708CF3', N'DLPWNSTPDTP', N'DTP33102'),
    (N'BD602F52-A7E8-4781-87FE-8E58663D9382', N'DLPWNSTPDTP', N'DAT36102'),
    (N'4663FB52-F83A-483E-8428-8F2BEB117560', N'DLPWNSTPDTP', N'DDTPA36102'),
    (N'615C4FE0-6423-49E7-A786-90C8DF91ACC0', N'DNSVV', N'DA20700'),
    (N'7385F513-C9E9-4BA7-80A1-92AC068AE37C', N'DNSVV', N'DNS33102'),
    (N'4D5C60F6-BAEA-428E-9DA2-A68DFDE4E544', N'DNSVV', N'DNS336102'),
    (N'50309840-4D59-45EF-B3BF-A7F99836452E', N'DNSVV', N'DADP36102'),
    (N'B34FC5E1-EC6D-4DF4-8B2E-AAAC6E629579', N'DNSVV', N'DNS3C36102'),
    (N'1D719586-A9D3-4B5E-91BD-AAEE7C8DEDC9', N'DNSVV', N'DAT36904'),
    (N'6AE09B42-8A5A-47E5-A372-B14B5316EE06', N'DNSVV', N'DA36202'),
    (N'BB4CA506-5DF2-40A0-B276-B5801F8D5306', N'DLPWNSTPDTP', N'DA20700'),
    (N'EB48C794-0624-45B8-865E-B5BAADF37818', N'DLPWNSTPDTP', N'DNS33102'),
    (N'EFAB4801-1072-40CA-A443-B8F6AA9E93D5', N'DLPWNSTPDTP', N'DNS336102'),
    (N'7C56A9B1-85C5-4B13-A999-BA0F8A70D871', N'DLPWNSTPDTP', N'DADP36102'),
    (N'43E27D2B-087D-44B4-9FC2-BA7B75D86245', N'DLPWNSTPDTP', N'DNS3C36102'),
    (N'8ECFF34C-96A9-4EB7-907E-BCB0F9C36583', N'DLPWNSTPDTP', N'DNSVV36404'),
    (N'58465CBF-4986-42CF-B20D-C3B87DB8CC5D', N'DLPWNSTPDTP', N'DAT36904'),
    (N'88672ABA-C678-4DF2-8FAB-C582BDC56872', N'DLPWNSTPDTP', N'DA36202'),
    (N'FEAAA7BA-63CD-4808-8CFD-C69321F44766', N'CDH', N'CDH210800'),
    (N'61E087E9-2F88-4CF9-B6BC-C6F7E80D52FE', N'DI', N'DC123A20700'),
    (N'1BCF3525-A626-49D5-B02E-CA58A32B51BB', N'INJ', N'I20700'),
    (N'045A9964-5B28-4A91-849E-CA7305A9D0D1', N'DI', N'D12IW20700'),
    (N'3BE21C04-5FAE-447E-8E90-CB37E513ABCF', N'DI', N'D12IW33102'),
    (N'F9842889-365E-4B4F-B8EF-D01770D952FF', N'DI', N'DAIW33102'),
    (N'8D2B8F1B-1B89-4B98-98C2-D1E77FA47A27', N'DI', N'DC12A36102'),
    (N'96B96407-37A5-4667-BB74-D3F29ED0BDCB', N'DI', N'D123A36102'),
    (N'240C4284-EE45-4EFF-BF16-D5B4752F0BEC', N'DI', N'D12IW36102'),
    (N'B518F3F7-7F3B-48C1-B2A6-D727630A647E', N'DI', N'D12AI36102'),
    (N'4172F4F6-D2D9-461C-8B85-D756D88B958E', N'DI', N'D12LP3A36102'),
    (N'E0D1804C-CFB9-48B1-9021-DAD56E111B3E', N'INJ', N'I36102'),
    (N'A4E3418F-FFBE-45CF-9794-DE337182891A', N'DI', N'DCA36102'),
    (N'1F60DC8A-1905-4C34-9756-DFE5BB77373D', N'DI', N'DCA33102'),
    (N'E6F908AA-0132-4E43-B680-E27094AC768D', N'INJ', N'I33102'),
    (N'9EDDE695-4A1F-4CB4-B83F-E3EF8F2AF50F', N'DI', N'D12A36102'),
    (N'54988E7D-4F81-42CB-952A-E606E920BD9F', N'DI', N'D12A33102'),
    (N'81E26D02-3DDA-4EB9-947F-EDEC18C12EE5', N'DI', N'DC12A33102'),
    (N'C59AD27B-030E-471B-8AC4-F197185645A9', N'DI', N'D1A36102'),
    (N'F290058D-8106-4836-9B6D-F48F1DBF9D99', N'DI', N'DAIA36102'),
    (N'592BF6AA-5AE6-4BF2-9FCE-F7D39C56A79B', N'DI', N'DAIW36102'),
    (N'F5239587-AAD0-4D4D-BC2C-F7E9958B98F0', N'DI', N'DC123A36102'),
    (N'D8F971FD-8CCF-4FA1-B973-FA033A0990BC', N'DI', N'DC123AI36102'),
    (N'E62FD14D-7FD3-4889-9365-FA0B98E95F88', N'DI', N'DCAI36102'),
    (N'A3FBDFB5-87C1-41C0-A10C-FBF6427F35B2', N'DI', N'D12AI36404'),
    (N'4DDF0D41-32ED-49E4-8661-FD9305B50745', N'DI', N'DC123A36202'),
    (N'34D17ED6-1779-4674-AF4E-FDBE6826ED8A', N'INJ', N'I36202'),
    (N'012730A8-C2C9-4BDB-9B23-FDD5A7A32A09', N'DLPW', N'DLPDPE36404')