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
    public class RespostaController : ControllerBase
    {
        private readonly bdContext _context;

        public RespostaController(bdContext context)
        {
            _context = context;
        }

        // GET: api/Resposta
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Resposta>>> GetResposta()
        {
            return await _context.Resposta.ToListAsync();
        }

        // GET: api/Resposta/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Resposta>> GetResposta(long id)
        {
            var resposta = await _context.Resposta.FindAsync(id);


            if (resposta == null)
            {
                return NotFound();
            }

            return resposta;
        }


        // GET: api/Resposta
        [HttpGet("predicts/{id}")]
        public async Task<ActionResult<IEnumerable<UserPredict>>> GetUserPredicts(long id)
        {

            List<UserPredict> userPredicts = new List<UserPredict>();

            for (int i = 0; i < _context.Resposta.ToArray().Length; i++)
            {

                if (id == _context.Resposta.ToList()[i].IdUser)
                {
                    var sondagem = await _context.Sondagem.FindAsync(_context.Resposta.ToList()[i].IdSondagem);
                    UserPredict userPredict = new UserPredict();
                    userPredict.matchId = sondagem.IdJogo;
                    userPredict.vote = _context.Resposta.ToList()[i].resposta;

                    userPredicts.Add(userPredict);
                }

            }

            return userPredicts;
        }

        // PUT: api/Resposta/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutResposta(long id, Resposta resposta)
        {
            if (id != resposta.Id)
            {
                return BadRequest();
            }

            _context.Entry(resposta).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RespostaExists(id))
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

        // POST: api/Resposta
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Resposta>> PostResposta(RespostaFromFront userResposta)
        {
            Boolean exists = false;
            long sondagemId = 0;
            List<Sondagem> s1 = new List<Sondagem>();

            for (int i = 0; i < _context.Sondagem.ToArray().Length; i++)
            {
                var s2 = _context.Sondagem.ToArray()[i];
                if (s2 != null)
                {
                    s1.Add(s2);
                }
            }

            for (int i = 0; i < s1.ToArray().Length; i++)
            {
                if (s1.ToArray()[i].IdJogo == Convert.ToInt64(userResposta.matchId))
                {
                    exists = true;
                    sondagemId = s1.ToArray()[i].Id;
                }
            }

            if (exists == false)
            {
                Sondagem toAdd = new Sondagem();
                toAdd.IdJogo = Convert.ToInt64(userResposta.matchId);
                toAdd.Opcao = 0;
                _context.Sondagem.Add(toAdd);
                await _context.SaveChangesAsync();
                Resposta toAdd1 = new Resposta();
                toAdd1.IdUser = Convert.ToInt64(userResposta.idUser);
                toAdd1.resposta = userResposta.resposta;
                toAdd1.IdSondagem = _context.Sondagem.ToList()[_context.Sondagem.ToArray().Length - 1].Id;
                _context.Resposta.Add(toAdd1);
                await _context.SaveChangesAsync();
                return NoContent();

            }


            var sondagem1 = await _context.Sondagem.FindAsync(sondagemId);

            if (sondagem1 == null)
            {
                return NoContent();
            }
            for (int i = 1; i < _context.Resposta.ToArray().Length + 1; i++)
            {

                var answer = await _context.Resposta.FindAsync((long)i);
                if (answer == null)
                {
                }
                else if (answer.IdUser == Convert.ToInt64(userResposta.idUser) && sondagem1.Id == answer.IdSondagem)
                {
                    return NoContent();
                }

            }

            Resposta resposta = new Resposta();


            resposta.IdUser = Convert.ToInt64(userResposta.idUser);
            resposta.resposta = userResposta.resposta;
            resposta.IdSondagem = sondagem1.Id;

            _context.Resposta.Add(resposta);
            await _context.SaveChangesAsync();



            return NoContent();
            /*_context.Resposta.Add(resposta);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetResposta", new { id = resposta.Id }, resposta);*/
        }

        // DELETE: api/Resposta/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteResposta(long id)
        {
            var resposta = await _context.Resposta.FindAsync(id);
            if (resposta == null)
            {
                return NotFound();
            }

            _context.Resposta.Remove(resposta);
            await _context.SaveChangesAsync();

            return NoContent();
        }




        private bool RespostaExists(long id)
        {
            return _context.Resposta.Any(e => e.Id == id);
        }



    }
}
