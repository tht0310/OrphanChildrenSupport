using Microsoft.AspNetCore.Mvc;
using OrphanChildrenSupport.DataContracts;
using OrphanChildrenSupport.DataContracts.Resources;
using OrphanChildrenSupport.Services.Contracts;
using System.Threading.Tasks;

namespace OrphanChildrenSupport.Controllers.V1
{
    [ApiVersion("1.0")]
    [Route("api/supportCategories")]//required for default versioning
    //[Route("api/v{version:apiVersion}/supportCategories")]
    [ApiController]
    public class SupportCategoryController : Controller
    {
        private ISupportCategoryService _supportCategoryService;

        public SupportCategoryController(ISupportCategoryService supportCategoryService)
        {
            this._supportCategoryService = supportCategoryService;
        }

        // GET: api/supportCategories
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] QueryResource queryResource)
        {
            var apiResponse = await _supportCategoryService.GetSupportCategories(queryResource);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        // GET api/supportCategories/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(long id)
        {
            var apiResponse = await _supportCategoryService.GetSupportCategory(id);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        // POST api/supportCategories
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] SupportCategoryResource SupportCategoryResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Lỗi dữ liệu, vui lòng kiểm tra và thử lại.");
            }

            var apiResponse = await _supportCategoryService.CreateSupportCategory(SupportCategoryResource);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        // PUT api/supportCategories/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(long id, [FromBody] SupportCategoryResource SupportCategoryResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Lỗi dữ liệu, vui lòng kiểm tra và thử lại.");
            }

            var apiResponse = await _supportCategoryService.UpdateSupportCategory(id, SupportCategoryResource);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        // DELETE api/supportCategories/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            var apiResponse = await _supportCategoryService.DeleteSupportCategory(id);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }
    }
}
