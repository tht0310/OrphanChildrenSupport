using Microsoft.AspNetCore.Mvc;
using OrphanChildrenSupport.DataContracts;
using OrphanChildrenSupport.DataContracts.Resources;
using OrphanChildrenSupport.Services.Contracts;
using System.Threading.Tasks;

namespace OrphanChildrenSupport.Controllers.V1
{
    [ApiVersion("1.0")]
    [Route("api/reportFieldCategories")]//required for default versioning
    [Route("api/v{version:apiVersion}/reportFieldCategories")]
    [ApiController]
    public class ReportFieldCategoryController : Controller
    {
        private IReportFieldCategoryService _reportFieldCategoryService;

        public ReportFieldCategoryController(IReportFieldCategoryService reportFieldCategoryService)
        {
            this._reportFieldCategoryService = reportFieldCategoryService;
        }

        // GET: api/reportFieldCategories
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] QueryResource queryResource)
        {
            var apiResponse = await _reportFieldCategoryService.GetReportFieldCategories(queryResource);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        // GET api/reportFieldCategories/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(long id)
        {
            var apiResponse = await _reportFieldCategoryService.GetReportFieldCategory(id);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        // POST api/reportFieldCategories
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ReportFieldCategoryResource ReportFieldCategoryResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Lỗi dữ liệu, vui lòng kiểm tra và thử lại.");
            }

            var apiResponse = await _reportFieldCategoryService.CreateReportFieldCategory(ReportFieldCategoryResource);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        // PUT api/reportFieldCategories/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(long id, [FromBody] ReportFieldCategoryResource ReportFieldCategoryResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Lỗi dữ liệu, vui lòng kiểm tra và thử lại.");
            }

            var apiResponse = await _reportFieldCategoryService.UpdateReportFieldCategory(id, ReportFieldCategoryResource);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        // DELETE api/reportFieldCategories/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            var apiResponse = await _reportFieldCategoryService.DeleteReportFieldCategory(id);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }
    }
}
