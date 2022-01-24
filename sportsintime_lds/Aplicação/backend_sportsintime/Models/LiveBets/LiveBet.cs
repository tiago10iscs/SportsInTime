namespace backend_sportsintime.Models.LiveBets
{   
    public class LiveBet
    {

        public long Id { get; set; }

        public long Match_Id {get; set; }

        public long UserID {get; set;}
        //Vitória Emprate Derrota
        public int opcaoVitoria {get; set; } //1- ganha 2-empate 3- perde
        //Golos acima de 2.5 ou abaixo
        public int opcaoGolos {get; set; }//1 - Acima de 2.5 2- abaixo de 2.5

        //Ambas marcas
        public int opcaoBTTS{get; set; }//1 - Ambas marcam 2- Nao marcam

    }
}
