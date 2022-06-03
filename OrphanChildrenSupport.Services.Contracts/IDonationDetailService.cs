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
    public interface IDonationDetailService
    {
        Task<ApiResponse<DonationDetailResource>> CreateDonationDetail(DonationDetailResource donationDetailResource);
        Task<ApiResponse<DonationDetailResource>> UpdateDonationDetail(long id, DonationDetailResource donationDetailResource);
        Task<ApiResponse<DonationDetailResource>> DeleteDonationDetail(long id, bool removeFromDB = false);
        Task<ApiResponse<DonationDetailResource>> GetDonationDetail(long id);
        Task<ApiResponse<QueryResultResource<DonationDetailResource>>> GetDonationDetails(QueryResource queryObj);
        Task<ApiResponse<DonationDetailResource>> Finish(long id);
        Task<ApiResponse<DonationDetailResource>> Cancel(long id);
        Task<ApiResponse<DonationDetailResource>> UploadDonationDetailImage(long id, IFormFile file);
        Task<ApiResponse<FileStream>> GetDonationDetailImage(long id);
    }
}
