using OrphanChildrenSupport.Services.Models;
using System.ComponentModel.DataAnnotations;

namespace OrphanChildrenSupport.DataContracts
{
    public class FavoriteResource : EngineEntity
    {
        [Required]
        public long ChildrenProfileId { get; set; }
        [Required]
        public long AccountId { get; set; }

    }
}
