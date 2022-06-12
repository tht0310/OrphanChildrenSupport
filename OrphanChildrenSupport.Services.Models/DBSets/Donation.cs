using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OrphanChildrenSupport.Services.Models.DBSets
{
    public class Donation : EngineEntity
    {
        [ForeignKey("Account")]
        [Required]
        public long AccountId { get; set; }
        [ForeignKey("ChildrenProfile")]
        [Required]
        public long ChildrenProfileId { get; set; }
        public DonationStatus DonationStatus { get; set; }
        public ICollection<DonationDetail> DonationDetails { get; set; }
        public string Note { get; set; }
        #region  Foreign
        public Account Account { get; set; }
        public ChildrenProfile ChildrenProfile { get; set; }
        #endregion
    }
}
