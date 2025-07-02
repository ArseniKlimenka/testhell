using Adacta.AdInsure.Accounting.Infrastructure.Attributes.Queries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Adacta.AdInsure.RGSL.Accounting.Infrastructure.Attributes
{
    public class AttributeQueriesRgsl : AttributeQueries
    {
        /// <summary>
        /// Generates insert statement for <see cref="AttributeValueSet"/> specific data (only ACC.ATTRIBUTE_VALUE_SET).
        /// </summary>
        /// <returns>SQL query</returns>
        public override string Insert_AttributeValueSet()
        {
            return @"
insert into
	ACC.ATTRIBUTE_VALUE_SET(VALUE_SET_HASH,AVS_PURPOSE_ID,IS_LIFE)
values
	(@Hash,@PurposeId,@IsLife)";
        }

        /// <summary>
        /// Generates select statement for <see cref="AttributeValueSet"/> specific data by provided hash column value(only ACC.ATTRIBUTE_VALUE_SET).
        /// </summary>
        /// <returns>SQL query</returns>
        public override string Select_AttributeValueSetByHash()
        {
            return @"
select 
	av.ATTRIBUTE_VALUE_SET_ID as Id,
	av.VALUE_SET_HASH as Hash,
    av.AVS_PURPOSE_ID as PurposeId,
    av.IS_LIFE as IsLife
from
	ACC.ATTRIBUTE_VALUE_SET av
where
	av.VALUE_SET_HASH=@hash 
and @purposeId = av.AVS_PURPOSE_ID";
        }

        /// <summary>
        /// Generates select statement for <see cref="AttributeValueSet"/> specific data by provided primary key value.
        /// </summary>
        /// <returns>SQL query</returns>
        public override string Select_AttributeValueSetById()
        {
            return @"
select
    av.ATTRIBUTE_VALUE_SET_ID as Id,
    av.VALUE_SET_HASH as Hash,
    av.AVS_PURPOSE_ID as PurposeId,
    av.IS_LIFE as IsLife
from
    ACC.ATTRIBUTE_VALUE_SET av
where
    av.ATTRIBUTE_VALUE_SET_ID = @valueSetId";
        }

    
    }
}
