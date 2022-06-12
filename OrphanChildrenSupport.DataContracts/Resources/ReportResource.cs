using OrphanChildrenSupport.Services.Models;
using OrphanChildrenSupport.Services.Models.DBSets;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace OrphanChildrenSupport.DataContracts
{
    public class ReportResource : EngineEntity
    {
        [Required]
        public long AccountId { get; set; }
        [Required]
        public long ChildrenProfileId { get; set; }
        public long? ApproverId { get; set; }
        public ReportStatus ReportStatus { get; set; }
        public string Note { get; set; }
        public ICollection<ReportDetailResource> ReportDetails { get; set; }
    }
}
