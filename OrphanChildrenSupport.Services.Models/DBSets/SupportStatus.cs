using System.ComponentModel;

namespace OrphanChildrenSupport.Services.Models
{
    public enum SupportStatus
    {
        [Description("WaitingForApproval")]
        WaitingForApprove,
        [Description("Approved")]
        Approved,
        [Description("Rejected")]
        Rejected
    }
}
