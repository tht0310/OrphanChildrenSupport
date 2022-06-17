using OrphanChildrenSupport.Services.Models;
using System;

namespace OrphanChildrenSupport.DataContracts
{
    public class NotificationResource : EngineEntity
    {
        public long AccountId { get; set; }
        public string Content { get; set; }
        public bool IsSeen { get; set; }
        public DateTime SeenTime { get; set; }
    }
}
