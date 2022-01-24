namespace backend_sportsintime.Models
{
    public partial class Sondagem
    {
        public long Id { get; set; }
        
        public long IdJogo {get; set; }

        public int? Opcao {get; set; } //1-Ganha 2-Empate 3-Perde

    }
}
