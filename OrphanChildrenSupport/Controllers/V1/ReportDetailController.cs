using Microsoft.AspNetCore.Mvc;
using OrphanChildrenSupport.DataContracts;
using OrphanChildrenSupport.DataContracts.Resources;
using OrphanChildrenSupport.Services.Contracts;
using System.Threading.Tasks;

namespace OrphanChildrenSupport.Controllers.V1
{
    [ApiVersion("1.0")]
    [Route("api/reportDetails")]//required for default versioning
    //[Route("api/v{version:apiVersion}/reportDetails")]
    [ApiController]
    public class ReportDetailController : Controller
    {
        private IReportDetailService _reportDetailService;

        public ReportDetailController(IReportDetailService reportDetailService)
        {
            this._reportDetailService = reportDetailService;
        }

        // GET: api/reportDetails
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] QueryResource queryResource)
        {
            var apiResponse = await _reportDetailService.GetReportDetails(queryResource);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        // GET api/reportDetails/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(long id)
        {
            var apiResponse = await _reportDetailService.GetReportDetail(id);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        // POST api/reportDetails
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ReportDetailResource ReportDetailResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Lỗi dữ liệu, vui lòng kiểm tra và thử lại.");
            }

            var apiResponse = await _reportDetailService.CreateReportDetail(ReportDetailResource);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        // PUT api/reportDetails/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(long id, [FromBody] ReportDetailResource ReportDetailResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Lỗi dữ liệu, vui lòng kiểm tra và thử lại.");
            }

            var apiResponse = await _reportDetailService.UpdateReportDetail(id, ReportDetailResource);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        // DELETE api/reportDetails/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            var apiResponse = await _reportDetailService.DeleteReportDetail(id);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        [HttpPut]
        [Route("approve/{id}")]
        public async Task<IActionResult> Approve(long id)
        {
            var apiResponse = await _reportDetailService.ApproveReportDetail(id);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        [HttpPut]
        [Route("reject/{id}")]
        public async Task<IActionResult> Reject(long id)
        {
            var apiResponse = await _reportDetailService.RejectReportDetail(id);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        [HttpPut]
        [Route("cancel/{id}")]
        public async Task<IActionResult> Cancel(long id)
        {
            var apiResponse = await _reportDetailService.CancelReportDetail(id);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }
    }
}
