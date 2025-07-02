using Adacta.AdInsure.Framework.Core.Web.API.Controllers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Net;
using RoutePrefix = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace Adacta.AdInsure.RGSL.MockServices.WebAPI
{
    /// <summary>
    /// Controller that simulates RGSL service implementation
    /// </summary>
    [RoutePrefix("api/rgsl/mock-services/sap-create-contract")]
    public class SapCreateContractServiceController : AIApiController
    {
		[AllowAnonymous]
		[Route("simulate")]
        [HttpPost]
        public IActionResult Simulate()
        {
            var body = Request.Body;
            using var sr = new StreamReader(body);
            var requestXmlText = sr.ReadToEnd();

            string responseXmlText = @"<soap-env:Envelope xmlns:soap-env=""http://schemas.xmlsoap.org/soap/envelope/"">
   <soap-env:Header/>
   <soap-env:Body>
      <n0:Zerluapi000000000100SrvcResponse xmlns:n0=""urn:sap-com:document:sap:soap:functions:mc-style"">
         <CtCustEntities/>
         <Epartnen>
            <Partnen>000000000</Partnen>
         </Epartnen>
         <ErfcPartner>
            <Partnen>000000000</Partnen>
            <Begdat/>
            <Rechtpk/>
            <Vorname/>
            <Partnn1/>
            <Partnn2/>
            <Natioid/>
            <Pargebn/>
            <Geburtd/>
            <Anredec/>
            <Rollenc/>
            <Enddat/>
            <Familic/>
            <Kommunt/>
            <Betriea/>
            <Berufco/>
            <Sterbed/>
            <Geschlk/>
            <Stcd1/>
            <Stcd2/>
            <Geburtl/>
            <Geburto/>
            <Crsreqd/>
            <Crsrecd/>
            <Crsuack/>
            <Crslecl/>
            <Crstaxk/>v
            <Fatreqd/>
            <Fatrecd/>
            <Fatuack/>
            <Fatlecl/>
            <Fattaxk/>
            <Algansy/>
            <Sprachc/>
            <Land1/>
            <Zzland1/>
            <ZzBirthplace/>
            <ZzNinn/>
            <ZzNameGenitiv/>
            <ZzOkonx/>
            <ZzKpp/>
            <ZzOkpo/>
            <ZzOgrn/>
            <Zzextpid/>
            <ZzPartnn1eng/>
            <ZzPartnn2eng/>
            <ZzVornameEng/>
            <Zztnum>00000</Zztnum>
            <Zzgrpbsns/>
            <Zzegripcode/>
            <Zzegripnumber/>
            <Zzegripdate/>
            <Zzsmsrecip/>
            <ZzIssueDate/>
            <ZzIssuer/>
            <ZzIssuer2/>
            <ZzNumber/>
            <Exteric/>
            <Externc/>
            <Zzaddress/>
            <ZzExtericOther/>
            <ZzMigrcard>00000000000</ZzMigrcard>
            <ZzSitizenship/>
            <ZzParnBig/>
            <ZzParnBigEn/>
            <ZzOgrnd/>
            <Zzofficialst>00</Zzofficialst>
            <Zzofficialtx/>
            <Zzbenowner/>
            <Zzriskassess>00</Zzriskassess>
            <Zzcustnum/>
            <Zzpurposer>00</Zzpurposer>
            <Zzallrelat>00</Zzallrelat>
            <Zzpurpfiecac>00</Zzpurpfiecac>
            <Zzfinsituat>00</Zzfinsituat>
            <Zzbusreput>00</Zzbusreput>
            <Zzfundsour>00</Zzfundsour>
            <Zzucsreg/>
            <Zzucsid/>
            <Zzmailrec/>
            <ZzBowherType>00</ZzBowherType>
            <Zzresidpermit>00000000000000000000</Zzresidpermit>
            <ZzdateChkP/>
            <ZzCauseChange>00</ZzCauseChange>
            <ZzRegAuthorityName/>
            <ZzAuthorizIssueDate/>
            <ZzAkatoCode>00</ZzAkatoCode>
            <ZzClientbankId/>
            <ZzLicense/>
            <ZzTin/>
         </ErfcPartner>
         <EtDoubletsAddress/>
         <EtPartnerList>
            <item>
               <Partnen>000258129</Partnen>
               <Vorname>Сергей</Vorname>
               <Partnn1>Анисимов</Partnn1>
               <Partnn2>Федорович</Partnn2>
               <Geburtd>22.03.1958</Geburtd>
               <Geschlk>1</Geschlk>
               <Familic/>
               <Natioid/>
               <Stcd1/>
               <Stcd2/>
               <Adressn>000296557</Adressn>
               <Stndflg/>
               <Land1>RU</Land1>
               <Postlei>628414</Postlei>
               <Strasn1>Крылова</Strasn1>
               <Hausnr>47/1</Hausnr>
               <Ortname>Сургут</Ortname>
               <Postfan>000000</Postfan>
               <Loeschk/>
               <Kreisco/>
               <Gebaudn/>
               <Tuer>38</Tuer>
               <Email>A90149@YANDEX.RU</Email>
               <Phone>+79199291672</Phone>
               <ZzOrtname>г</ZzOrtname>
               <ZzStrasn1>ул</ZzStrasn1>
               <ZzGebaudn/>
            </item>
         </EtPartnerList>
         <EtReturn>
            <item>
               <Msgty>W</Msgty>
               <Msgid>ZERL_API</Msgid>
               <Msgno>088</Msgno>
               <Msgv1>258129</Msgv1>
               <Msgv2>Сергей</Msgv2>
               <Msgv3>Анисимов</Msgv3>
               <Msgv4>Федорович</Msgv4>
               <Msgtext>Партнер 258129 Сергей Анисимов Федорович имеют такие же паспортные данные!</Msgtext>
            </item>
            <item>
               <Msgty>W</Msgty>
               <Msgid>ZERL_API</Msgid>
               <Msgno>039</Msgno>
               <Msgv1>258129</Msgv1>
               <Msgv2/>
               <Msgv3/>
               <Msgv4/>
               <Msgtext>Не было изменений для партнера: 258129</Msgtext>
            </item>
         </EtReturn>
         <EtRfcBankConnection/>
         <EtRfcContactPerson/>
         <EtRfcPartnerAddress/>
         <EtRfcPartnerCommunication/>
         <EtRfcPartnerRole/>
         <EtRfcPaymentMethod/>
         <EtRfcRoleExternalId/>
      </n0:Zerluapi000000000100SrvcResponse>
   </soap-env:Body>
</soap-env:Envelope>";

            return new ContentResult
            {
                Content = responseXmlText,
                ContentType = "application/xml",
                StatusCode = (int) HttpStatusCode.OK,
            };
        }
    }
}
