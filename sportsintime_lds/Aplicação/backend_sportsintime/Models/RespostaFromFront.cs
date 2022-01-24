namespace backend_sportsintime.Models
{
    public partial class RespostaFromFront
    {
        public string? matchId { get; set; }
        public string? idUser { get; set; }
        public int? resposta { get; set; }//1-Ganha 2-Empate 3-Perde
    }
}