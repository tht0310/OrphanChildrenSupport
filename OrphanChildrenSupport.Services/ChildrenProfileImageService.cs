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
    public class ChildrenProfileImageService : IChildrenProfileImageService
    {

        private string _connectionString;
        private string _folderid;
        private string _type;
        private ICryptoEncryptionHelper _cryptoEncryptionHelper;
        private IHttpContextHelper _httpContextHelper;
        private readonly IMapper _mapper;
        private readonly ILogger<ChildrenProfileImageService> _logger;

        public ChildrenProfileImageService(IMapper mapper, ILogger<ChildrenProfileImageService> logger, IConfiguration config,
            ICryptoEncryptionHelper cryptoEncryptionHelper, IHttpContextHelper httpContextHelper)
        {
            _mapper = mapper;
            _logger = logger;
            _connectionString = config.GetValue<string>("ConnectionStrings:OrphanChildrenSupportConnection") ?? "";
            _folderid = config.GetValue<string>("LibraryApi:ChildrenProfileImageAvatarFolderId") ?? "";
            _type = config.GetValue<string>("LibraryApi:Type") ?? "";
            _cryptoEncryptionHelper = cryptoEncryptionHelper;
            _httpContextHelper = httpContextHelper;
        }

        public async Task<ApiResponse<ChildrenProfileImageResource>> CreateChildrenProfileImage(ChildrenProfileImageResource childrenProfileImageResource)
        {
            const string loggerHeader = "CreateChildrenProfileImage";

            var apiResponse = new ApiResponse<ChildrenProfileImageResource>();
            ChildrenProfileImage childrenProfileImage = _mapper.Map<ChildrenProfileImageResource, ChildrenProfileImage>(childrenProfileImageResource);

            _logger.LogDebug($"{loggerHeader} - Start to add ChildrenProfileImage: {JsonConvert.SerializeObject(childrenProfileImage)}");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    childrenProfileImage.CreatedBy = _httpContextHelper.GetCurrentUser();
                    childrenProfileImage.CreatedTime = DateTime.UtcNow;
                    //childrenProfileImage.ApproverId = null;
                    childrenProfileImage.ModifiedBy = null;
                    await unitOfWork.ChildrenProfileImageRepository.Add(childrenProfileImage);
                    await unitOfWork.SaveChanges();
                    _logger.LogDebug($"{loggerHeader} - Add new ChildrenProfileImage successfully with Id: {childrenProfileImage.Id}");
                    childrenProfileImage = await unitOfWork.ChildrenProfileImageRepository.FindFirst(predicate: d => d.Id == childrenProfileImage.Id);
                    apiResponse.Data = _mapper.Map<ChildrenProfileImage, ChildrenProfileImageResource>(childrenProfileImage);
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

        public async Task<ApiResponse<ChildrenProfileImageResource>> UpdateChildrenProfileImage(long id, ChildrenProfileImageResource childrenProfileImageResource)
        {
            const string loggerHeader = "UpdateChildrenProfileImage";
            var apiResponse = new ApiResponse<ChildrenProfileImageResource>();

            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var childrenProfileImage = await unitOfWork.ChildrenProfileImageRepository.FindFirst(predicate: d => d.Id == id);
                    childrenProfileImage = _mapper.Map<ChildrenProfileImageResource, ChildrenProfileImage>(childrenProfileImageResource, childrenProfileImage);
                    _logger.LogDebug($"{loggerHeader} - Start to update ChildrenProfileImage: {JsonConvert.SerializeObject(childrenProfileImage)}");
                    childrenProfileImage.ModifiedBy = _httpContextHelper.GetCurrentUser();
                    childrenProfileImage.LastModified = DateTime.UtcNow;
                    unitOfWork.ChildrenProfileImageRepository.Update(childrenProfileImage);
                    await unitOfWork.SaveChanges();
                    _logger.LogDebug($"{loggerHeader} - Update ChildrenProfileImage successfully with Id: {childrenProfileImage.Id}");

                    childrenProfileImage = await unitOfWork.ChildrenProfileImageRepository.FindFirst(predicate: d => d.Id == childrenProfileImage.Id);
                    apiResponse.Data = _mapper.Map<ChildrenProfileImage, ChildrenProfileImageResource>(childrenProfileImage);
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

        public async Task<ApiResponse<ChildrenProfileImageResource>> DeleteChildrenProfileImage(long id, bool removeFromDB = false)
        {
            const string loggerHeader = "DeleteChildrenProfileImage";

            var apiResponse = new ApiResponse<ChildrenProfileImageResource>();

            _logger.LogDebug($"{loggerHeader} - Start to delete ChildrenProfileImage with Id: {id}");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var childrenProfileImage = await unitOfWork.ChildrenProfileImageRepository.FindFirst(d => d.Id == id);
                    if (removeFromDB)
                    {
                        unitOfWork.ChildrenProfileImageRepository.Remove(childrenProfileImage);
                    }
                    else
                    {
                        childrenProfileImage.ModifiedBy = _httpContextHelper.GetCurrentUser();
                        childrenProfileImage.IsDeleted = true;
                        childrenProfileImage.LastModified = DateTime.UtcNow;
                        unitOfWork.ChildrenProfileImageRepository.Update(childrenProfileImage);
                    }

                    await unitOfWork.SaveChanges();

                    _logger.LogDebug($"{loggerHeader} - Delete ChildrenProfileImage successfully with Id: {childrenProfileImage.Id}");
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

        public async Task<ApiResponse<ChildrenProfileImageResource>> GetChildrenProfileImage(long id)
        {
            const string loggerHeader = "GetChildrenProfileImage";

            var apiResponse = new ApiResponse<ChildrenProfileImageResource>();

            _logger.LogDebug($"{loggerHeader} - Start to get ChildrenProfileImage with Id: {id}");

            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var childrenProfileImage = await unitOfWork.ChildrenProfileImageRepository.FindFirst(predicate: d => d.Id == id);
                    apiResponse.Data = _mapper.Map<ChildrenProfileImage, ChildrenProfileImageResource>(childrenProfileImage);
                    _logger.LogDebug($"{loggerHeader} - Get ChildrenProfileImage successfully with Id: {id}");
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

        public async Task<ApiResponse<QueryResultResource<ChildrenProfileImageResource>>> GetChildrenProfileImages(QueryResource queryObj)
        {
            const string loggerHeader = "GetChildrenProfileImages";

            var apiResponse = new ApiResponse<QueryResultResource<ChildrenProfileImageResource>>();
            var pagingSpecification = new PagingSpecification(queryObj);

            _logger.LogDebug($"{loggerHeader} - Start to get ChildrenProfileImages with");

            using (var unitOfWork = new UnitOfWork(_connectionString))
            {

                try
                {

                    var query = await unitOfWork.ChildrenProfileImageRepository.FindAll(predicate: d => d.IsDeleted == false,
                                                                        include: null,
                                                                        orderBy: null,
                                                                        disableTracking: true,
                                                                        pagingSpecification: pagingSpecification);
                    apiResponse.Data = _mapper.Map<QueryResult<ChildrenProfileImage>, QueryResultResource<ChildrenProfileImageResource>>(query);
                    _logger.LogDebug($"{loggerHeader} - Get ChildrenProfileImages successfully");
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