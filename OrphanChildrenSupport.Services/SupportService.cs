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
    public class SupportService : ISupportService
    {

        private string _connectionString;
        private string _folderid;
        private string _type;
        private ICryptoEncryptionHelper _cryptoEncryptionHelper;
        private IHttpContextHelper _httpContextHelper;
        private readonly IMapper _mapper;
        private readonly ILogger<SupportService> _logger;

        public SupportService(IMapper mapper, ILogger<SupportService> logger, IConfiguration config,
            ICryptoEncryptionHelper cryptoEncryptionHelper, IHttpContextHelper httpContextHelper)
        {
            _mapper = mapper;
            _logger = logger;
            _connectionString = config.GetValue<string>("ConnectionStrings:OrphanChildrenSupportConnection") ?? "";
            _folderid = config.GetValue<string>("LibraryApi:SupportAvatarFolderId") ?? "";
            _type = config.GetValue<string>("LibraryApi:Type") ?? "";
            _cryptoEncryptionHelper = cryptoEncryptionHelper;
            _httpContextHelper = httpContextHelper;
        }

        public async Task<ApiResponse<SupportResource>> CreateSupport(SupportResource supportResource)
        {
            const string loggerHeader = "CreateSupport";

            var apiResponse = new ApiResponse<SupportResource>();
            Support support = _mapper.Map<SupportResource, Support>(supportResource);

            _logger.LogDebug($"{loggerHeader} - Start to add Support: {JsonConvert.SerializeObject(support)}");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    support.CreatedBy = _httpContextHelper.GetCurrentUser();
                    support.CreatedTime = DateTime.UtcNow;
                    await unitOfWork.SupportRepository.Add(support);
                    await unitOfWork.SaveChanges();
                    _logger.LogDebug($"{loggerHeader} - Add new Support successfully with Id: {support.Id}");
                    support = await unitOfWork.SupportRepository.FindFirst(predicate: d => d.Id == support.Id);
                    apiResponse.Data = _mapper.Map<Support, SupportResource>(support);
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

        public async Task<ApiResponse<SupportResource>> UpdateSupport(long id, SupportResource supportResource)
        {
            const string loggerHeader = "UpdateSupport";
            var apiResponse = new ApiResponse<SupportResource>();

            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var support = await unitOfWork.SupportRepository.FindFirst(predicate: d => d.Id == id);
                    support = _mapper.Map<SupportResource, Support>(supportResource, support);
                    _logger.LogDebug($"{loggerHeader} - Start to update Support: {JsonConvert.SerializeObject(support)}");
                    support.ModifiedBy = _httpContextHelper.GetCurrentUser();
                    support.LastModified = DateTime.UtcNow;
                    unitOfWork.SupportRepository.Update(support);
                    await unitOfWork.SaveChanges();
                    _logger.LogDebug($"{loggerHeader} - Update Support successfully with Id: {support.Id}");

                    support = await unitOfWork.SupportRepository.FindFirst(predicate: d => d.Id == support.Id);
                    apiResponse.Data = _mapper.Map<Support, SupportResource>(support);
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

        public async Task<ApiResponse<SupportResource>> DeleteSupport(long id, bool removeFromDB = false)
        {
            const string loggerHeader = "DeleteSupport";

            var apiResponse = new ApiResponse<SupportResource>();

            _logger.LogDebug($"{loggerHeader} - Start to delete Support with Id: {id}");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var support = await unitOfWork.SupportRepository.FindFirst(d => d.Id == id);
                    if (removeFromDB)
                    {
                        unitOfWork.SupportRepository.Remove(support);
                    }
                    else
                    {
                        support.ModifiedBy = _httpContextHelper.GetCurrentUser();
                        support.IsDeleted = true;
                        support.LastModified = DateTime.UtcNow;
                        unitOfWork.SupportRepository.Update(support);
                    }

                    await unitOfWork.SaveChanges();

                    _logger.LogDebug($"{loggerHeader} - Delete Support successfully with Id: {support.Id}");
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

        public async Task<ApiResponse<SupportResource>> GetSupport(long id)
        {
            const string loggerHeader = "GetSupport";

            var apiResponse = new ApiResponse<SupportResource>();

            _logger.LogDebug($"{loggerHeader} - Start to get Support with Id: {id}");

            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var support = await unitOfWork.SupportRepository.FindFirst(predicate: d => d.Id == id);
                    apiResponse.Data = _mapper.Map<Support, SupportResource>(support);
                    _logger.LogDebug($"{loggerHeader} - Get Support successfully with Id: {apiResponse.Data.Id}");
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

        public async Task<ApiResponse<QueryResultResource<SupportResource>>> GetSupports(QueryResource queryObj)
        {
            const string loggerHeader = "GetSupports";

            var apiResponse = new ApiResponse<QueryResultResource<SupportResource>>();
            var pagingSpecification = new PagingSpecification(queryObj);

            _logger.LogDebug($"{loggerHeader} - Start to get Supports with");

            using (var unitOfWork = new UnitOfWork(_connectionString))
            {

                try
                {

                    var query = await unitOfWork.SupportRepository.FindAll(predicate: d => d.IsDeleted == false
                                                                                                ,
                                                                        include: null,
                                                                        orderBy: null,
                                                                        disableTracking: true,
                                                                        pagingSpecification: pagingSpecification);
                    apiResponse.Data = _mapper.Map<QueryResult<Support>, QueryResultResource<SupportResource>>(query);
                    _logger.LogDebug($"{loggerHeader} - Get Supports successfully");
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
                _logger.LogDebug($"{loggerHeader} - Start to get Support with email: {currentEmail}");

                using (var unitOfWork = new UnitOfWork(_connectionString))
                {
                    try
                    {
                        _logger.LogDebug($"{loggerHeader} - Get Support successfully with Id: {apiResponse.Data}");
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