using OrphanChildrenSupport.DataContracts;
using OrphanChildrenSupport.DataContracts.Resources;
using System.Threading.Tasks;

namespace OrphanChildrenSupport.Services.Contracts
{
    public interface INotificationService
    {
        Task<ApiResponse<NotificationResource>> CreateNotification(NotificationResource notificationResource);
        Task<ApiResponse<NotificationResource>> UpdateNotification(long id, NotificationResource notificationResource);
        Task<ApiResponse<NotificationResource>> DeleteNotification(long id, bool removeFromDB = false);
        Task<ApiResponse<NotificationResource>> GetNotification(long id);
        Task<ApiResponse<QueryResultResource<NotificationResource>>> GetNotifications(QueryResource queryObj);
        Task<ApiResponse<NotificationResource>> SeenNotification(long id);
    }
}
