using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend_sportsintime.Models;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System.Net.Http;
using Microsoft.AspNetCore.Authorization;
using System.IO;

namespace backend_sportsintime.Controllers
{
    [Route("api/jogo")]
    [ApiController]
    public class JogoController : ControllerBase
    {
        private readonly bdContext _context;

        public JogoController(bdContext context)
        {
            _context = context;
        }


        // GET: api/Jogo
        [HttpGet()]
        public async Task<ActionResult<IEnumerable<Jogo>>> GetJogo()
        {
            String[] dates = this.getDates();

            HttpClient client = new HttpClient { BaseAddress = new Uri("https://apiv3.apifootball.com/?action=get_events&from=" + dates[0] + "&to=" + dates[1] +"&league_id=153&APIkey=74b55cfa88d981ac41638b261b8435ec351db16497e0d425bdd07ac4fbeda0d4") };

            var response = await client.GetAsync("");

            var content = await response.Content.ReadAsStringAsync();

            Jogo[] jogo = JsonConvert.DeserializeObject<Jogo[]>(content);
            Jogo[] games = jogo;

            for (int i = 0; i < jogo.Length; i++)
            {
                if (jogo[i].Match_Status == "Finished")
                {
                    jogo[i].estado = Jogo.Estado.TERMINADO;
                }
                else if (jogo[i].Match_Live == "0" && jogo[i].Match_Status == "")
                {
                    jogo[i].estado = Jogo.Estado.COMECANDO;
                }
                else if (jogo[i].Match_Live == "1")
                {
                    jogo[i].estado = Jogo.Estado.LIVE;
                }
                else if(jogo[i].Match_Status == "Postponed"){
                    jogo[i].estado = Jogo.Estado.ADIADO;
                }
            }//FOR

            return jogo;
        }

        // GET: api/Jogo/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Jogo>> GetJogo(String id)
        
        {

            String[] dates = this.getDates();

            HttpClient client = new HttpClient { BaseAddress = new Uri("https://apiv3.apifootball.com/?action=get_events&from=" + dates[0] + "&to=" + dates[1] +"&league_id=153&APIkey=74b55cfa88d981ac41638b261b8435ec351db16497e0d425bdd07ac4fbeda0d4") };

            var response = await client.GetAsync("");

            var content = await response.Content.ReadAsStringAsync();

            Jogo[] jogo = JsonConvert.DeserializeObject<Jogo[]>(content);
            Jogo[] games = jogo;
            Jogo game = new Jogo();

            for (int i = 0; i < games.Length; i++)
            {
                System.Console.WriteLine(games[i]);
                if (games[i].Match_Id == id)
                {
                    game = games[i];

                    if (game.Match_Status == "Finished")
                    {
                        game.estado = Jogo.Estado.TERMINADO;
                        return game;
                    }//IF

                    if (jogo[i].Match_Live == "0" && jogo[i].Match_Status == "")
                    {
                        game.estado = Jogo.Estado.COMECANDO;
                        return game;
                    }//IF

                    if (jogo[i].Match_Live == "1")
                    {
                        game.estado = Jogo.Estado.LIVE;
                        return game;
                    }//IF
                    if(jogo[i].Match_Status == "Postponed"){
                        game.estado = Jogo.Estado.ADIADO;
                        return game;
                    }
                }
            }

            return null;
        }


        private String[] getDates (){
            String[] dates = new String[2];

            using(StreamReader streamReader = new StreamReader("dates.json")){

                var json = streamReader.ReadToEnd();
                Dates date = JsonConvert.DeserializeObject<Dates>(json);
                dates[0] = date.date1;
                dates[1] = date.date2;
                
            }

            return dates;
        }
    }
}