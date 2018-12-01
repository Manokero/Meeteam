using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace HesserCore.Models.Common
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
