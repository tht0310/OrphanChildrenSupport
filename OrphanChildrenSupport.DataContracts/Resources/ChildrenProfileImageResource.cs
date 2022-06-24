using OrphanChildrenSupport.Services.Models;
using System.ComponentModel.DataAnnotations;

namespace OrphanChildrenSupport.DataContracts.Resources
{
    public class ChildrenProfileImageResource : EngineEntity
    {
        [Required]
        public long ChildrenProfileId { get; set; }
        public string ImagePath { get; set; }
    }
}
