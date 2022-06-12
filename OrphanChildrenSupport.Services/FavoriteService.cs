using AutoMapper;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using OrphanChildrenSupport.DataContracts;
using OrphanChildrenSupport.DataContracts.Resources;
using OrphanChildrenSupport.Infrastructure.Repositories;
using OrphanChildrenSupport.Infrastructure.Repositories.Specifications;
using OrphanChildrenSupport.Services.Contracts;
using OrphanChildrenSupport.Services.Models.DBSets;
using OrphanChildrenSupport.Tools.HttpContextExtensions;
using System;
using System.Threading.Tasks;

namespace OrphanChildrenSupport.Services
{
    public class FavoriteService : IFavoriteService
    {

        private string _connectionString;
        
       
        
        private IHttpContextHelper _httpContextHelper;
        private readonly IMapper _mapper;
        private readonly ILogger<FavoriteService> _logger;

        public FavoriteService(IMapper mapper, ILogger<FavoriteService> logger, IConfiguration config,
             IHttpContextHelper httpContextHelper)
        {
            _mapper = mapper;
            _logger = logger;
            _connectionString = config.GetValue<string>("ConnectionStrings:OrphanChildrenSupportConnection") ?? "";
            
            
            _httpContextHelper = httpContextHelper;
        }

        public async Task<ApiResponse<FavoriteResource>> CreateFavorite(FavoriteResource childrenFavoriteResource)
        {
            const string loggerHeader = "CreateFavorite";

            var apiResponse = new ApiResponse<FavoriteResource>();
            Favorite childrenFavorite = _mapper.Map<FavoriteResource, Favorite>(childrenFavoriteResource);

            _logger.LogDebug($"{loggerHeader} - Start to add Favorite: {JsonConvert.SerializeObject(childrenFavorite)}");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    childrenFavorite.CreatedBy = _httpContextHelper.GetCurrentUser();
                    childrenFavorite.CreatedTime = DateTime.UtcNow;
                    await unitOfWork.FavoriteRepository.Add(childrenFavorite);
                    await unitOfWork.SaveChanges();
                    _logger.LogDebug($"{loggerHeader} - Add new Favorite successfully with Id: {childrenFavorite.Id}");
                    childrenFavorite = await unitOfWork.FavoriteRepository.FindFirst(predicate: d => d.Id == childrenFavorite.Id);
                    apiResponse.Data = _mapper.Map<Favorite, FavoriteResource>(childrenFavorite);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, $"{loggerHeader} have error: {ex.Message}");
                    apiResponse.IsError = true;
                    apiResponse.Message = ex.Message;
                    await unitOfWork.SaveErrorLog(ex);
                }
                finally
                {
                    unitOfWork.Dispose();
                }
            }

            return apiResponse;
        }

        public async Task<ApiResponse<FavoriteResource>> UpdateFavorite(long id, FavoriteResource childrenFavoriteResource)
        {
            const string loggerHeader = "UpdateFavorite";
            var apiResponse = new ApiResponse<FavoriteResource>();

            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var childrenFavorite = await unitOfWork.FavoriteRepository.FindFirst(predicate: d => d.Id == id);
                    childrenFavorite = _mapper.Map<FavoriteResource, Favorite>(childrenFavoriteResource, childrenFavorite);
                    _logger.LogDebug($"{loggerHeader} - Start to update Favorite: {JsonConvert.SerializeObject(childrenFavorite)}");
                    childrenFavorite.ModifiedBy = _httpContextHelper.GetCurrentUser();
                    childrenFavorite.LastModified = DateTime.UtcNow;
                    unitOfWork.FavoriteRepository.Update(childrenFavorite);
                    await unitOfWork.SaveChanges();
                    _logger.LogDebug($"{loggerHeader} - Update Favorite successfully with Id: {childrenFavorite.Id}");

                    childrenFavorite = await unitOfWork.FavoriteRepository.FindFirst(predicate: d => d.Id == childrenFavorite.Id);
                    apiResponse.Data = _mapper.Map<Favorite, FavoriteResource>(childrenFavorite);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, $"{loggerHeader} have error: {ex.Message}");
                    apiResponse.IsError = true;
                    apiResponse.Message = ex.Message;
                    await unitOfWork.SaveErrorLog(ex);
                }
                finally
                {
                    unitOfWork.Dispose();
                }
            }

            return apiResponse;
        }

        public async Task<ApiResponse<FavoriteResource>> DeleteFavorite(long id, bool removeFromDB = false)
        {
            const string loggerHeader = "DeleteFavorite";

            var apiResponse = new ApiResponse<FavoriteResource>();

            _logger.LogDebug($"{loggerHeader} - Start to delete Favorite with Id: {id}");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var childrenFavorite = await unitOfWork.FavoriteRepository.FindFirst(d => d.Id == id);
                    if (removeFromDB)
                    {
                        unitOfWork.FavoriteRepository.Remove(childrenFavorite);
                    }
                    else
                    {
                        childrenFavorite.ModifiedBy = _httpContextHelper.GetCurrentUser();
                        childrenFavorite.IsDeleted = true;
                        childrenFavorite.LastModified = DateTime.UtcNow;
                        unitOfWork.FavoriteRepository.Update(childrenFavorite);
                    }

                    await unitOfWork.SaveChanges();

                    _logger.LogDebug($"{loggerHeader} - Delete Favorite successfully with Id: {childrenFavorite.Id}");
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, $"{loggerHeader} have error: {ex.Message}");
                    apiResponse.IsError = true;
                    apiResponse.Message = ex.Message;
                    await unitOfWork.SaveErrorLog(ex);
                }
                finally
                {
                    unitOfWork.Dispose();
                }
            }

            return apiResponse;
        }

        public async Task<ApiResponse<FavoriteResource>> GetFavorite(long id)
        {
            const string loggerHeader = "GetFavorite";

            var apiResponse = new ApiResponse<FavoriteResource>();

            _logger.LogDebug($"{loggerHeader} - Start to get Favorite with Id: {id}");

            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var childrenFavorite = await unitOfWork.FavoriteRepository.FindFirst(predicate: d => d.Id == id);
                    apiResponse.Data = _mapper.Map<Favorite, FavoriteResource>(childrenFavorite);
                    _logger.LogDebug($"{loggerHeader} - Get Favorite successfully with Id: {apiResponse.Data.Id}");
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, $"{loggerHeader} have error: {ex.Message}");
                    apiResponse.IsError = true;
                    apiResponse.Message = ex.Message;
                    await unitOfWork.SaveErrorLog(ex);
                }
                finally
                {
                    unitOfWork.Dispose();
                }
            }

            return apiResponse;
        }

        public async Task<ApiResponse<QueryResultResource<FavoriteResource>>> GetFavorites(QueryResource queryObj)
        {
            const string loggerHeader = "GetFavorites";

            var apiResponse = new ApiResponse<QueryResultResource<FavoriteResource>>();
            var pagingSpecification = new PagingSpecification(queryObj);

            _logger.LogDebug($"{loggerHeader} - Start to getFavorites with");

            using (var unitOfWork = new UnitOfWork(_connectionString))
            {

                try
                {

                    var query = await unitOfWork.FavoriteRepository.FindAll(predicate: d => d.IsDeleted == false,
                                                                        include: null,
                                                                        orderBy: null,
                                                                        disableTracking: true,
                                                                        pagingSpecification: pagingSpecification);
                    apiResponse.Data = _mapper.Map<QueryResult<Favorite>, QueryResultResource<FavoriteResource>>(query);
                    _logger.LogDebug($"{loggerHeader} - GetFavorites successfully");
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, $"{loggerHeader} have error: {ex.Message}");
                    apiResponse.IsError = true;
                    apiResponse.Message = ex.Message;
                    await unitOfWork.SaveErrorLog(ex);
                }
                finally
                {
                    unitOfWork.Dispose();
                }
            }

            return apiResponse;
        }

        public async Task<string> GetAccountNameByContext()
        {
            const string loggerHeader = "Get Account Name";

            var apiResponse = new ApiResponse<string>();
            var currentEmail = _httpContextHelper.GetCurrentUser();
            if (!String.IsNullOrEmpty(currentEmail))
            {
                _logger.LogDebug($"{loggerHeader} - Start to get Favorite with email: {currentEmail}");

                using (var unitOfWork = new UnitOfWork(_connectionString))
                {
                    try
                    {
                        _logger.LogDebug($"{loggerHeader} - Get Favorite successfully with Id: {apiResponse.Data}");
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(ex, $"{loggerHeader} have error: {ex.Message}");
                        apiResponse.IsError = true;
                        apiResponse.Message = ex.Message;
                        await unitOfWork.SaveErrorLog(ex);

                        return "";
                    }
                    finally
                    {
                        unitOfWork.Dispose();
                    }
                }

                return apiResponse.Data;
            }
            else
            {
                return "";
            }
        }
    }
}