using OrphanChildrenSupport.DataContracts;
using OrphanChildrenSupport.DataContracts.Resources;
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
        Task<ApiResponse<ReportDetailResource>> ApproveReportDetail(long id);
        Task<ApiResponse<ReportDetailResource>> RejectReportDetail(long id);
        Task<ApiResponse<ReportDetailResource>> CancelReportDetail(long id);
    }
}
