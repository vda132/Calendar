using DataAccess.Models;
using DTOs;
using Logic.Logic;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private readonly IEventLogic logic;

        public EventsController(IEventLogic logic) =>
            this.logic = logic;

        [HttpGet]
        public async Task<JsonResult> GetAll() 
        {
            var result = await this.logic.GetAllAsyns();
            var resultEvents = result.OrderBy(x => x.DateTimeFrom);
            
            return new JsonResult(resultEvents);
        }

        [HttpGet("{id}")]
        public async Task<JsonResult> Get(Guid id) =>
            new JsonResult(await this.logic.GetByIdAsync(id));

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] EventDTO dto)
        {
            var model = this.logic.ConvertDTOToEvent(dto);

            if ((await this.logic.AddAsync(model)) == default)
                return this.BadRequest();

            return this.Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(Guid id, [FromBody] EventDTO dto)
        {
            var model = this.logic.ConvertDTOToEvent(dto);

            if(!(await this.logic.UpdateAsync(model, id)))
                return this.BadRequest();

            return this.Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id) =>
            await this.logic.DeleteAsync(id) ? this.Ok() : this.NotFound();
    }
}
