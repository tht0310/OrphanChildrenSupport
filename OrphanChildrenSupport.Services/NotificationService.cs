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
    public class NotificationService : INotificationService
    {

        private string _connectionString;
        private IHttpContextHelper _httpContextHelper;
        private readonly IMapper _mapper;
        private readonly ILogger<NotificationService> _logger;
        private readonly IChangelogService _changelogService;

        public NotificationService(IMapper mapper, ILogger<NotificationService> logger, IConfiguration config, IHttpContextHelper httpContextHelper, IChangelogService changelogService)
        {
            _mapper = mapper;
            _logger = logger;
            _connectionString = config.GetValue<string>("ConnectionStrings:OrphanChildrenSupportConnection") ?? "";
            _httpContextHelper = httpContextHelper;
            _changelogService = changelogService;
        }

        public async Task<ApiResponse<NotificationResource>> CreateNotification(NotificationResource notificationResource)
        {
            const string loggerHeader = "CreateNotification";
            var apiResponse = new ApiResponse<NotificationResource>();
            Notification notification = _mapper.Map<NotificationResource, Notification>(notificationResource);
            _logger.LogDebug($"{loggerHeader} - Start to CreateNotification: {JsonConvert.SerializeObject(notification)}");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    notification.CreatedBy = _httpContextHelper.GetCurrentAccountEmail();
                    notification.CreatedTime = DateTime.UtcNow;
                    await unitOfWork.NotificationRepository.Add(notification);
                    await unitOfWork.SaveChanges();
                    notification = await unitOfWork.NotificationRepository.FindFirst(predicate: d => d.Id == notification.Id);
                    apiResponse.Data = _mapper.Map<Notification, NotificationResource>(notification);
                    _logger.LogDebug($"{loggerHeader} - CreateNotification successfully with Id: {notification.Id}");

                    var changelogResource = new ChangelogResource();
                    changelogResource.Service = "Notification";
                    changelogResource.API = $"{loggerHeader} - CreateNotification successfully with Id: {notification.Id}";
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

        public async Task<ApiResponse<NotificationResource>> UpdateNotification(long id, NotificationResource notificationResource)
        {
            const string loggerHeader = "UpdateNotification";
            var apiResponse = new ApiResponse<NotificationResource>();
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var notification = await unitOfWork.NotificationRepository.FindFirst(predicate: d => d.Id == id);
                    notification = _mapper.Map<NotificationResource, Notification>(notificationResource, notification);
                    _logger.LogDebug($"{loggerHeader} - Start to UpdateNotification: {JsonConvert.SerializeObject(notification)}");
                    notification.ModifiedBy = _httpContextHelper.GetCurrentAccountEmail();
                    notification.LastModified = DateTime.UtcNow;
                    unitOfWork.NotificationRepository.Update(notification);
                    await unitOfWork.SaveChanges();
                    notification = await unitOfWork.NotificationRepository.FindFirst(predicate: d => d.Id == notification.Id);
                    apiResponse.Data = _mapper.Map<Notification, NotificationResource>(notification);
                    _logger.LogDebug($"{loggerHeader} - UpdateNotification successfully with Id: {notification.Id}");

                    var changelogResource = new ChangelogResource();
                    changelogResource.Service = "Notification";
                    changelogResource.API = $"{loggerHeader} - UpdateNotification successfully with Id: {notification.Id}";
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

        public async Task<ApiResponse<NotificationResource>> DeleteNotification(long id, bool removeFromDB = false)
        {
            const string loggerHeader = "DeleteNotification";
            var apiResponse = new ApiResponse<NotificationResource>();
            _logger.LogDebug($"{loggerHeader} - Start to DeleteNotification with Id: {id}");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var notification = await unitOfWork.NotificationRepository.FindFirst(d => d.Id == id);
                    if (removeFromDB)
                    {
                        unitOfWork.NotificationRepository.Remove(notification);
                    }
                    else
                    {
                        notification.ModifiedBy = _httpContextHelper.GetCurrentAccountEmail();
                        notification.IsDeleted = true;
                        notification.LastModified = DateTime.UtcNow;
                        unitOfWork.NotificationRepository.Update(notification);
                    }
                    await unitOfWork.SaveChanges();
                    _logger.LogDebug($"{loggerHeader} - DeleteNotification successfully with Id: {notification.Id}");

                    var changelogResource = new ChangelogResource();
                    changelogResource.Service = "Notification";
                    changelogResource.API = $"{loggerHeader} - DeleteNotification successfully with Id: {notification.Id}";
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

        public async Task<ApiResponse<NotificationResource>> GetNotification(long id)
        {
            const string loggerHeader = "GetNotification";
            var apiResponse = new ApiResponse<NotificationResource>();
            _logger.LogDebug($"{loggerHeader} - Start to GetNotification with Id: {id}");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var notification = await unitOfWork.NotificationRepository.FindFirst(predicate: d => d.Id == id);
                    apiResponse.Data = _mapper.Map<Notification, NotificationResource>(notification);
                    _logger.LogDebug($"{loggerHeader} - GetNotification successfully with Id: {apiResponse.Data.Id}");
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

        public async Task<ApiResponse<QueryResultResource<NotificationResource>>> GetNotifications(QueryResource queryObj)
        {
            const string loggerHeader = "GetNotifications";
            var apiResponse = new ApiResponse<QueryResultResource<NotificationResource>>();
            var pagingSpecification = new PagingSpecification(queryObj);
            _logger.LogDebug($"{loggerHeader} - Start to GetNotifications");
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var query = await unitOfWork.NotificationRepository.FindAll(predicate: d => d.IsDeleted == false,
                                                                        include: null,
                                                                        orderBy: null,
                                                                        disableTracking: true,
                                                                        pagingSpecification: pagingSpecification);
                    apiResponse.Data = _mapper.Map<QueryResult<Notification>, QueryResultResource<NotificationResource>>(query);
                    _logger.LogDebug($"{loggerHeader} - GetNotifications successfully");
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
        
        public async Task<ApiResponse<NotificationResource>> SeenNotification(long id)
        {
            const string loggerHeader = "SeenNotification";
            var apiResponse = new ApiResponse<NotificationResource>();
            using (var unitOfWork = new UnitOfWork(_connectionString))
            {
                try
                {
                    var notification = await unitOfWork.NotificationRepository.FindFirst(predicate: d => d.Id == id);
                    _logger.LogDebug($"{loggerHeader} - Start to SeenNotification");
                    notification.ModifiedBy = _httpContextHelper.GetCurrentAccountEmail();
                    notification.SeenTime = DateTime.UtcNow;
                    notification.IsSeen = true;
                    unitOfWork.NotificationRepository.Update(notification);
                    await unitOfWork.SaveChanges();
                    notification = await unitOfWork.NotificationRepository.FindFirst(predicate: d => d.Id == notification.Id);
                    apiResponse.Data = _mapper.Map<Notification, NotificationResource>(notification);
                    _logger.LogDebug($"{loggerHeader} - SeenNotification successfully with Id: {notification.Id}");

                    var changelogResource = new ChangelogResource();
                    changelogResource.Service = "Notification";
                    changelogResource.API = $"{loggerHeader} - SeenNotification successfully with Id: {notification.Id}";
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
    }
}