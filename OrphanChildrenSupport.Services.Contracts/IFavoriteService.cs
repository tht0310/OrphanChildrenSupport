using OrphanChildrenSupport.DataContracts;
using OrphanChildrenSupport.DataContracts.Resources;
using System.Threading.Tasks;

namespace OrphanChildrenSupport.Services.Contracts
{
    public interface IFavoriteService
    {
        Task<ApiResponse<FavoriteResource>> CreateFavorite(FavoriteResource favoriteResource);
        Task<ApiResponse<FavoriteResource>> UpdateFavorite(long id, FavoriteResource favoriteResource);
        Task<ApiResponse<FavoriteResource>> DeleteFavorite(long id, bool removeFromDB = false);
        Task<ApiResponse<FavoriteResource>> GetFavorite(long id);
        Task<ApiResponse<QueryResultResource<FavoriteResource>>> GetFavorites(QueryResource queryObj);
    }
}
