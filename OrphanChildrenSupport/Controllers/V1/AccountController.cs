using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OrphanChildrenSupport.DataContracts.Resources;
using OrphanChildrenSupport.DataContracts.Responses;
using OrphanChildrenSupport.Models.Accounts;
using OrphanChildrenSupport.Services.Contracts;
using OrphanChildrenSupport.Services.Models;
using System;
using System.Threading.Tasks;

namespace OrphanChildrenSupport.Controllers.V1
{
    [ApiVersion("1.0")]
    [Route("api/accounts")]
    [Route("api/v{version:apiVersion}/accounts")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;
        private readonly IMapper _mapper;

        public AccountController(
            IAccountService accountService,
            IMapper mapper)
        {
            _accountService = accountService;
            _mapper = mapper;
        }

        [HttpPost("authenticate")]
        public async Task<ActionResult<AuthenticateResponse>> Authenticate(AuthenticateRequest model)
        {
            var apiResponse = await _accountService.Authenticate(model, ipAddress());
            if (!apiResponse.IsError)
            {

                setTokenCookie(apiResponse.Data.RefreshToken);
            }
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        [HttpPost("refresh-token")]
        public async Task<ActionResult<AuthenticateResponse>> RefreshToken()
        {
            var refreshToken = Request.Cookies["refreshToken"];
            var apiResponse = await _accountService.RefreshToken(refreshToken, ipAddress());
            if (!apiResponse.IsError)
            {

                setTokenCookie(apiResponse.Data.RefreshToken);
            }
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        //[Authorize]
        [HttpPost("revoke-token")]
        public async Task<ActionResult<AuthenticateResponse>> RevokeToken(RevokeTokenRequest model)
        {
            var token = model.Token ?? Request.Cookies["refreshToken"];
            if (string.IsNullOrEmpty(token))
            {
                return BadRequest(new { message = "Token is required" });
            }
            var apiResponse = await _accountService.RevokeToken(token, ipAddress());
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(new { message = "Token revoked" });
        }

        [HttpPost("register")]
        public async Task<ActionResult<RegisterRequest>> Register(RegisterRequest model)
        {
            var apiResponse = await _accountService.Register(model, Request.Headers["origin"]);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(new { message = "Registration successful, please check your email for verification instructions" });
        }

        [HttpPost("verify-email")]
        public async Task<ActionResult<VerifyEmailRequest>> VerifyEmail(VerifyEmailRequest model)
        {
            var apiResponse = await _accountService.VerifyEmail(model);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(new { message = "Verification successful, you can now login" });
        }

        [HttpPost("forgot-password")]
        public async Task<ActionResult<ForgotPasswordRequest>> ForgotPassword(ForgotPasswordRequest model)
        {
            var apiResponse = await _accountService.ForgotPassword(model, Request.Headers["origin"]);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(new { message = "Please check your email for password reset instructions" });
        }

        [HttpPost("validate-reset-token")]
        public async Task<ActionResult<ValidateResetTokenRequest>> ValidateResetToken(ValidateResetTokenRequest model)
        {
            var apiResponse = await _accountService.ValidateResetToken(model);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(new { message = "Token is valid" });
        }

        [HttpPost("reset-password")]
        public async Task<ActionResult<ResetPasswordRequest>> ResetPassword(ResetPasswordRequest model)
        {
            var apiResponse = await _accountService.ResetPassword(model);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(new { message = "Password reset successful, you can now login" });
        }

        //[Authorize(Role.Admin, Role.SystemUser)]
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] QueryResource queryResource)
        {
            var apiResponse = await _accountService.GetAccounts(queryResource);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        //[Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(long id)
        {
            var apiResponse = await _accountService.GetAccount(id);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        //[Authorize(Role.Admin)]
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CreateRequest createRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Lỗi dữ liệu, vui lòng kiểm tra và thử lại.");
            }
            var apiResponse = await _accountService.CreateAccount(createRequest);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        //[Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(long id, [FromBody] UpdateRequest updateRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Lỗi dữ liệu, vui lòng kiểm tra và thử lại.");
            }

            var apiResponse = await _accountService.UpdateAccount(id, updateRequest);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        //[Authorize(Role.Admin, Role.SystemUser)]
        [HttpPut]
        [Route("{id}/update-role")]
        public async Task<IActionResult> UpdateRole(long id, Role role)
        {
            var apiResponse = await _accountService.UpdateRole(id, role);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        //[Authorize(Role.Admin, Role.SystemUser)]
        [HttpPut]
        [Route("deactivate-account/{id}")]
        public async Task<IActionResult> DeactivateAccount(long id)
        {
            var apiResponse = await _accountService.DeactivateAccount(id);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        //[Authorize(Role.Admin, Role.SystemUser)]
        [HttpPut]
        [Route("activate-account/{id}")]
        public async Task<IActionResult> ActivateAccount(long id)
        {
            var apiResponse = await _accountService.ActivateAccount(id);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        //[Authorize(Role.Admin, Role.SystemUser)]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            var apiResponse = await _accountService.DeleteAccount(id);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        // helper methods

        private void setTokenCookie(string token)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = DateTime.UtcNow.AddDays(7)
            };
            Response.Cookies.Append("refreshToken", token, cookieOptions);
        }

        private string ipAddress()
        {
            if (Request.Headers.ContainsKey("X-Forwarded-For"))
                return Request.Headers["X-Forwarded-For"];
            else
                return HttpContext.Connection.RemoteIpAddress.MapToIPv4().ToString();
        }
    }
}
