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
    public class UserController : ControllerBase
    {

        [HttpGet("{id}")]
        public ActionResult<User> Get(int id) {
            return UserService.Get(id);
        }



        [HttpPut("id")]
        public void Update(int id, [FromBody] User user)
        {
            user.ID = id;
            UserService.Update(user);
        }

        [HttpPost]
        public void Create([FromBody] User user)
        {
            UserService.Create(user);
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            UserService.Delete(UserService.Get(id));
        }
    }
}
