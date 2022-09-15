using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;

namespace miBackend.Models
{
    public class Empleado
    {
        [Key]
        public int idEmpleado { get; set; }

        [Required]
        public string nombreEmpleado { get; set; }
        [Required]
        public string ci { get; set; }
        [Required]
        public string nacionalidad { get; set; }
        [Required]
        public string sexo { get; set; }
        [Required]
        public DateTime fechaNacimiento { get; set; }
        [Required]
        public DateTime fechaInicio { get; set; }
    }
}
