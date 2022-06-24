using OrphanChildrenSupport.DataContracts;
using OrphanChildrenSupport.DataContracts.Resources;
using System.Threading.Tasks;

namespace OrphanChildrenSupport.Services.Contracts
{
    public interface IChangelogService
    {
        Task<ApiResponse<ChangelogResource>> CreateChangelog(ChangelogResource changelogResource);
        Task<ApiResponse<ChangelogResource>> UpdateChangelog(long id, ChangelogResource changelogResource);
        Task<ApiResponse<ChangelogResource>> DeleteChangelog(long id, bool removeFromDB = false);
        Task<ApiResponse<ChangelogResource>> GetChangelog(long id);
        Task<ApiResponse<QueryResultResource<ChangelogResource>>> GetChangelogs(QueryResource queryObj);
    }
}
