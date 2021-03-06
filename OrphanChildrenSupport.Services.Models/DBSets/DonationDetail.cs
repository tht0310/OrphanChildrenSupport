using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OrphanChildrenSupport.Services.Models.DBSets
{
    public class DonationDetail : EngineEntity
    {
        [ForeignKey("Donation")]
        [Required]
        public long DonationId { get; set; }
        [ForeignKey("SupportCategory")]
        [Required]
        public long SupportCategoryId { get; set; }
        public DonationDetailStatus Status { get; set; }
        public string Note { get; set; }
        public string ImagePath { get; set; }
        #region  Foreign
        public Donation Donation { get; set; }
        public SupportCategory SupportCategory { get; set; }
        #endregion
    }
}
