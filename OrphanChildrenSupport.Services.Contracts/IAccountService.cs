using OrphanChildrenSupport.DataContracts;
using OrphanChildrenSupport.DataContracts.Resources;
using OrphanChildrenSupport.DataContracts.Responses;
using OrphanChildrenSupport.Models.Accounts;
using OrphanChildrenSupport.Services.Models;
using System.Threading.Tasks;

namespace OrphanChildrenSupport.Services.Contracts
{
    public interface IAccountService
    {
        Task<ApiResponse<AccountResponse>> CreateAccount(CreateRequest createRequest);
        Task<ApiResponse<AccountResponse>> UpdateAccount(long id, UpdateRequest updateRequest);
        Task<ApiResponse<AccountResponse>> UpdateRole(long id, Role role);
        Task<ApiResponse<AccountResponse>> DeactivateAccount(long id);
        Task<ApiResponse<AccountResponse>> ActivateAccount(long id);
        Task<ApiResponse<AccountResponse>> DeleteAccount(long id, bool removeFromDB = false);
        Task<ApiResponse<AccountResponse>> GetAccount(long id);
        Task<ApiResponse<QueryResultResource<AccountResponse>>> GetAccounts(QueryResource queryObj);
        Task<ApiResponse<AuthenticateResponse>> Authenticate(AuthenticateRequest authenticateRequest, string ipAddress);
        Task<ApiResponse<AuthenticateResponse>> RefreshToken(string token, string ipAddress);
        Task<ApiResponse<AuthenticateResponse>> RevokeToken(string token, string ipAddress);
        Task<ApiResponse<RegisterRequest>> Register(RegisterRequest registerRequest, string origin);
        Task<ApiResponse<VerifyEmailRequest>> VerifyEmail(VerifyEmailRequest verifyEmailRequest);
        Task<ApiResponse<ForgotPasswordRequest>> ForgotPassword(ForgotPasswordRequest forgotPasswordRequest, string origin);
        Task<ApiResponse<ValidateResetTokenRequest>> ValidateResetToken(ValidateResetTokenRequest validateResetTokenRequest);
        Task<ApiResponse<ResetPasswordRequest>> ResetPassword(ResetPasswordRequest resetPasswordRequest);
    }
}
