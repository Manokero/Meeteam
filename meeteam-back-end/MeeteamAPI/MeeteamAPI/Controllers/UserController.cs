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


        [HttpPost]
        public ActionResult<TransactionResult> Login([FromBody] User user)
        {
            var UserFound = UserService.Get(user.Name);
            var Result = new TransactionResult(TransactionResult.NO_CONTENT, "No se ha podido procesar la transaccion.");

            if(UserFound != null) {
                if (UserFound.Password == CypherService.Hash(user.Password))
                {
                    Result.Message = "Se ha iniciado sesion exitosamente.";
                    Result.Code = TransactionResult.SUCCESS;
                    Result.Data = new { Key = CypherService.Hash(UserFound.Name + UserFound.Password) };
                }
                else
                {
                    Result.Message = "La clave digitada es incorrecta.";
                    Result.Code = TransactionResult.UNAUTHORIZED;
                }
            }
            else
            {
                Result.Message = "El usuario no existe.";
                Result.Code = TransactionResult.NOT_FOUND;
            }
            return Result;
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
