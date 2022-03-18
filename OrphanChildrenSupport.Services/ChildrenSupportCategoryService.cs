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
    public class ChildrenSupportCategoryService : IChildrenSupportCategoryService
    {

        private string _connectionString;
        private string _folderid;
        private string _type;
        private ICryptoEncryptionHelper _cryptoEncryptionHelper;
        private IHttpContextHelper _httpContextHelper;
        private readonly IMapper _mapper;
        private readonly ILogger<ChildrenSupportCategoryService> _logger;

        public ChildrenSupportCategoryService(IMapper mapper, ILogger<ChildrenSupportCategoryService> logger, IConfiguration config,
            ICryptoEncryptionHelper cryptoEncryptionHelper, IHttpContextHelper httpContextHelper)
        {
            _mapper = mapper;
            _logger = logger;
            _connectionString = config.GetValue<string>("ConnectionStrings:OrphanChildrenSupportConnection") ?? "";
            _folderid = config.GetValue<string>("LibraryApi:ChildrenSupportCategoryAvatarFolderId") ?? "";
            _type = config.GetValue<string>("LibraryApi:Type") ?? "";
            _cryptoEncryptionHelper = cryptoEncryptionHelper;
            _httpContextHelper = httpContextHelper;
        }

        public async Task<ApiResponse<ChildrenSupportCategoryResource>> CreateChildrenSupportCategory(ChildrenSupportCategoryResource childrenChildrenSupportCategoryResource)
        {
            const string loggerHeader = "CreateChildrenSupportCategory";

            var apiResponse = new ApiResponse<ChildrenSupportCategoryResource>();
            ChildrenSupportCategory childrenChildrenSupportCategory = _mapper.Map<ChildrenSupportCategoryResource, ChildrenSupportCategory>(childrenChildrenSupportCategoryResource);

            _logger.LogDebug($"{loggerHeader} - Start to add ChildrenSupportCategory: {JsonConvert.SerializeObject(childrenChildrenSupportCategory)}");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    childrenChildrenSupportCategory.CreatedBy = _httpContextHelper.GetCurrentUser();
                    childrenChildrenSupportCategory.CreatedTime = DateTime.UtcNow;
                    await unitOfWork.ChildrenSupportCategoryRepository.Add(childrenChildrenSupportCategory);
                    await unitOfWork.SaveChanges();
                    _logger.LogDebug($"{loggerHeader} - Add new ChildrenSupportCategory successfully with Id: {childrenChildrenSupportCategory.Id}");
                    childrenChildrenSupportCategory = await unitOfWork.ChildrenSupportCategoryRepository.FindFirst(predicate: d => d.Id == childrenChildrenSupportCategory.Id);
                    apiResponse.Data = _mapper.Map<ChildrenSupportCategory, ChildrenSupportCategoryResource>(childrenChildrenSupportCategory);
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

        public async Task<ApiResponse<ChildrenSupportCategoryResource>> UpdateChildrenSupportCategory(long id, ChildrenSupportCategoryResource childrenChildrenSupportCategoryResource)
        {
            const string loggerHeader = "UpdateChildrenSupportCategory";
            var apiResponse = new ApiResponse<ChildrenSupportCategoryResource>();

            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var childrenChildrenSupportCategory = await unitOfWork.ChildrenSupportCategoryRepository.FindFirst(predicate: d => d.Id == id);
                    childrenChildrenSupportCategory = _mapper.Map<ChildrenSupportCategoryResource, ChildrenSupportCategory>(childrenChildrenSupportCategoryResource, childrenChildrenSupportCategory);
                    _logger.LogDebug($"{loggerHeader} - Start to update ChildrenSupportCategory: {JsonConvert.SerializeObject(childrenChildrenSupportCategory)}");
                    childrenChildrenSupportCategory.ModifiedBy = _httpContextHelper.GetCurrentUser();
                    childrenChildrenSupportCategory.LastModified = DateTime.UtcNow;
                    unitOfWork.ChildrenSupportCategoryRepository.Update(childrenChildrenSupportCategory);
                    await unitOfWork.SaveChanges();
                    _logger.LogDebug($"{loggerHeader} - Update ChildrenSupportCategory successfully with Id: {childrenChildrenSupportCategory.Id}");

                    childrenChildrenSupportCategory = await unitOfWork.ChildrenSupportCategoryRepository.FindFirst(predicate: d => d.Id == childrenChildrenSupportCategory.Id);
                    apiResponse.Data = _mapper.Map<ChildrenSupportCategory, ChildrenSupportCategoryResource>(childrenChildrenSupportCategory);
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

        public async Task<ApiResponse<ChildrenSupportCategoryResource>> DeleteChildrenSupportCategory(long id, bool removeFromDB = false)
        {
            const string loggerHeader = "DeleteChildrenSupportCategory";

            var apiResponse = new ApiResponse<ChildrenSupportCategoryResource>();

            _logger.LogDebug($"{loggerHeader} - Start to delete ChildrenSupportCategory with Id: {id}");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var childrenChildrenSupportCategory = await unitOfWork.ChildrenSupportCategoryRepository.FindFirst(d => d.Id == id);
                    if (removeFromDB)
                    {
                        unitOfWork.ChildrenSupportCategoryRepository.Remove(childrenChildrenSupportCategory);
                    }
                    else
                    {
                        childrenChildrenSupportCategory.ModifiedBy = _httpContextHelper.GetCurrentUser();
                        childrenChildrenSupportCategory.IsDeleted = true;
                        childrenChildrenSupportCategory.LastModified = DateTime.UtcNow;
                        unitOfWork.ChildrenSupportCategoryRepository.Update(childrenChildrenSupportCategory);
                    }

                    await unitOfWork.SaveChanges();

                    _logger.LogDebug($"{loggerHeader} - Delete ChildrenSupportCategory successfully with Id: {childrenChildrenSupportCategory.Id}");
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

        public async Task<ApiResponse<ChildrenSupportCategoryResource>> GetChildrenSupportCategory(long id)
        {
            const string loggerHeader = "GetChildrenSupportCategory";

            var apiResponse = new ApiResponse<ChildrenSupportCategoryResource>();

            _logger.LogDebug($"{loggerHeader} - Start to get ChildrenSupportCategory with Id: {id}");

            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var childrenChildrenSupportCategory = await unitOfWork.ChildrenSupportCategoryRepository.FindFirst(predicate: d => d.Id == id);
                    apiResponse.Data = _mapper.Map<ChildrenSupportCategory, ChildrenSupportCategoryResource>(childrenChildrenSupportCategory);
                    _logger.LogDebug($"{loggerHeader} - Get ChildrenSupportCategory successfully with Id: {apiResponse.Data.Id}");
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

        public async Task<ApiResponse<QueryResultResource<ChildrenSupportCategoryResource>>> GetChildrenSupportCategories(QueryResource queryObj)
        {
            const string loggerHeader = "GetChildrenSupportCategories";

            var apiResponse = new ApiResponse<QueryResultResource<ChildrenSupportCategoryResource>>();
            var pagingSpecification = new PagingSpecification(queryObj);

            _logger.LogDebug($"{loggerHeader} - Start to get ChildrenSupportCategories with");

            using (var unitOfWork = new UnitOfWork(_connectionString))
            {

                try
                {

                    var query = await unitOfWork.ChildrenSupportCategoryRepository.FindAll(predicate: d => d.IsDeleted == false
                                                                                                ,
                                                                        include: null,
                                                                        orderBy: null,
                                                                        disableTracking: true,
                                                                        pagingSpecification: pagingSpecification);
                    apiResponse.Data = _mapper.Map<QueryResult<ChildrenSupportCategory>, QueryResultResource<ChildrenSupportCategoryResource>>(query);
                    _logger.LogDebug($"{loggerHeader} - Get ChildrenSupportCategories successfully");
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
                _logger.LogDebug($"{loggerHeader} - Start to get ChildrenSupportCategory with email: {currentEmail}");

                using (var unitOfWork = new UnitOfWork(_connectionString))
                {
                    try
                    {
                        _logger.LogDebug($"{loggerHeader} - Get ChildrenSupportCategory successfully with Id: {apiResponse.Data}");
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