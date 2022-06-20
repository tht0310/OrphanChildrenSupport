using System.Collections.Generic;

namespace OrphanChildrenSupport.Services.Models.DBSets
{
    public class ReportFieldCategory : EngineEntity
    {
        public string Title { get; set; }

        public ICollection<ReportDetail> ReportDetails { get; set; }
    }
}
