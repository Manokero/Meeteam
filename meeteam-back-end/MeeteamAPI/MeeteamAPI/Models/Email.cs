using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace MeeteamAPI.Models
{
    public class Email
    {
        [Key]
        [DisplayName("Correo Electronico")]
        public int ID { get; set; }
        [DisplayName("Correo")]
        public string Value { get; set; }
    }
}
