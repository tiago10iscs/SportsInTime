using Microsoft.AspNetCore.Mvc;
using backend_sportsintime.Models;

/**
Controller que permite gerir as formações de uma determinada equipa, assim como os seus suplentes e 
formação tática.
*/

namespace backend_sportsintime.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FormacoesController : ControllerBase
    {

        public FormacoesController()
        {
        }

        // GET: api/Formacoes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Formacoes>>> GetFormacoes()
        {
            Formacoes linup = new Formacoes();
            Formacoes[] linups = await linup.getFormacoesAsync();
            return linups;
        }

        // GET: api/Formacoes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Formacoes>> GetFormacoes(String id)
        {
            Formacoes linup = new Formacoes();
            Formacoes[] linups = await linup.getFormacoesAsync();

            for (int i = 0; i < linups.Length; i++)
            {
                if (linups[i].Match_Id == id)
                {
                    System.Console.WriteLine(linups[i]);
                    linup = linups[i];
                    return linup;
                }

            }
            return null;
        }
    }
}
