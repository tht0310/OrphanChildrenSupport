using OrphanChildrenSupport.Services.Models;
using OrphanChildrenSupport.Services.Models.DBSets;
using System;
using System.Collections.Generic;

namespace OrphanChildrenSupport.DataContracts.Responses
{
    public class SupportedChildrenStatistics
    {
        public string Month { get; set; }
        public long Value { get; set; }
    }
}