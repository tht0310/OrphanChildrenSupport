using OrphanChildrenSupport.Services.Models;
using System.ComponentModel.DataAnnotations;

namespace OrphanChildrenSupport.DataContracts
{
    public class ChildrenProfileSupportCategoryResource : EngineEntity
    {
        [Required]
        public long ChildrenProfileId { get; set; }
        [Required]
        public long SupportCategoryId { get; set; }

    }
}
