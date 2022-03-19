using System.Collections.Generic;

namespace OrphanChildrenSupport.Services.Models.DBSets
{
    public class SupportCategory : EngineEntity
    {
        public string Title { get; set; }
        public ICollection<ChildrenProfileSupportCategory> ChildrenProfileSupportCategories { get; set; }
    }
}
