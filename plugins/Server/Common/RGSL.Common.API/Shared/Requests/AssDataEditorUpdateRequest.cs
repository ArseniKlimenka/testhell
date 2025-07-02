using System.Collections.Generic;

namespace Adacta.AdInsure.RGSL.Common.API.Shared.Requests
{
    public class AssDataEditorUpdateRequest
    {
        public IList<AssDataEditorUpdateRequestItem> TableUpdates { get; set; }
    }

    public class AssDataEditorUpdateRequestItem
    {
        public string TableName { get; set; }
        public string SetCondition { get; set; }
        public IList<string> Hkeys { get; set; }
    }
}
