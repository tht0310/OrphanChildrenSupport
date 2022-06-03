using Microsoft.AspNetCore.Http;
using OrphanChildrenSupport.DataContracts;
using OrphanChildrenSupport.DataContracts.Resources;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrphanChildrenSupport.Services.Contracts
{
    public interface IReportDetailService
    {
        Task<ApiResponse<ReportDetailResource>> CreateReportDetail(ReportDetailResource reportDetailResource);
        Task<ApiResponse<ReportDetailResource>> UpdateReportDetail(long id, ReportDetailResource reportDetailResource);
        Task<ApiResponse<ReportDetailResource>> DeleteReportDetail(long id, bool removeFromDB = false);
        Task<ApiResponse<ReportDetailResource>> GetReportDetail(long id);
        Task<ApiResponse<QueryResultResource<ReportDetailResource>>> GetReportDetails(QueryResource queryObj);
        Task<ApiResponse<ReportDetailResource>> Approve(long id);
        Task<ApiResponse<ReportDetailResource>> Reject(long id);
        Task<ApiResponse<ReportDetailResource>> Cancel(long id);
    }
}
