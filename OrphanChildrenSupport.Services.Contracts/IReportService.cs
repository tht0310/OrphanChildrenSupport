using OrphanChildrenSupport.DataContracts;
using OrphanChildrenSupport.DataContracts.Resources;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrphanChildrenSupport.Services.Contracts
{
    public interface IReportService
    {
        Task<ApiResponse<ReportResource>> CreateReport(ReportResource reportResource);
        Task<ApiResponse<ReportResource>> UpdateReport(long id, ReportResource reportResource);
        Task<ApiResponse<ReportResource>> DeleteReport(long id, bool removeFromDB = false);
        Task<ApiResponse<ReportResource>> GetReport(long id);
        Task<ApiResponse<QueryResultResource<ReportResource>>> GetReports(QueryResource queryObj);
        Task<ApiResponse<ReportResource>> Approve(long id);
        Task<ApiResponse<ReportResource>> Reject(long id);
        Task<ApiResponse<ReportResource>> Cancel (long id);
    }
}
