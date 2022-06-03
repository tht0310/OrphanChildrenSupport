using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OrphanChildrenSupport.Services.Models.DBSets
{
    public class Report : EngineEntity
    {
        [ForeignKey("Account")]
        [Required]
        public long AccountId { get; set; }
        [ForeignKey("ChildrenProfile")]
        [Required]
        public long ChildrenProfileId { get; set; }
        public long? ApproverId { get; set; }
        public ReportStatus ReportStatus { get; set; }
        public ICollection<ReportDetail> ReportDetails { get; set; }
        public string Note { get; set; }
        #region  Foreign
        public Account Account { get; set; }
        public ChildrenProfile ChildrenProfile { get; set; }
        #endregion
    }
}
