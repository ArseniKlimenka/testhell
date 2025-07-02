BEGIN TRY
BEGIN TRAN

-- ############### Some declarations
DECLARE @contractNumber nvarchar(max);

DECLARE cur_contract CURSOR LOCAL for
SELECT c.CONTRACT_NUMBER FROM PAS.CONTRACT c
LEFT JOIN PAS_IMPL.POLICY_HUB ph ON ph.CONTRACT_NUMBER = c.CONTRACT_NUMBER
LEFT JOIN PAS_IMPL.POLICY_SAT_LATEST ps ON ps.POLICY_HKEY = ph.POLICY_HKEY
WHERE ps.PRODUCT_CODE IN ('CAPCLCHILDOAS', 'CAPCLCHILDBOXOAS') AND JSON_QUERY(BODY, '$.declarationMedicalPolicyHolder') IS NULL
       
open cur_contract;

-- ############### Update contract body
fetch next from cur_contract into @contractNumber;
while @@FETCH_STATUS = 0 
BEGIN

	DECLARE @fullYear NVARCHAR(64) = (SELECT JSON_VALUE(BODY, '$.declarationMain[0].fullYear') fullYear FROM PAS.CONTRACT c
	WHERE CONTRACT_NUMBER = @contractNumber)

	DECLARE @productCode NVARCHAR(64) = (SELECT JSON_VALUE(BODY, '$.declarationMain[0].productCode') productCode FROM PAS.CONTRACT c
	WHERE CONTRACT_NUMBER = @contractNumber)

	DECLARE @declarationMedicalPolicyHolder NVARCHAR(MAX) = N'[
		{
		  "departament": "underwriting",
		  "itemNumber": "1",
		  "itemText": "Не являюсь и не являлся (не являлась) ранее инвалидом.",
		  "itemTextID": "57A16951-F6C0-4BE5-BF06-B6619A3D3029",
		  "agreement": true,
		  "fullYear": ' + CONVERT(nvarchar(max), @fullYear) + ',
		  "productCode": "' + @productCode + '"
		},
		{
		  "departament": "underwriting",
		  "itemNumber": "2",
		  "itemText": "Не подавал(а) документы на освидетельствование для получения группы инвалидности и не имею оснований для присвоения группы инвалидности.",
		  "itemTextID": "15BCD582-CB5E-4ED4-A02C-451D34406A97",
		  "agreement": true,
		  "fullYear": ' + CONVERT(nvarchar(max), @fullYear) + ',
		  "productCode": "' + @productCode + '"
		},
		{
		  "departament": "underwriting",
		  "itemNumber": "3",
		  "itemText": "Не употребляю и не употреблял(а) ранее наркотики, токсичные вещества, не страдаю алкоголизмом, не состою и не состоял(а) ранее на учете в наркологическом диспансере, психоневрологическом, туберкулезном диспансере, центрах профилактики борьбы со СПИДом.",
		  "itemTextID": "1F9E106D-7BAE-479B-A95D-F5C69EB93B23",
		  "agreement": true,
		  "fullYear": ' + CONVERT(nvarchar(max), @fullYear) + ',
		  "productCode": "' + @productCode + '"
		},
		{
		  "departament": "underwriting",
		  "itemNumber": "4",
		  "itemText": "Не имел(а), не обращался (не обращалась) за медицинской помощью по нижеперечисленным заболеваниям и не страдаю ими в настоящее время: <br>- доброкачественные или злокачественные опухоли; <br>- заболевания, вызванные воздействием радиации; <br>- СПИД и другие заболевания, связанные с вирусом иммунодефицита человека; <br>- нервные или психические расстройства или заболевания (например: эпилепсия, паралич, болезнь Паркинсона, наркомания; токсикомания, алкоголизм); заболевания или травма головного, или спинного мозга; <br>- заболевания сердечно-сосудистой системы (например: гипертоническая болезнь II-III степени, ишемическая болезнь сердца, стенокардия, инфаркт миокарда, порок сердца, нарушения сердечного ритма, инсульт, тромбоз); <br>- заболевания дыхательной системы (например: хроническая обструктивная болезнь легких, саркоидоз, туберкулез легких, астма (бронхит), эмфизема, фиброз); <br>- заболевания крови и кроветворной системы; <br>- заболевания почек (например: хроническая почечная недостаточность, поликистоз почек, гломерулонефрит); <br>- заболевания печени (цирроз печени, гепатит В, С, D, E); <br>- заболевания желудочно-кишечного тракта (за исключением пищевых отравлений, гастрита); <br>- заболевания эндокринной системы (например: тиреотоксикоз, сахарный диабет I-II типа, заболевания гипофиза); <br>- заболевания опорно-двигательного аппарата (например: артрит, артроз, анкилоз, деформация суставов или конечностей, подагра, заболевания позвоночника, ревматизм и/или генерализированные заболевания и/или расстройства, включая ревматоидный артрит, волчанка).",
		  "itemTextID": "B6D537C0-6368-451B-99A8-C93AA6763588",
		  "agreement": true,
		  "fullYear": ' + CONVERT(nvarchar(max), @fullYear) + ',
		  "productCode": "' + @productCode + '"
		},
		{
		  "departament": "underwriting",
		  "itemNumber": "5",
		  "itemText": "На протяжении последних 10 лет у меня отсутствовали следующие симптомы и/или изменения в состоянии здоровья: боли в груди, повышение артериального давления, повышение уровня холестерина в крови (требующее лечения от 3 недель и более), патологические изменения на ЭКГ, обмороки, потеря сознания, судорожные припадки, нарушение речи;",
		  "itemTextID": "536823AD-B30D-4F64-9FD4-A4AD369B31A1",
		  "agreement": true,
		  "fullYear": ' + CONVERT(nvarchar(max), @fullYear) + ',
		  "productCode": "' + @productCode + '"
		},
		{
		  "departament": "underwriting",
		  "itemNumber": "6",
		  "itemText": "На протяжении последних 12 месяцев я не подвергался (не подвергалась) хирургическим вмешательствам или не был(а) госпитализирован(а), за исключением госпитализации по причине: беременности и родов, аппендэктомии, грыжесечения, тонзилэктомии, аденоидэктомии, пункций околоносовых пазух, септопластики, геморроидэктомии, пластических операций, стоматологических операций;",
		  "itemTextID": "EDF5F5F4-2811-4046-AD4D-15851F743422",
		  "agreement": true,
		  "fullYear": ' + CONVERT(nvarchar(max), @fullYear) + ',
		  "productCode": "' + @productCode + '"
		},
		{
		  "departament": "underwriting",
		  "itemNumber": "7",
		  "itemText": "Не прохожу службу в вооруженных силах, не занят(а) в профессиональной или непрофессиональной авиации, в работах со взрывчатыми и радиоактивными веществами, подземных работах, не являюсь водолазом, пожарным, скалолазом, работником ядерной промышленности, нефтяником (за исключением офисных сотрудников), охранником и профессиональным спортсменом, не работаю с оружием;",
		  "itemTextID": "E463FBC1-A91E-4049-8EAE-B816E9604E1A",
		  "agreement": true,
		  "fullYear": ' + CONVERT(nvarchar(max), @fullYear) + ',
		  "productCode": "' + @productCode + '"
		},
		{
		  "departament": "underwriting",
		  "itemNumber": "8",
		  "itemText": "Не намереваюсь путешествовать на территории, на которой объявлено чрезвычайное положение или проводятся боевые действия.",
		  "itemTextID": "32DB3046-5205-43E5-A5C5-C85222B35135",
		  "agreement": true,
		  "fullYear": ' + CONVERT(nvarchar(max), @fullYear) + ',
		  "productCode": "' + @productCode + '"
		},
		{
		  "departament": "underwriting",
		  "itemNumber": "9",
		  "itemText": "Не нахожусь под следствием и не являюсь осужденным к лишению свободы.",
		  "itemTextID": "EF9533BC-6477-4E03-B13D-97A8D08779C9",
		  "agreement": true,
		  "fullYear": ' + CONVERT(nvarchar(max), @fullYear) + ',
		  "productCode": "' + @productCode + '"
		}
	  ]';

	UPDATE PAS.CONTRACT
    SET BODY = JSON_MODIFY(BODY, '$.declarationMedicalPolicyHolder', JSON_QUERY(@declarationMedicalPolicyHolder))
	WHERE @contractNumber = CONTRACT_NUMBER;

	fetch next from cur_contract into @contractNumber;
  
END;
close cur_contract;
deallocate cur_contract;

COMMIT TRAN
END TRY

BEGIN CATCH

    ROLLBACK TRAN
    DECLARE @ErrorMessage NVARCHAR(4000); DECLARE @ErrorSeverity INT; DECLARE @ErrorState INT;
    SELECT @ErrorMessage = ERROR_MESSAGE(), @ErrorSeverity = ERROR_SEVERITY(), @ErrorState = 1;
    RAISERROR (@ErrorMessage, @ErrorSeverity, @ErrorState);

END CATCH