
using Microsoft.AspNetCore.Mvc;
using backend_sportsintime.Models;

/**
Controller que permite gerir estatisticas de um determinado jogo, utiizando os metodos do model das Stats
e filtrando os dados, enviando apenas aqueles que serão necessários no front-end
*/

namespace backend_sportsintime.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameStatsController : ControllerBase
    {

        public GameStatsController()
        {
        }

        // GET: api/GameStats
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GameStats>>> GetGameStats()
        {
            GameStats game = new GameStats();
            GameStats [] stats = await game.getStatsAsync();
            return stats;
        }

        // GET: api/GameStats/5
        [HttpGet("{id}")]
        public async Task<ActionResult<GameStats>> GetGameStats(String id)
        {
            GameStats gm = new GameStats();
            GameStats [] stats = await gm.getStatsAsync();
            for( int i = 0 ; i < stats.Length;i++){
                if(stats[i].Match_Id == id){
                    gm = stats[i];
                    return gm;
                }
                
            }
            return null;
        }   
}
}
