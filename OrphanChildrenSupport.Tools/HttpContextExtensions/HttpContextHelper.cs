using Microsoft.AspNetCore.Http;
using OrphanChildrenSupport.Tools.HttpContextExtensions;
using System;

namespace OrphanChildrenSupport.Tools
{
    public class HttpContextHelper : IHttpContextHelper
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public HttpContextHelper(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public string GetCurrentUser()
        {
            try
            {
                //return _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.Email).Value;

                return "Admin";
            }
            catch (Exception)
            {
                return "";
            }
        }
    }
}
