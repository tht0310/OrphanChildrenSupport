using OrphanChildrenSupport.Services.Models;
using OrphanChildrenSupport.Services.Models.DBSets;
using System.ComponentModel.DataAnnotations;

namespace OrphanChildrenSupport.DataContracts
{
    public class DonationDetailResource : EngineEntity
    {
        [Required]
        public long DonationId { get; set; }
        [Required]
        public long SupportCategoryId { get; set; }
        public DonationDetailStatus Status { get; set; }
        public string Note { get; set; }
        public string ImagePath { get; set; }
    }
}
