using AutoMapper;
using Microsoft.EntityFrameworkCore;
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
        private readonly IChangelogService _changelogService;

        public FavoriteService(IMapper mapper, ILogger<FavoriteService> logger, IConfiguration config, IHttpContextHelper httpContextHelper, IChangelogService changelogService)
        {
            _mapper = mapper;
            _logger = logger;
            _connectionString = config.GetValue<string>("ConnectionStrings:OrphanChildrenSupportConnection") ?? "";
            _httpContextHelper = httpContextHelper;
            _changelogService = changelogService;
        }

        public async Task<ApiResponse<FavoriteResource>> CreateFavorite(FavoriteResource favoriteResource)
        {
            const string loggerHeader = "CreateFavorite";
            var apiResponse = new ApiResponse<FavoriteResource>();
            _logger.LogDebug($"{loggerHeader} - Start to CreateFavorite");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var favorite = await unitOfWork.FavoriteRepository.FindFirst(d => d.ChildrenProfileId == favoriteResource.ChildrenProfileId && d.AccountId == favoriteResource.AccountId);
                    if (favorite != null)
                    {
                        if (favorite.IsDeleted)
                        {
                            favorite.IsDeleted = false;
                            favorite.LastModified = DateTime.UtcNow;
                            favorite.ModifiedBy = _httpContextHelper.GetCurrentAccountEmail();
                            unitOfWork.FavoriteRepository.Update(favorite);
                        }
                    }
                    else
                    {
                        favorite = _mapper.Map<FavoriteResource, Favorite>(favoriteResource);
                        favorite.CreatedBy = _httpContextHelper.GetCurrentAccountEmail();
                        favorite.CreatedTime = DateTime.UtcNow;
                        await unitOfWork.FavoriteRepository.Add(favorite);
                    }
                    await unitOfWork.SaveChanges();
                    favorite = await unitOfWork.FavoriteRepository.FindFirst(predicate: d => d.Id == favorite.Id);
                    apiResponse.Data = _mapper.Map<Favorite, FavoriteResource>(favorite);
                    _logger.LogDebug($"{loggerHeader} - CreateFavorite successfully with Id: {favorite.Id}");

                    var changelogResource = new ChangelogResource();
                    changelogResource.Service = "Favorite";
                    changelogResource.API = $"{loggerHeader} - CreateFavorite successfully with Id: {favorite.Id}";
                    changelogResource.CreatedBy = _httpContextHelper.GetCurrentAccountEmail();
                    changelogResource.CreatedTime = DateTime.UtcNow;
                    changelogResource.IsDeleted = false;
                    await _changelogService.CreateChangelog(changelogResource);

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

        public async Task<ApiResponse<FavoriteResource>> UpdateFavorite(long id, FavoriteResource favoriteResource)
        {
            const string loggerHeader = "UpdateFavorite";
            var apiResponse = new ApiResponse<FavoriteResource>();
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var favorite = await unitOfWork.FavoriteRepository.FindFirst(predicate: d => d.Id == id);
                    favorite = _mapper.Map<FavoriteResource, Favorite>(favoriteResource, favorite);
                    _logger.LogDebug($"{loggerHeader} - Start to UpdateFavorite: {JsonConvert.SerializeObject(favorite)}");
                    favorite.ModifiedBy = _httpContextHelper.GetCurrentAccountEmail();
                    favorite.LastModified = DateTime.UtcNow;
                    unitOfWork.FavoriteRepository.Update(favorite);
                    await unitOfWork.SaveChanges();
                    favorite = await unitOfWork.FavoriteRepository.FindFirst(predicate: d => d.Id == favorite.Id);
                    apiResponse.Data = _mapper.Map<Favorite, FavoriteResource>(favorite);
                    _logger.LogDebug($"{loggerHeader} - UpdateFavorite successfully with Id: {favorite.Id}");

                    var changelogResource = new ChangelogResource();
                    changelogResource.Service = "Favorite";
                    changelogResource.API = $"{loggerHeader} - UpdateFavorite successfully with Id: {favorite.Id}";
                    changelogResource.CreatedBy = _httpContextHelper.GetCurrentAccountEmail();
                    changelogResource.CreatedTime = DateTime.UtcNow;
                    changelogResource.IsDeleted = false;
                    await _changelogService.CreateChangelog(changelogResource);
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
            _logger.LogDebug($"{loggerHeader} - Start to DeleteFavorite with Id: {id}");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var favorite = await unitOfWork.FavoriteRepository.FindFirst(d => d.Id == id);
                    if (removeFromDB)
                    {
                        unitOfWork.FavoriteRepository.Remove(favorite);
                    }
                    else
                    {
                        favorite.ModifiedBy = _httpContextHelper.GetCurrentAccountEmail();
                        favorite.IsDeleted = true;
                        favorite.LastModified = DateTime.UtcNow;
                        unitOfWork.FavoriteRepository.Update(favorite);
                    }
                    await unitOfWork.SaveChanges();
                    _logger.LogDebug($"{loggerHeader} - DeleteFavorite successfully with Id: {favorite.Id}");

                    var changelogResource = new ChangelogResource();
                    changelogResource.Service = "Favorite";
                    changelogResource.API = $"{loggerHeader} - DeleteFavorite successfully with Id: {favorite.Id}";
                    changelogResource.CreatedBy = _httpContextHelper.GetCurrentAccountEmail();
                    changelogResource.CreatedTime = DateTime.UtcNow;
                    changelogResource.IsDeleted = false;
                    await _changelogService.CreateChangelog(changelogResource);
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

            _logger.LogDebug($"{loggerHeader} - Start to GetFavorite with Id: {id}");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var favorite = await unitOfWork.FavoriteRepository.FindFirst(predicate: d => d.Id == id);
                    apiResponse.Data = _mapper.Map<Favorite, FavoriteResource>(favorite);
                    _logger.LogDebug($"{loggerHeader} - GetFavorite successfully with Id: {apiResponse.Data.Id}");
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
            _logger.LogDebug($"{loggerHeader} - Start to GetFavorites");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var query = await unitOfWork.FavoriteRepository.FindAll(predicate: d => d.IsDeleted == false
                                                                            && (!queryObj.AccountId.HasValue || d.AccountId == queryObj.AccountId)
                                                                            && ((String.IsNullOrEmpty(queryObj.FullName)) || (EF.Functions.Like(d.ChildrenProfile.FullName, $"%{queryObj.FullName}%"))),
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
    }
}