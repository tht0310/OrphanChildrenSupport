using OrphanChildrenSupport.DataContracts;
using OrphanChildrenSupport.DataContracts.Resources;
using OrphanChildrenSupport.DataContracts.Responses;
using System.Collections.Generic;
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
        Task<ApiResponse<ReportResource>> ApproveReport(long id);
        Task<ApiResponse<ReportResource>> RejectReport(long id);
        Task<ApiResponse<ReportResource>> CancelReport(long id);
        Task<ApiResponse<List<ReportStatusStatisticsResponse>>> GetReportStatusStatistics();
    }
}
