using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend_sportsintime.Models.LiveBets;
using backend_sportsintime.Models;
namespace backend_sportsintime.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LivebetController : ControllerBase
    {
        private readonly bdContext _context;

        public LivebetController(bdContext context)
        {
            _context = context;
        }

        // GET: api/Livebet
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LiveBet>>> GetLiveBet()
        {
            return await _context.LiveBet.ToListAsync();
        }



        [HttpGet("gameLivebets")]
        public async Task<ActionResult<IEnumerable<GameLiveBet>>> GetGameLiveBet(long Match_Id)
        {
            
           List<GameLiveBet> gameLiveBets = new List<GameLiveBet>();
           
           GameLiveBet toAdd = new GameLiveBet();
           toAdd.type = 1;
           toAdd.firstValue = 0;
           toAdd.secondValue = 0;
           toAdd.thirdValue = 0;
           gameLiveBets.Add(toAdd);

           GameLiveBet toAdd1 = new GameLiveBet();
           toAdd1.type = 2;
           toAdd1.firstValue = 0;
           toAdd1.secondValue = 0;
           gameLiveBets.Add(toAdd1);

           GameLiveBet toAdd2 = new GameLiveBet();
           toAdd2.type = 3;
           toAdd2.firstValue = 0;
           toAdd2.secondValue = 0;
           gameLiveBets.Add(toAdd2);





           for(int i = 0; i < _context.LiveBet.ToArray().Length; i++){

               if(_context.LiveBet.ToList()[i].Match_Id == Match_Id){
                   if(_context.LiveBet.ToList()[i].opcaoVitoria == 1){
                       gameLiveBets[0].firstValue ++;
                   }
                   if(_context.LiveBet.ToList()[i].opcaoVitoria == 2){
                       gameLiveBets[0].secondValue ++;
                   }
                   if(_context.LiveBet.ToList()[i].opcaoVitoria == 3){
                       gameLiveBets[0].thirdValue ++;
                   }//VITORIA EMPATE DERROTA

                   if(_context.LiveBet.ToList()[i].opcaoBTTS == 1){
                        gameLiveBets[1].firstValue ++;
                   }
                    if(_context.LiveBet.ToList()[i].opcaoBTTS == 2){
                        gameLiveBets[1].secondValue ++;
                   }//AMBAS MARCAM

                   if(_context.LiveBet.ToList()[i].opcaoGolos == 1){
                        gameLiveBets[2].firstValue ++;
                   }
                   if(_context.LiveBet.ToList()[i].opcaoGolos == 2){
                        gameLiveBets[2].secondValue ++;
                   }//Golos acima ou abaixo de 2.5
               }

           }
            
            
            
            
            
            return gameLiveBets;
        }









        [HttpGet("userliveBet")]
        public async Task<ActionResult<IEnumerable<UserLiveBet>>> GetUserLiveBet(long userId, long Match_id)
        {

            List<UserLiveBet> listOfBets = new List<UserLiveBet>();
            
            for(int i = 0; i < _context.LiveBet.ToArray().Length; i++){
                if(userId == _context.LiveBet.ToList()[i].UserID && Match_id == _context.LiveBet.ToList()[i].Match_Id){
                    UserLiveBet toAdd = new UserLiveBet();
                    toAdd.type = 1;

                    toAdd.vote = _context.LiveBet.ToList()[i].opcaoVitoria.ToString();
                    if(toAdd.vote != "0"){
                        toAdd.hasVoted = true;
                    }else{
                        toAdd.hasVoted = false;
                    }

                    listOfBets.Add(toAdd);


                    UserLiveBet toAdd1 = new UserLiveBet();
                    toAdd1.type = 2;

                    toAdd1.vote = _context.LiveBet.ToList()[i].opcaoBTTS.ToString();
                    if(toAdd1.vote != "0"){
                        toAdd1.hasVoted = true;
                    }else{
                        toAdd1.hasVoted = false;
                    }

                    listOfBets.Add(toAdd1);

                    UserLiveBet toAdd2 = new UserLiveBet();
                    toAdd2.type = 3;

                    toAdd2.vote = _context.LiveBet.ToList()[i].opcaoGolos.ToString();
                    if(toAdd2.vote != "0"){
                        toAdd2.hasVoted = true;
                    }else{
                        toAdd2.hasVoted = false;
                    }

                    listOfBets.Add(toAdd2);
                }
            }
            return listOfBets;
        }

        // GET: api/Livebet/5
        [HttpGet("{id}")]
        public async Task<ActionResult<LiveBet>> GetLiveBet(long id)
        {
            var liveBet = await _context.LiveBet.FindAsync(id);

            if (liveBet == null)
            {
                return NotFound();
            }

            return liveBet;
        }

        // PUT: api/Livebet/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLiveBet(long id, LiveBet liveBet)
        {
            if (id != liveBet.Id)
            {
                return BadRequest();
            }

            _context.Entry(liveBet).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LiveBetExists(id))
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

        // POST: api/Livebet
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<LiveBet>> PostLiveBet(LiveBet liveBet)
        {




            for(int i = 0; i < _context.LiveBet.ToArray().Length; i++){
                if(liveBet.Match_Id == _context.LiveBet.ToList()[i].Match_Id && liveBet.UserID == _context.LiveBet.ToList()[i].UserID){
                    var liveBet1 = await _context.LiveBet.FindAsync(_context.LiveBet.ToList()[i].Id);
                    if(liveBet1 == null){
                        return NotFound();
                    }
                    if(liveBet.opcaoVitoria != 0){
                        liveBet1.opcaoVitoria = liveBet.opcaoVitoria;
                        await _context.SaveChangesAsync();
                        return NoContent();
                        
                    }
                    if(liveBet.opcaoGolos != 0){
                        liveBet1.opcaoGolos = liveBet.opcaoGolos;
                        await _context.SaveChangesAsync();
                        return NoContent();
                    }
                    if(liveBet.opcaoBTTS != 0){
                        liveBet1.opcaoBTTS = liveBet.opcaoBTTS;
                        await _context.SaveChangesAsync();
                        return NoContent();
                    }
                    
                    
                    
                   

                }

            }

            _context.LiveBet.Add(liveBet);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLiveBet", new { id = liveBet.Id }, liveBet);
        }

        // DELETE: api/Livebet/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLiveBet(long id)
        {
            var liveBet = await _context.LiveBet.FindAsync(id);
            if (liveBet == null)
            {
                return NotFound();
            }

            _context.LiveBet.Remove(liveBet);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LiveBetExists(long id)
        {
            return _context.LiveBet.Any(e => e.Id == id);
        }
    }
}
