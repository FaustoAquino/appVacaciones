using miBackend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace miBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmpleadoController : ControllerBase
    {
        private readonly AplicationDbContext _context;
        public EmpleadoController(AplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/<EmpleadoController> metodo publico asincrono
        [Route("GetEmpleado/{idEmpleado}")]
        [HttpGet]
        public Empleado GetEmpleado(int idEmpleado)
        {
                return _context.Empleado.Find(idEmpleado);
        }

            // GET: api/<EmpleadoController> metodo publico asincrono
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var listEmpleados = await _context.Empleado.ToListAsync();
                return Ok(listEmpleados);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET api/<EmpleadoController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<EmpleadoController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Empleado empleado)
        {
            try
            {
                _context.Add(empleado);
                await _context.SaveChangesAsync();
                return Ok(empleado);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<EmpleadoController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Empleado empleado)
        {
            try
            {
                if (id != empleado.idEmpleado)
                {
                    return NotFound();
                }
                _context.Update(empleado);
                await _context.SaveChangesAsync();
                return Ok(new { message = "los datos fueron actualizados con exito" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);

            }
        }

        // DELETE api/<EmpleadoController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var empleado = await _context.Empleado.FindAsync(id);
                if (empleado == null)
                {
                    return NotFound();
                }
                _context.Empleado.Remove(empleado);
                await _context.SaveChangesAsync();
                return Ok(new { message = "los datos fueron eliminados con exito" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);

            }
        }
    }
}
