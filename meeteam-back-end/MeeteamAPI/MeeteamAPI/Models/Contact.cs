using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace HesserCore.Models.Common
{
    public class Contact {
        [Key]
        [DisplayName("Contacto")]
        public int ID { get; set; }
        [DisplayName("Nombre")]
        public string FirstName { get; set; }
        [DisplayName("Apellido")]
        public string LastName { get; set; }
        [DisplayName("Posicion")]
        public string Position { get; set; }
        [DisplayName("Correos")]
        public virtual IList<Email> Emails { get; set; }
        [DisplayName("Telefonos")]
        public virtual IList<Phone> Phones { get; set; }
    }
}
