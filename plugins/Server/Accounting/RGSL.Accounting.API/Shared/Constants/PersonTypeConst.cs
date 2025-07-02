using System;

namespace Adacta.AdInsure.RGSL.Accounting.API.Shared.Constants
{
    public static class PersonTypeConst
    {
        public const int NaturalPerson = 1;

        public const int LegalEntity = 2;

        public static int? GetPersonTypeId(string configurationCodeName)
        {
            switch(configurationCodeName)
            {
                case "NaturalPerson":
                    return NaturalPerson;
                case "LegalEntity":
                    return LegalEntity;
                case null:
                    return null;
                default:
                    throw new Exception($"Person type ({configurationCodeName}) does not exist.");
            }
        }
    }
}
