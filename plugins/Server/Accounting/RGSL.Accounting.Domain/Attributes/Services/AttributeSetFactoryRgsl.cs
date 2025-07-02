using System.Collections.Generic;
using Adacta.AdInsure.Accounting.Domain.Attributes;
using Adacta.AdInsure.Accounting.Domain.Attributes.Services;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.Attributes.Services
{
    public class AttributeSetFactoryRgsl : AttributeSetFactory
    {
        /// <summary>
        /// Creates a new <see cref="AttributeValueSetRgsl"/> with empty values
        /// </summary>
        /// <param name="purposeId"> Attribute value set purpose id</param>
        /// <returns>New instance of <see cref="AttributeValueSetRgsl"/></returns>
        public override AttributeValueSet CreateValueSet(int purposeId)
        {
            return new AttributeValueSetRgsl { PurposeId = purposeId };
        }

        /// <summary>
        /// Creates a new <see cref="AttributeValueSetRgsl"/> with values specified through a key-value collection
        /// </summary>
        /// <param name="values">Values to fill inside this new set</param>
        /// <returns>New instance of <see cref="AttributeValueSetRgsl"/> with values from the passed dictionary</returns>
        public override AttributeValueSet CreateValueSet(IDictionary<string, object> values)
        {
            return new AttributeValueSetRgsl(values);
        }
    }
}
