using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace MeeteamAPI.Models
{
    public class User {
        [Key]
        [DisplayName("Usuario")]
        public int ID { get; set; }
        [DisplayName("Nombre de usuario")]
        public string UserName { get; set; }
        [DisplayName("Clave")]
        public string Password { get; set; }
        [DisplayName("Tipo de usuario")]
        public UserType UserType { get; set; }
        [DisplayName("Estatus del usuario")]
        public int Status { get; set; }
        [DisplayName("Informacion de Contacto")]
        public Contact Contact { get; set; }
    }
}
