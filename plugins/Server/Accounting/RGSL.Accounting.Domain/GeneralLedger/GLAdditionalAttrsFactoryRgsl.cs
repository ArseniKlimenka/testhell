using Adacta.AdInsure.Accounting.Domain.GeneralLedger;
using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.GeneralLedger
{
    public class GLAdditionalAttrsFactoryRgsl : LedgerAdditionalAttrsFactory
    {
        /// <summary>
        /// Creates a new <see cref="AdditionalAttributes"/> with empty values
        /// </summary>
        /// <returns>New instance of <see cref="AttributeValueSet"/></returns>
        public override LedgerAdditionalAttrs Create()
        {
            return new GLAdditionalAttrsRgsl();
        }

        /// <summary>
        /// Creates a new <see cref="AttributeValueSet"/> with values specified through a key-value collection
        /// </summary>
        /// <param name="values">Values to fill inside this new set</param>
        /// <returns>New instance of <see cref="AdditionalAttributes"/> with values from the passed dictionary</returns>
        public override LedgerAdditionalAttrs Create(IDictionary<string, object> values)
        {
            return new GLAdditionalAttrsRgsl(values);
        }
    }
}
