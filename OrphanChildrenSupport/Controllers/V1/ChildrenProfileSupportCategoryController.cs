using Microsoft.AspNetCore.Mvc;
using OrphanChildrenSupport.DataContracts;
using OrphanChildrenSupport.DataContracts.Resources;
using OrphanChildrenSupport.Services.Contracts;
using System.Threading.Tasks;

namespace OrphanChildrenSupport.Controllers.V1
{
    [ApiVersion("1.0")]
    [Route("api/childrenProfileSupportCategories")]//required for default versioning
    //[Route("api/v{version:apiVersion}/childrenProfileSupportCategories")]
    [ApiController]
    public class ChildrenProfileSupportCategoryController : Controller
    {
        private IChildrenProfileSupportCategoryService _childrenProfileSupportCategoryService;

        public ChildrenProfileSupportCategoryController(IChildrenProfileSupportCategoryService childrenProfileSupportCategoryService)
        {
            this._childrenProfileSupportCategoryService = childrenProfileSupportCategoryService;
        }

        // GET: api/childrenProfileSupportCategories
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] QueryResource queryResource)
        {
            var apiResponse = await _childrenProfileSupportCategoryService.GetChildrenProfileSupportCategories(queryResource);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        // GET api/childrenProfileSupportCategories/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(long id)
        {
            var apiResponse = await _childrenProfileSupportCategoryService.GetChildrenProfileSupportCategory(id);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        // POST api/childrenProfileSupportCategories
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ChildrenProfileSupportCategoryResource ChildrenProfileSupportCategoryResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Lỗi dữ liệu, vui lòng kiểm tra và thử lại.");
            }

            var apiResponse = await _childrenProfileSupportCategoryService.CreateChildrenProfileSupportCategory(ChildrenProfileSupportCategoryResource);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        // PUT api/childrenProfileSupportCategories/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(long id, [FromBody] ChildrenProfileSupportCategoryResource ChildrenProfileSupportCategoryResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Lỗi dữ liệu, vui lòng kiểm tra và thử lại.");
            }

            var apiResponse = await _childrenProfileSupportCategoryService.UpdateChildrenProfileSupportCategory(id, ChildrenProfileSupportCategoryResource);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        // DELETE api/childrenProfileSupportCategories/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            var apiResponse = await _childrenProfileSupportCategoryService.DeleteChildrenProfileSupportCategory(id);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }
    }
}
