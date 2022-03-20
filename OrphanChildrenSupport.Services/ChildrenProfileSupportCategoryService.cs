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
    public class ChildrenProfileSupportCategoryService : IChildrenProfileSupportCategoryService
    {

        private string _connectionString;
        private string _folderid;
        private string _type;
        private ICryptoEncryptionHelper _cryptoEncryptionHelper;
        private IHttpContextHelper _httpContextHelper;
        private readonly IMapper _mapper;
        private readonly ILogger<ChildrenProfileSupportCategoryService> _logger;

        public ChildrenProfileSupportCategoryService(IMapper mapper, ILogger<ChildrenProfileSupportCategoryService> logger, IConfiguration config,
            ICryptoEncryptionHelper cryptoEncryptionHelper, IHttpContextHelper httpContextHelper)
        {
            _mapper = mapper;
            _logger = logger;
            _connectionString = config.GetValue<string>("ConnectionStrings:OrphanChildrenSupportConnection") ?? "";
            _folderid = config.GetValue<string>("LibraryApi:ChildrenProfileSupportCategoryAvatarFolderId") ?? "";
            _type = config.GetValue<string>("LibraryApi:Type") ?? "";
            _cryptoEncryptionHelper = cryptoEncryptionHelper;
            _httpContextHelper = httpContextHelper;
        }

        public async Task<ApiResponse<ChildrenProfileSupportCategoryResource>> CreateChildrenProfileSupportCategory(ChildrenProfileSupportCategoryResource childrenChildrenProfileSupportCategoryResource)
        {
            const string loggerHeader = "CreateChildrenProfileSupportCategory";

            var apiResponse = new ApiResponse<ChildrenProfileSupportCategoryResource>();
            ChildrenProfileSupportCategory childrenChildrenProfileSupportCategory = _mapper.Map<ChildrenProfileSupportCategoryResource, ChildrenProfileSupportCategory>(childrenChildrenProfileSupportCategoryResource);

            _logger.LogDebug($"{loggerHeader} - Start to add ChildrenProfileSupportCategory: {JsonConvert.SerializeObject(childrenChildrenProfileSupportCategory)}");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    childrenChildrenProfileSupportCategory.CreatedBy = _httpContextHelper.GetCurrentUser();
                    childrenChildrenProfileSupportCategory.CreatedTime = DateTime.UtcNow;
                    await unitOfWork.ChildrenProfileSupportCategoryRepository.Add(childrenChildrenProfileSupportCategory);
                    await unitOfWork.SaveChanges();
                    _logger.LogDebug($"{loggerHeader} - Add new ChildrenProfileSupportCategory successfully with Id: {childrenChildrenProfileSupportCategory.Id}");
                    childrenChildrenProfileSupportCategory = await unitOfWork.ChildrenProfileSupportCategoryRepository.FindFirst(predicate: d => d.Id == childrenChildrenProfileSupportCategory.Id);
                    apiResponse.Data = _mapper.Map<ChildrenProfileSupportCategory, ChildrenProfileSupportCategoryResource>(childrenChildrenProfileSupportCategory);
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

        public async Task<ApiResponse<ChildrenProfileSupportCategoryResource>> UpdateChildrenProfileSupportCategory(long id, ChildrenProfileSupportCategoryResource childrenChildrenProfileSupportCategoryResource)
        {
            const string loggerHeader = "UpdateChildrenProfileSupportCategory";
            var apiResponse = new ApiResponse<ChildrenProfileSupportCategoryResource>();

            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var childrenChildrenProfileSupportCategory = await unitOfWork.ChildrenProfileSupportCategoryRepository.FindFirst(predicate: d => d.Id == id);
                    childrenChildrenProfileSupportCategory = _mapper.Map<ChildrenProfileSupportCategoryResource, ChildrenProfileSupportCategory>(childrenChildrenProfileSupportCategoryResource, childrenChildrenProfileSupportCategory);
                    _logger.LogDebug($"{loggerHeader} - Start to update ChildrenProfileSupportCategory: {JsonConvert.SerializeObject(childrenChildrenProfileSupportCategory)}");
                    childrenChildrenProfileSupportCategory.ModifiedBy = _httpContextHelper.GetCurrentUser();
                    childrenChildrenProfileSupportCategory.LastModified = DateTime.UtcNow;
                    unitOfWork.ChildrenProfileSupportCategoryRepository.Update(childrenChildrenProfileSupportCategory);
                    await unitOfWork.SaveChanges();
                    _logger.LogDebug($"{loggerHeader} - Update ChildrenProfileSupportCategory successfully with Id: {childrenChildrenProfileSupportCategory.Id}");

                    childrenChildrenProfileSupportCategory = await unitOfWork.ChildrenProfileSupportCategoryRepository.FindFirst(predicate: d => d.Id == childrenChildrenProfileSupportCategory.Id);
                    apiResponse.Data = _mapper.Map<ChildrenProfileSupportCategory, ChildrenProfileSupportCategoryResource>(childrenChildrenProfileSupportCategory);
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

        public async Task<ApiResponse<ChildrenProfileSupportCategoryResource>> DeleteChildrenProfileSupportCategory(long id, bool removeFromDB = false)
        {
            const string loggerHeader = "DeleteChildrenProfileSupportCategory";

            var apiResponse = new ApiResponse<ChildrenProfileSupportCategoryResource>();

            _logger.LogDebug($"{loggerHeader} - Start to delete ChildrenProfileSupportCategory with Id: {id}");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var childrenChildrenProfileSupportCategory = await unitOfWork.ChildrenProfileSupportCategoryRepository.FindFirst(d => d.Id == id);
                    if (removeFromDB)
                    {
                        unitOfWork.ChildrenProfileSupportCategoryRepository.Remove(childrenChildrenProfileSupportCategory);
                    }
                    else
                    {
                        childrenChildrenProfileSupportCategory.ModifiedBy = _httpContextHelper.GetCurrentUser();
                        childrenChildrenProfileSupportCategory.IsDeleted = true;
                        childrenChildrenProfileSupportCategory.LastModified = DateTime.UtcNow;
                        unitOfWork.ChildrenProfileSupportCategoryRepository.Update(childrenChildrenProfileSupportCategory);
                    }

                    await unitOfWork.SaveChanges();

                    _logger.LogDebug($"{loggerHeader} - Delete ChildrenProfileSupportCategory successfully with Id: {childrenChildrenProfileSupportCategory.Id}");
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

        public async Task<ApiResponse<ChildrenProfileSupportCategoryResource>> GetChildrenProfileSupportCategory(long id)
        {
            const string loggerHeader = "GetChildrenProfileSupportCategory";

            var apiResponse = new ApiResponse<ChildrenProfileSupportCategoryResource>();

            _logger.LogDebug($"{loggerHeader} - Start to get ChildrenProfileSupportCategory with Id: {id}");

            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var childrenChildrenProfileSupportCategory = await unitOfWork.ChildrenProfileSupportCategoryRepository.FindFirst(predicate: d => d.Id == id);
                    apiResponse.Data = _mapper.Map<ChildrenProfileSupportCategory, ChildrenProfileSupportCategoryResource>(childrenChildrenProfileSupportCategory);
                    _logger.LogDebug($"{loggerHeader} - Get ChildrenProfileSupportCategory successfully with Id: {apiResponse.Data.Id}");
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

        public async Task<ApiResponse<QueryResultResource<ChildrenProfileSupportCategoryResource>>> GetchildrenProfileSupportCategories(QueryResource queryObj)
        {
            const string loggerHeader = "GetchildrenProfileSupportCategories";

            var apiResponse = new ApiResponse<QueryResultResource<ChildrenProfileSupportCategoryResource>>();
            var pagingSpecification = new PagingSpecification(queryObj);

            _logger.LogDebug($"{loggerHeader} - Start to getChildrenProfileSupportCategories with");

            using (var unitOfWork = new UnitOfWork(_connectionString))
            {

                try
                {

                    var query = await unitOfWork.ChildrenProfileSupportCategoryRepository.FindAll(predicate: d => d.IsDeleted == false,
                                                                        include: source => source.Include(d => d.SupportCategory),
                                                                        orderBy: null,
                                                                        disableTracking: true,
                                                                        pagingSpecification: pagingSpecification);
                    apiResponse.Data = _mapper.Map<QueryResult<ChildrenProfileSupportCategory>, QueryResultResource<ChildrenProfileSupportCategoryResource>>(query);
                    _logger.LogDebug($"{loggerHeader} - GetChildrenProfileSupportCategories successfully");
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
                _logger.LogDebug($"{loggerHeader} - Start to get ChildrenProfileSupportCategory with email: {currentEmail}");

                using (var unitOfWork = new UnitOfWork(_connectionString))
                {
                    try
                    {
                        _logger.LogDebug($"{loggerHeader} - Get ChildrenProfileSupportCategory successfully with Id: {apiResponse.Data}");
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