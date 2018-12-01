using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MeeteamAPI.Models;
using MeeteamAPI.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MeeteamAPI.Controllers
{
    [Route("api/v1/[controller]")]
    public class UserController : Controller
    {
        [HttpPost]
        public void Create([FromBody] User user)
        {
            UserService.Create(user);
        }

        [HttpDelete("{id}")]
        public void Delete(int ID)
        {
            UserService.Delete(UserService.Get(ID));
        }
    }
}
