using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Filters;
using OrphanChildrenSupport.Services.Models;
using OrphanChildrenSupport.Tools.HttpContextExtensions;
using System;
using System.Security.Claims;

namespace OrphanChildrenSupport.Tools
{
    public class HttpContextHelper : IHttpContextHelper
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public HttpContextHelper(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public string GetCurrentAccount()
        {
            try
            {
                var account = (Account)_httpContextAccessor.HttpContext.Items["Account"];
                return account.Email;
            }
            catch (Exception)
            {
                return "";
            }
        }
    }
}
