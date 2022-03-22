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
    public class SupportDetailService : ISupportDetailService
    {

        private string _connectionString;
        private string _folderid;
        private string _type;
        private ICryptoEncryptionHelper _cryptoEncryptionHelper;
        private IHttpContextHelper _httpContextHelper;
        private readonly IMapper _mapper;
        private readonly ILogger<SupportDetailService> _logger;

        public SupportDetailService(IMapper mapper, ILogger<SupportDetailService> logger, IConfiguration config,
            ICryptoEncryptionHelper cryptoEncryptionHelper, IHttpContextHelper httpContextHelper)
        {
            _mapper = mapper;
            _logger = logger;
            _connectionString = config.GetValue<string>("ConnectionStrings:OrphanChildrenSupportConnection") ?? "";
            _folderid = config.GetValue<string>("LibraryApi:SupportDetailAvatarFolderId") ?? "";
            _type = config.GetValue<string>("LibraryApi:Type") ?? "";
            _cryptoEncryptionHelper = cryptoEncryptionHelper;
            _httpContextHelper = httpContextHelper;
        }

        public async Task<ApiResponse<SupportDetailResource>> CreateSupportDetail(SupportDetailResource supportCategoryResource)
        {
            const string loggerHeader = "CreateSupportDetail";

            var apiResponse = new ApiResponse<SupportDetailResource>();
            SupportDetail supportCategory = _mapper.Map<SupportDetailResource, SupportDetail>(supportCategoryResource);

            _logger.LogDebug($"{loggerHeader} - Start to add SupportDetail: {JsonConvert.SerializeObject(supportCategory)}");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    supportCategory.CreatedBy = _httpContextHelper.GetCurrentUser();
                    supportCategory.CreatedTime = DateTime.UtcNow;
                    await unitOfWork.SupportDetailRepository.Add(supportCategory);
                    await unitOfWork.SaveChanges();
                    _logger.LogDebug($"{loggerHeader} - Add new SupportDetail successfully with Id: {supportCategory.Id}");
                    supportCategory = await unitOfWork.SupportDetailRepository.FindFirst(predicate: d => d.Id == supportCategory.Id);
                    apiResponse.Data = _mapper.Map<SupportDetail, SupportDetailResource>(supportCategory);
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

        public async Task<ApiResponse<SupportDetailResource>> UpdateSupportDetail(long id, SupportDetailResource supportCategoryResource)
        {
            const string loggerHeader = "UpdateSupportDetail";
            var apiResponse = new ApiResponse<SupportDetailResource>();

            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var supportCategory = await unitOfWork.SupportDetailRepository.FindFirst(predicate: d => d.Id == id);
                    supportCategory = _mapper.Map<SupportDetailResource, SupportDetail>(supportCategoryResource, supportCategory);
                    _logger.LogDebug($"{loggerHeader} - Start to update SupportDetail: {JsonConvert.SerializeObject(supportCategory)}");
                    supportCategory.ModifiedBy = _httpContextHelper.GetCurrentUser();
                    supportCategory.LastModified = DateTime.UtcNow;
                    unitOfWork.SupportDetailRepository.Update(supportCategory);
                    await unitOfWork.SaveChanges();
                    _logger.LogDebug($"{loggerHeader} - Update SupportDetail successfully with Id: {supportCategory.Id}");

                    supportCategory = await unitOfWork.SupportDetailRepository.FindFirst(predicate: d => d.Id == supportCategory.Id);
                    apiResponse.Data = _mapper.Map<SupportDetail, SupportDetailResource>(supportCategory);
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

        public async Task<ApiResponse<SupportDetailResource>> DeleteSupportDetail(long id, bool removeFromDB = false)
        {
            const string loggerHeader = "DeleteSupportDetail";

            var apiResponse = new ApiResponse<SupportDetailResource>();

            _logger.LogDebug($"{loggerHeader} - Start to delete SupportDetail with Id: {id}");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var supportCategory = await unitOfWork.SupportDetailRepository.FindFirst(d => d.Id == id);
                    if (removeFromDB)
                    {
                        unitOfWork.SupportDetailRepository.Remove(supportCategory);
                    }
                    else
                    {
                        supportCategory.ModifiedBy = _httpContextHelper.GetCurrentUser();
                        supportCategory.IsDeleted = true;
                        supportCategory.LastModified = DateTime.UtcNow;
                        unitOfWork.SupportDetailRepository.Update(supportCategory);
                    }

                    await unitOfWork.SaveChanges();

                    _logger.LogDebug($"{loggerHeader} - Delete SupportDetail successfully with Id: {supportCategory.Id}");
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

        public async Task<ApiResponse<SupportDetailResource>> GetSupportDetail(long id)
        {
            const string loggerHeader = "GetSupportDetail";

            var apiResponse = new ApiResponse<SupportDetailResource>();

            _logger.LogDebug($"{loggerHeader} - Start to get SupportDetail with Id: {id}");

            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var supportCategory = await unitOfWork.SupportDetailRepository.FindFirst(predicate: d => d.Id == id);
                    apiResponse.Data = _mapper.Map<SupportDetail, SupportDetailResource>(supportCategory);
                    _logger.LogDebug($"{loggerHeader} - Get SupportDetail successfully with Id: {apiResponse.Data.Id}");
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

        public async Task<ApiResponse<QueryResultResource<SupportDetailResource>>> GetSupportDetails(QueryResource queryObj)
        {
            const string loggerHeader = "GetSupportDetails";

            var apiResponse = new ApiResponse<QueryResultResource<SupportDetailResource>>();
            var pagingSpecification = new PagingSpecification(queryObj);

            _logger.LogDebug($"{loggerHeader} - Start to get SupportDetails with");

            using (var unitOfWork = new UnitOfWork(_connectionString))
            {

                try
                {

                    var query = await unitOfWork.SupportDetailRepository.FindAll(predicate: d => d.IsDeleted == false
                                                                                                ,
                                                                        include: null,
                                                                        orderBy: null,
                                                                        disableTracking: true,
                                                                        pagingSpecification: pagingSpecification);
                    apiResponse.Data = _mapper.Map<QueryResult<SupportDetail>, QueryResultResource<SupportDetailResource>>(query);
                    _logger.LogDebug($"{loggerHeader} - Get SupportDetails successfully");
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
                _logger.LogDebug($"{loggerHeader} - Start to get SupportDetail with email: {currentEmail}");

                using (var unitOfWork = new UnitOfWork(_connectionString))
                {
                    try
                    {
                        _logger.LogDebug($"{loggerHeader} - Get SupportDetail successfully with Id: {apiResponse.Data}");
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