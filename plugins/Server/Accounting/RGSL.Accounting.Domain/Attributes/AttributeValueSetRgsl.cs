using Adacta.AdInsure.Accounting.Domain.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Adacta.AdInsure.RGSL.Accounting.Domain.Attributes
{
    public class AttributeValueSetRgsl : AttributeValueSet
    {
        private static readonly PropertyInfo<bool?> IsLifeProperty = RegisterProperty((AttributeValueSetRgsl a) => a.IsLife);

        /// <summary>
        /// Concrete attributes configured through ACC.ATTRIBUTE_DEFINITION - all must be nullable!DocumentNo property.
        /// </summary>
        public bool? IsLife
        {
            get { return GetValue(IsLifeProperty); }
            set { SetValue(IsLifeProperty, value); }
        }

        public AttributeValueSetRgsl()
            : base()
        {
        }

        public AttributeValueSetRgsl(IDictionary<string, object> values)
            : base(values)
        {
        }


        /// <summary>
        /// Should return the string representing the current state of this objects - used further on in our hashing function and when collisions are present
        /// </summary>
        /// <returns>String in appropriate format ready for hashing</returns>
        public override string GetStringRepresentation()
        {
            return string.Join(";", string.Empty,                                    
                                    IsLife).TrimEnd(';');
        }
    }
}
