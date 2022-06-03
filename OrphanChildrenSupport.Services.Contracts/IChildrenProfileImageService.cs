using OrphanChildrenSupport.DataContracts;
using OrphanChildrenSupport.DataContracts.Resources;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
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
    }
}
