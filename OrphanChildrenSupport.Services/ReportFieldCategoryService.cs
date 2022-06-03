using AutoMapper;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using OrphanChildrenSupport.DataContracts;
using OrphanChildrenSupport.DataContracts.Resources;
using OrphanChildrenSupport.HttpClientFactory.Libraries;
using OrphanChildrenSupport.Services.Contracts;
using OrphanChildrenSupport.Services.Models;
using OrphanChildrenSupport.Tools.Encryptions;
using OrphanChildrenSupport.Tools.HttpContextExtensions;
using OrphanChildrenSupport.Infrastructure.Repositories;
using OrphanChildrenSupport.Infrastructure.Repositories.Specifications;
using Microsoft.EntityFrameworkCore;
using OrphanChildrenSupport.Services.Models.DBSets;

namespace OrphanChildrenSupport.Services
{
    public class ReportFieldCategoryService : IReportFieldCategoryService
    {

        private string _connectionString;
        private string _folderid;
        private string _type;
        private ICryptoEncryptionHelper _cryptoEncryptionHelper;
        private IHttpContextHelper _httpContextHelper;
        private readonly IMapper _mapper;
        private readonly ILogger<ReportFieldCategoryService> _logger;

        public ReportFieldCategoryService(IMapper mapper, ILogger<ReportFieldCategoryService> logger, IConfiguration config,
            ICryptoEncryptionHelper cryptoEncryptionHelper, IHttpContextHelper httpContextHelper)
        {
            _mapper = mapper;
            _logger = logger;
            _connectionString = config.GetValue<string>("ConnectionStrings:OrphanChildrenSupportConnection") ?? "";
            _folderid = config.GetValue<string>("LibraryApi:ReportFieldCategoryAvatarFolderId") ?? "";
            _type = config.GetValue<string>("LibraryApi:Type") ?? "";
            _cryptoEncryptionHelper = cryptoEncryptionHelper;
            _httpContextHelper = httpContextHelper;
        }

