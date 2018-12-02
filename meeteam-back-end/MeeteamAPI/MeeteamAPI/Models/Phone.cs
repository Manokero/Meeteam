using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace MeeteamAPI.Models
{
    public class Phone
    {
        [Key]
        [DisplayName("Telefono")]
        public int ID { get; set; }
        [DisplayName("Numero Telefonico")]
        public string Value { get; set; }
    }
}
