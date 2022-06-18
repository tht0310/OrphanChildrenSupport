using OrphanChildrenSupport.Services.Models;
using OrphanChildrenSupport.Services.Models.DBSets;
using System;
using System.Collections.Generic;

namespace OrphanChildrenSupport.DataContracts.Responses
{
    public class DonationStatusStatisticsResponse
    {
        public DonationStatus DonationStatus { get; set; }
        public double Percentage { get; set; }
    }
}