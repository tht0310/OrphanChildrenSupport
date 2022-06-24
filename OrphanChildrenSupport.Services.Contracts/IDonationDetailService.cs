using Microsoft.AspNetCore.Http;
using OrphanChildrenSupport.DataContracts;
using OrphanChildrenSupport.DataContracts.Resources;
using System.IO;
using System.Threading.Tasks;

namespace OrphanChildrenSupport.Services.Contracts
{
    public interface IDonationDetailService
    {
        Task<ApiResponse<DonationDetailResource>> CreateDonationDetail(DonationDetailResource donationDetailResource);
        Task<ApiResponse<DonationDetailResource>> UpdateDonationDetail(long id, DonationDetailResource donationDetailResource);
        Task<ApiResponse<DonationDetailResource>> DeleteDonationDetail(long id, bool removeFromDB = false);
        Task<ApiResponse<DonationDetailResource>> GetDonationDetail(long id);
        Task<ApiResponse<QueryResultResource<DonationDetailResource>>> GetDonationDetails(QueryResource queryObj);
        Task<ApiResponse<DonationDetailResource>> FinishDonationDetail(long id);
        Task<ApiResponse<DonationDetailResource>> CancelDonationDetail(long id);
        Task<ApiResponse<DonationDetailResource>> UploadDonationDetailImage(long id, IFormFile file);
        Task<ApiResponse<FileStream>> ViewDonationDetailImage(long id);
    }
}
