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

        public string GetCurrentAccountEmail()
        {
            try
            {
                var account = (Account)_httpContextAccessor.HttpContext.Items["Account"];
                if (account == null)
                {
                    return "";
                } else
                {

                    return account.Email;
                }
            }
            catch (Exception)
            {
                return "";
            }
        }

        public Account GetCurrentAccount()
        {
            var account = new Account();
            try
            {
                account = (Account)_httpContextAccessor.HttpContext.Items["Account"];
            }
            catch (Exception)
            {

            }
            return account;
        }
    }
}
