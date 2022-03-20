using System.ComponentModel;

namespace OrphanChildrenSupport.Services.Models
{
    public enum ChildrenProfileStatus
    {
        [Description("WaitingForSupport")]
        WaitingForSupport,
        [Description("Supported")]
        Supported
    }
}
