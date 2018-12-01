using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MeeteamAPI.Models
{
    public class Topic
    {
        [Key]
        public int ID { get; set; }
        [DisplayName("Temas del evento")]
        string Value { get; set; }
    }
}
