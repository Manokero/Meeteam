﻿using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace MeeteamAPI.Models
{
    public class UserType
    {
        [Key]
        [DisplayName("Tipo de usuario")]
        public int ID { get; set; }
        [DisplayName("Nombre de tipo de usuario")]
        public string Name { get; set; }

    }
}
