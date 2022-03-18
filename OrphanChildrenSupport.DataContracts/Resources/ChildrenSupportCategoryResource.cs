using OrphanChildrenSupport.Services.Models;
using OrphanChildrenSupport.Services.Models.DBSets;
using System.ComponentModel.DataAnnotations;

namespace OrphanChildrenSupport.DataContracts
{
    public class ChildrenSupportCategoryResource : EngineEntity
    {
        [Required]
        public long ChildrenProfileId { get; set; }
        [Required]
        public long SupportCategoryId { get; set; }
    }
}
