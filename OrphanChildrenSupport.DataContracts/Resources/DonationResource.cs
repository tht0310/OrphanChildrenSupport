using OrphanChildrenSupport.Services.Models;
using OrphanChildrenSupport.Services.Models.DBSets;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace OrphanChildrenSupport.DataContracts
{
    public class DonationResource : EngineEntity
    {
        [Required]
        public long AccountId { get; set; }
        [Required]
        public long ChildrenProfileId { get; set; }
        public DonationStatus Status { get; set; }
        public string Note { get; set; }
        public ICollection<DonationDetailResource> DonationDetails { get; set; }
    }
}
