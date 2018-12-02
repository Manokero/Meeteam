using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MeeteamAPI.Classes;
using MeeteamAPI.Context;
using MeeteamAPI.Models;
using MeeteamAPI.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MeeteamAPI.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {

        [HttpGet("{id}")]
        public ActionResult<Event> Get(int id)
        {
            return EventService.Get(id);
        }

        [HttpGet]
        public ActionResult<List<Event>> All()
        {
            return EventService.All();
        }

        [HttpPut("id")]
        public void Update(int id, [FromBody] Event localEvent)
        {
            localEvent.ID = id;
            EventService.Update(localEvent);
        }

        [HttpPost]
        public void Create([FromBody] Event localEvent)
        {
            
            EventService.Create(localEvent);
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            EventService.Delete(EventService.Get(id));
        }
    }
}
