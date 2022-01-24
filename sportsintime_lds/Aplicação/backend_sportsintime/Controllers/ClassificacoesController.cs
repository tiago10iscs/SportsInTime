
using Microsoft.AspNetCore.Mvc;
using backend_sportsintime.Models;

/**
Controller que permite gerir as classificações de uma determinada liga, neste caso apenas obter os dados
da API Football
*/

namespace backend_sportsintime.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClassificacoesController : ControllerBase
    {

        public ClassificacoesController()
        {
        }

        // GET: api/Classificacoes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Classificacoes>>> GetClassificacoes()
        {
            Classificacoes standing = new Classificacoes();
            Classificacoes [] standings = await standing.getStandingsAsync();
            return standings;
        }
}
}