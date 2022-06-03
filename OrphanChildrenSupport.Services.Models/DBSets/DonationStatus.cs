﻿using System.ComponentModel;

namespace OrphanChildrenSupport.Services.Models.DBSets
{
    public enum DonationStatus
    {
        [Description("WaitingForApproval")]
        WaitingForApproval,
        [Description("Approved")]
        Approved,
        [Description("Rejected")]
        Rejected,
        [Description("Cancelled")]
        Cancelled,
    }
}
