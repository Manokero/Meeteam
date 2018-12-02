using System;
using System.ComponentModel.DataAnnotations;

namespace MeeteamAPI.Models
{
    public class Location
    {
        [Key]
        public int ID { get; set; }
        public string LatLng { get; set; }
        public DateTime Date { get; set; }
    }
}
