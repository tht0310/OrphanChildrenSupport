using OrphanChildrenSupport.Services.Models;
using System.ComponentModel.DataAnnotations;

namespace OrphanChildrenSupport.DataContracts
{
    public class ChildrenProfileSupportCategoryResponse : EngineEntity
    {
        [Required]
        public long ChildrenProfileId { get; set; }
        [Required]
        public long SupportCategoryId { get; set; }

        public string SupportCategoryTitle { get; set; }
    }
}
