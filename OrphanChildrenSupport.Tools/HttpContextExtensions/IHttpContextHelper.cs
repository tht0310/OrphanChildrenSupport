using Microsoft.AspNetCore.Mvc.Filters;
using OrphanChildrenSupport.Services.Models;

namespace OrphanChildrenSupport.Tools.HttpContextExtensions
{
    public interface IHttpContextHelper
    {
        string GetCurrentAccountEmail();

        Account GetCurrentAccount();
    }
}
