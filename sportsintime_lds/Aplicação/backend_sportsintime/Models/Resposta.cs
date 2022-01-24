namespace backend_sportsintime.Models
{
    public partial class Resposta
    {
        public long Id { get; set; }
        public long IdSondagem { get; set; }
        public long IdUser { get; set; }
        public int? resposta { get; set; }//1-Ganha 2-Empate 3-Perde

    }

}
