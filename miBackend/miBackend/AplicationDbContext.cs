using Microsoft.EntityFrameworkCore;
using miBackend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace miBackend
{
    public class AplicationDbContext : DbContext
    {
        public DbSet<Empleado> Empleado {get; set;}
        public AplicationDbContext(DbContextOptions<AplicationDbContext>options): base(options)
        {

        }
    }
}
