using OrphanChildrenSupport.Services.Models;
using OrphanChildrenSupport.Services.Models.DBSets;
using System;
using System.Collections.Generic;

namespace OrphanChildrenSupport.DataContracts.Responses
{
    public class ChildrenProfileStatisticsResponse
    {
        public int Month { get; set; }
        public long Value { get; set; }
    }
}