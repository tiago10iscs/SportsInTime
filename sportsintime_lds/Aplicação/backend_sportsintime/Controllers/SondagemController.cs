using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend_sportsintime.Models;

namespace backend_sportsintime.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SondagemController : ControllerBase
    {
        private readonly bdContext _context;

        public SondagemController(bdContext context)
        {
            _context = context;
        }

        // GET: api/Sondagem
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Sondagem>>> GetSondagem()
        {
            return await _context.Sondagem.ToListAsync();
        }

        // GET: api/Sondagem/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Sondagem>> GetSondagem(long id)
        {
            var sondagem = await _context.Sondagem.FindAsync(id);

            if (sondagem == null)
            {
                return NotFound();
            }

            return sondagem;
        }

        // PUT: api/Sondagem/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSondagem(long id, Sondagem sondagem)
        {
            if (id != sondagem.Id)
            {
                return BadRequest();
            }

            _context.Entry(sondagem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SondagemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Sondagem
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Sondagem>> PostSondagem(Sondagem sondagem)
        {
            _context.Sondagem.Add(sondagem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSondagem", new { id = sondagem.Id }, sondagem);
        }

        // DELETE: api/Sondagem/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSondagem(long id)
        {
            var sondagem = await _context.Sondagem.FindAsync(id);
            if (sondagem == null)
            {
                return NotFound();
            }

            _context.Sondagem.Remove(sondagem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SondagemExists(long id)
        {
            return _context.Sondagem.Any(e => e.Id == id);
        }
    }
}
