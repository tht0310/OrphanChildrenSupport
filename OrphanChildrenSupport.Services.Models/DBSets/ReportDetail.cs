using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OrphanChildrenSupport.Services.Models.DBSets
{
    public class ReportDetail : EngineEntity
    {
        [ForeignKey("Report")]
        [Required]
        public long ReportId { get; set; }
        [ForeignKey("ReportFieldCategory")]
        [Required]
        public long ReportFieldCategoryId { get; set; }
        public long? ApproverId { get; set; }
        public string ReportInformation { get; set; }
        public ReportDetailStatus ReportDetailStatus { get; set; }
        public string Note { get; set; }
        #region  Foreign
        public Report Report { get; set; }
        public ReportFieldCategory ReportFieldCategory { get; set; }
        #endregion
    }
}
