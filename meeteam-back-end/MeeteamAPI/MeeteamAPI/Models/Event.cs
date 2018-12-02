using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MeeteamAPI.Models
{
    public class Event
    {
        [Key]
        [DisplayName("EventId")]
        public int ID { get; set; }
        [DisplayName("Nombre del evento")]
        public string Title { get; set; }
        [DisplayName("Organizador del evento")]
        public User Organizer { get; set; }
        [DisplayName("Descripcion del evento")]
        public string Description { get; set; }
        [DisplayName("Fecha del evento")]
        public DateTime Date { get; set; }
        [DisplayName("Lugar del evento")]
        public Location Location { get; set; }
        [DisplayName("Temas del evento")]
        public List<Topic> Topics { get; set; }
        [DisplayName("Usuarios registrados")]
        public List<User> RegisteredUsers { get; set; }
    }
}
