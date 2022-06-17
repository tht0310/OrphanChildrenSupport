using AutoMapper;
using Microsoft.AspNetCore.Mvc.Filters;
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
    public class ChangelogService : IChangelogService
    {

        private string _connectionString;



        private IHttpContextHelper _httpContextHelper;
        private readonly IMapper _mapper;
        private readonly ILogger<ChangelogService> _logger;

        public ChangelogService(IMapper mapper, ILogger<ChangelogService> logger, IConfiguration config,
             IHttpContextHelper httpContextHelper)
        {
            _mapper = mapper;
            _logger = logger;
            _connectionString = config.GetValue<string>("ConnectionStrings:OrphanChildrenSupportConnection") ?? "";


            _httpContextHelper = httpContextHelper;
        }

        public async Task<ApiResponse<ChangelogResource>> CreateChangelog(ChangelogResource childrenChangelogResource)
        {
            const string loggerHeader = "CreateChangelog";

            var apiResponse = new ApiResponse<ChangelogResource>();
            Changelog childrenChangelog = _mapper.Map<ChangelogResource, Changelog>(childrenChangelogResource);

            _logger.LogDebug($"{loggerHeader} - Start to add Changelog: {JsonConvert.SerializeObject(childrenChangelog)}");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    childrenChangelog.CreatedBy = _httpContextHelper.GetCurrentAccount();
                    childrenChangelog.CreatedTime = DateTime.UtcNow;
                    await unitOfWork.ChangelogRepository.Add(childrenChangelog);
                    await unitOfWork.SaveChanges();
                    _logger.LogDebug($"{loggerHeader} - Add new Changelog successfully with Id: {childrenChangelog.Id}");
                    childrenChangelog = await unitOfWork.ChangelogRepository.FindFirst(predicate: d => d.Id == childrenChangelog.Id);
                    apiResponse.Data = _mapper.Map<Changelog, ChangelogResource>(childrenChangelog);
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

        public async Task<ApiResponse<ChangelogResource>> UpdateChangelog(long id, ChangelogResource childrenChangelogResource)
        {
            const string loggerHeader = "UpdateChangelog";
            var apiResponse = new ApiResponse<ChangelogResource>();

            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var childrenChangelog = await unitOfWork.ChangelogRepository.FindFirst(predicate: d => d.Id == id);
                    childrenChangelog = _mapper.Map<ChangelogResource, Changelog>(childrenChangelogResource, childrenChangelog);
                    _logger.LogDebug($"{loggerHeader} - Start to update Changelog: {JsonConvert.SerializeObject(childrenChangelog)}");
                    childrenChangelog.ModifiedBy = _httpContextHelper.GetCurrentAccount();
                    childrenChangelog.LastModified = DateTime.UtcNow;
                    unitOfWork.ChangelogRepository.Update(childrenChangelog);
                    await unitOfWork.SaveChanges();
                    _logger.LogDebug($"{loggerHeader} - Update Changelog successfully with Id: {childrenChangelog.Id}");

                    childrenChangelog = await unitOfWork.ChangelogRepository.FindFirst(predicate: d => d.Id == childrenChangelog.Id);
                    apiResponse.Data = _mapper.Map<Changelog, ChangelogResource>(childrenChangelog);
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

        public async Task<ApiResponse<ChangelogResource>> DeleteChangelog(long id, bool removeFromDB = false)
        {
            const string loggerHeader = "DeleteChangelog";

            var apiResponse = new ApiResponse<ChangelogResource>();

            _logger.LogDebug($"{loggerHeader} - Start to delete Changelog with Id: {id}");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var childrenChangelog = await unitOfWork.ChangelogRepository.FindFirst(d => d.Id == id);
                    if (removeFromDB)
                    {
                        unitOfWork.ChangelogRepository.Remove(childrenChangelog);
                    }
                    else
                    {
                        childrenChangelog.ModifiedBy = _httpContextHelper.GetCurrentAccount();
                        childrenChangelog.IsDeleted = true;
                        childrenChangelog.LastModified = DateTime.UtcNow;
                        unitOfWork.ChangelogRepository.Update(childrenChangelog);
                    }

                    await unitOfWork.SaveChanges();

                    _logger.LogDebug($"{loggerHeader} - Delete Changelog successfully with Id: {childrenChangelog.Id}");
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

        public async Task<ApiResponse<ChangelogResource>> GetChangelog(long id)
        {
            const string loggerHeader = "GetChangelog";

            var apiResponse = new ApiResponse<ChangelogResource>();

            _logger.LogDebug($"{loggerHeader} - Start to get Changelog with Id: {id}");

            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var childrenChangelog = await unitOfWork.ChangelogRepository.FindFirst(predicate: d => d.Id == id);
                    apiResponse.Data = _mapper.Map<Changelog, ChangelogResource>(childrenChangelog);
                    _logger.LogDebug($"{loggerHeader} - Get Changelog successfully with Id: {apiResponse.Data.Id}");
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

        public async Task<ApiResponse<QueryResultResource<ChangelogResource>>> GetChangelogs(QueryResource queryObj)
        {
            const string loggerHeader = "GetChangelogs";

            var apiResponse = new ApiResponse<QueryResultResource<ChangelogResource>>();
            var pagingSpecification = new PagingSpecification(queryObj);

            _logger.LogDebug($"{loggerHeader} - Start to getChangelogs with");

            using (var unitOfWork = new UnitOfWork(_connectionString))
            {

                try
                {

                    var query = await unitOfWork.ChangelogRepository.FindAll(predicate: d => d.IsDeleted == false,
                                                                        include: null,
                                                                        orderBy: null,
                                                                        disableTracking: true,
                                                                        pagingSpecification: pagingSpecification);
                    apiResponse.Data = _mapper.Map<QueryResult<Changelog>, QueryResultResource<ChangelogResource>>(query);
                    _logger.LogDebug($"{loggerHeader} - GetChangelogs successfully");
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
            var currentEmail = _httpContextHelper.GetCurrentAccount();
            if (!String.IsNullOrEmpty(currentEmail))
            {
                _logger.LogDebug($"{loggerHeader} - Start to get Changelog with email: {currentEmail}");

                using (var unitOfWork = new UnitOfWork(_connectionString))
                {
                    try
                    {
                        _logger.LogDebug($"{loggerHeader} - Get Changelog successfully with Id: {apiResponse.Data}");
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