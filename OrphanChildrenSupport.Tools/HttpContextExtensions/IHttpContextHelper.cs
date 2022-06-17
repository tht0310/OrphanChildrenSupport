using Microsoft.AspNetCore.Mvc.Filters;

namespace OrphanChildrenSupport.Tools.HttpContextExtensions
{
    public interface IHttpContextHelper
    {
        string GetCurrentAccount();
    }
}