        public async Task<ApiResponse<ReportFieldCategoryResource>> CreateReportFieldCategory(ReportFieldCategoryResource seportFieldCategoryResource)
        {
            const string loggerHeader = "CreateReportFieldCategory";

            var apiResponse = new ApiResponse<ReportFieldCategoryResource>();
            ReportFieldCategory seportFieldCategory = _mapper.Map<ReportFieldCategoryResource, ReportFieldCategory>(seportFieldCategoryResource);

            _logger.LogDebug($"{loggerHeader} - Start to add ReportFieldCategory: {JsonConvert.SerializeObject(seportFieldCategory)}");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    seportFieldCategory.CreatedBy = _httpContextHelper.GetCurrentUser();
                    seportFieldCategory.CreatedTime = DateTime.UtcNow;
                    await unitOfWork.ReportFieldCategoryRepository.Add(seportFieldCategory);
                    await unitOfWork.SaveChanges();
                    _logger.LogDebug($"{loggerHeader} - Add new ReportFieldCategory successfully with Id: {seportFieldCategory.Id}");
                    seportFieldCategory = await unitOfWork.ReportFieldCategoryRepository.FindFirst(predicate: d => d.Id == seportFieldCategory.Id);
                    apiResponse.Data = _mapper.Map<ReportFieldCategory, ReportFieldCategoryResource>(seportFieldCategory);
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

        public async Task<ApiResponse<ReportFieldCategoryResource>> UpdateReportFieldCategory(long id, ReportFieldCategoryResource seportFieldCategoryResource)
        {
            const string loggerHeader = "UpdateReportFieldCategory";
            var apiResponse = new ApiResponse<ReportFieldCategoryResource>();

            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var seportFieldCategory = await unitOfWork.ReportFieldCategoryRepository.FindFirst(predicate: d => d.Id == id);
                    seportFieldCategory = _mapper.Map<ReportFieldCategoryResource, ReportFieldCategory>(seportFieldCategoryResource, seportFieldCategory);
                    _logger.LogDebug($"{loggerHeader} - Start to update ReportFieldCategory: {JsonConvert.SerializeObject(seportFieldCategory)}");
                    seportFieldCategory.ModifiedBy = _httpContextHelper.GetCurrentUser();
                    seportFieldCategory.LastModified = DateTime.UtcNow;
                    unitOfWork.ReportFieldCategoryRepository.Update(seportFieldCategory);
                    await unitOfWork.SaveChanges();
                    _logger.LogDebug($"{loggerHeader} - Update ReportFieldCategory successfully with Id: {seportFieldCategory.Id}");

                    seportFieldCategory = await unitOfWork.ReportFieldCategoryRepository.FindFirst(predicate: d => d.Id == seportFieldCategory.Id);
                    apiResponse.Data = _mapper.Map<ReportFieldCategory, ReportFieldCategoryResource>(seportFieldCategory);
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

        public async Task<ApiResponse<ReportFieldCategoryResource>> DeleteReportFieldCategory(long id, bool removeFromDB = false)
        {
            const string loggerHeader = "DeleteReportFieldCategory";

            var apiResponse = new ApiResponse<ReportFieldCategoryResource>();

            _logger.LogDebug($"{loggerHeader} - Start to delete ReportFieldCategory with Id: {id}");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var seportFieldCategory = await unitOfWork.ReportFieldCategoryRepository.FindFirst(d => d.Id == id);
                    if (removeFromDB)
                    {
                        unitOfWork.ReportFieldCategoryRepository.Remove(seportFieldCategory);
                    }
                    else
                    {
                        seportFieldCategory.ModifiedBy = _httpContextHelper.GetCurrentUser();
                        seportFieldCategory.IsDeleted = true;
                        seportFieldCategory.LastModified = DateTime.UtcNow;
                        unitOfWork.ReportFieldCategoryRepository.Update(seportFieldCategory);
                    }

                    await unitOfWork.SaveChanges();

                    _logger.LogDebug($"{loggerHeader} - Delete ReportFieldCategory successfully with Id: {seportFieldCategory.Id}");
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

        public async Task<ApiResponse<ReportFieldCategoryResource>> GetReportFieldCategory(long id)
        {
            const string loggerHeader = "GetReportFieldCategory";

            var apiResponse = new ApiResponse<ReportFieldCategoryResource>();

            _logger.LogDebug($"{loggerHeader} - Start to get ReportFieldCategory with Id: {id}");

            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var seportFieldCategory = await unitOfWork.ReportFieldCategoryRepository.FindFirst(predicate: d => d.Id == id);
                    apiResponse.Data = _mapper.Map<ReportFieldCategory, ReportFieldCategoryResource>(seportFieldCategory);
                    _logger.LogDebug($"{loggerHeader} - Get ReportFieldCategory successfully with Id: {apiResponse.Data.Id}");
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

        public async Task<ApiResponse<QueryResultResource<ReportFieldCategoryResource>>> GetReportFieldCategories(QueryResource queryObj)
        {
            const string loggerHeader = "GetReportFieldCategories";

            var apiResponse = new ApiResponse<QueryResultResource<ReportFieldCategoryResource>>();
            var pagingSpecification = new PagingSpecification(queryObj);

            _logger.LogDebug($"{loggerHeader} - Start to get ReportFieldCategories with");

            using (var unitOfWork = new UnitOfWork(_connectionString))
            {

                try
                {

                    var query = await unitOfWork.ReportFieldCategoryRepository.FindAll(predicate: d => d.IsDeleted == false
                                                                                                ,
                                                                        include: null,
                                                                        orderBy: null,
                                                                        disableTracking: true,
                                                                        pagingSpecification: pagingSpecification);
                    apiResponse.Data = _mapper.Map<QueryResult<ReportFieldCategory>, QueryResultResource<ReportFieldCategoryResource>>(query);
                    _logger.LogDebug($"{loggerHeader} - Get ReportFieldCategories successfully");
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
                _logger.LogDebug($"{loggerHeader} - Start to get ReportFieldCategory with email: {currentEmail}");

                using (var unitOfWork = new UnitOfWork(_connectionString))
                {
                    try
                    {
                        _logger.LogDebug($"{loggerHeader} - Get ReportFieldCategory successfully with Id: {apiResponse.Data}");
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