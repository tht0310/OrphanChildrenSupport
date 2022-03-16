using Microsoft.AspNetCore.Mvc;
using OrphanChildrenSupport.DataContracts;
using OrphanChildrenSupport.DataContracts.Resources;
using OrphanChildrenSupport.Services.Contracts;
using System.Threading.Tasks;

namespace OrphanChildrenSupport.Controllers.V1
{
    [ApiVersion("1.0")]
    [Route("api/childrenSupportCategories")]//required for default versioning
    [Route("api/v{version:apiVersion}/childrenSupportCategories")]
    [ApiController]
    public class ChildrenSupportCategoryController : Controller
    {
        private IChildrenSupportCategoryService _childrenSupportCategoryService;

        public ChildrenSupportCategoryController(IChildrenSupportCategoryService childrenSupportCategoryService)
        {
            this._childrenSupportCategoryService = childrenSupportCategoryService;
        }

        // GET: api/childrenSupportCategories
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] QueryResource queryResource)
        {
            var apiResponse = await _childrenSupportCategoryService.GetChildrenSupportCategories(queryResource);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        // GET api/childrenSupportCategories/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(long id)
        {
            var apiResponse = await _childrenSupportCategoryService.GetChildrenSupportCategory(id);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        // POST api/childrenSupportCategories
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ChildrenSupportCategoryResource ChildrenSupportCategoryResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Lỗi dữ liệu, vui lòng kiểm tra và thử lại.");
            }

            var apiResponse = await _childrenSupportCategoryService.CreateChildrenSupportCategory(ChildrenSupportCategoryResource);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        // PUT api/childrenSupportCategories/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(long id, [FromBody] ChildrenSupportCategoryResource ChildrenSupportCategoryResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Lỗi dữ liệu, vui lòng kiểm tra và thử lại.");
            }

            var apiResponse = await _childrenSupportCategoryService.UpdateChildrenSupportCategory(id, ChildrenSupportCategoryResource);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        // DELETE api/childrenSupportCategories/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            var apiResponse = await _childrenSupportCategoryService.DeleteChildrenSupportCategory(id);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }
    }
}
