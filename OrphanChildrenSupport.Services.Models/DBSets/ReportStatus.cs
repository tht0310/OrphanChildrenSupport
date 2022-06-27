using System.ComponentModel;

namespace OrphanChildrenSupport.Services.Models.DBSets
{
    public enum ReportStatus
    {
        [Description("WaitingForApproval")]
        WaitingForApproval,
        [Description("Processing")]
        Processing,
        [Description("Finished")]
        Finished,
        [Description("Rejected")]
        Rejected,
        [Description("Cancelled")]
        Cancelled
    }
}
