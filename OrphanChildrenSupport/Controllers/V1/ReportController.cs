using Microsoft.AspNetCore.Mvc;
using OrphanChildrenSupport.DataContracts;
using OrphanChildrenSupport.DataContracts.Resources;
using OrphanChildrenSupport.Services.Contracts;
using System.Threading.Tasks;

namespace OrphanChildrenSupport.Controllers.V1
{
    [ApiVersion("1.0")]
    [Route("api/reports")]//required for default versioning
    [Route("api/v{version:apiVersion}/reports")]
    [ApiController]
    public class ReportController : Controller
    {
        private IReportService _reportService;

        public ReportController(IReportService reportService)
        {
            this._reportService = reportService;
        }

        // GET: api/reports
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] QueryResource queryResource)
        {
            var apiResponse = await _reportService.GetReports(queryResource);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        // GET api/reports/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(long id)
        {
            var apiResponse = await _reportService.GetReport(id);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        // POST api/reports
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ReportResource ReportResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Lỗi dữ liệu, vui lòng kiểm tra và thử lại.");
            }

            var apiResponse = await _reportService.CreateReport(ReportResource);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        // PUT api/reports/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(long id, [FromBody] ReportResource ReportResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Lỗi dữ liệu, vui lòng kiểm tra và thử lại.");
            }

            var apiResponse = await _reportService.UpdateReport(id, ReportResource);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        // DELETE api/reports/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            var apiResponse = await _reportService.DeleteReport(id);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        [HttpPut]
        [Route("approve/{id}")]
        public async Task<IActionResult> Approve(long id)
        {
            var apiResponse = await _reportService.ApproveReport(id);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        [HttpPut]
        [Route("reject/{id}")]
        public async Task<IActionResult> Reject(long id)
        {
            var apiResponse = await _reportService.RejectReport(id);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        [HttpPut]
        [Route("cancel/{id}")]
        public async Task<IActionResult> Cancel(long id)
        {
            var apiResponse = await _reportService.CancelReport(id);
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }

        [HttpGet]
        [Route("getStatistics")]
        public async Task<IActionResult> Statistic()
        {
            var apiResponse = await _reportService.GetReportStatusStatistics();
            return apiResponse.IsError ? BadRequest(apiResponse.Message) : Ok(apiResponse.Data);
        }
    }
}
