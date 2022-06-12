using Microsoft.AspNetCore.Http;
using OrphanChildrenSupport.DataContracts;
using OrphanChildrenSupport.DataContracts.Resources;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace OrphanChildrenSupport.Services.Contracts
{
    public interface IChildrenProfileImageService
    {
        Task<ApiResponse<ChildrenProfileImageResource>> CreateChildrenProfileImage(ChildrenProfileImageResource childrenProfileImageResource);
        Task<ApiResponse<ChildrenProfileImageResource>> UpdateChildrenProfileImage(long id, ChildrenProfileImageResource childrenProfileImageResource);
        Task<ApiResponse<ChildrenProfileImageResource>> DeleteChildrenProfileImage(long id, bool removeFromDB = false);
        Task<ApiResponse<ChildrenProfileImageResource>> GetChildrenProfileImage(long id);
        Task<ApiResponse<QueryResultResource<ChildrenProfileImageResource>>> GetChildrenProfileImages(QueryResource queryObj);
        Task<ApiResponse<FileStream>> ViewChildrenProfileImage(long id);
        Task<ApiResponse<QueryResultResource<ChildrenProfileImageResource>>> GetImagesByChildrenProfileId(long id);
        Task<ApiResponse<ChildrenProfileResponse>> UploadImagesByChildrenProfileId(long id, List<IFormFile> files);
    }
}
