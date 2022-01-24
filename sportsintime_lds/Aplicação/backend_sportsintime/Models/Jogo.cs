namespace backend_sportsintime.Models
{
    public partial class Jogo
    {

        // public string EquipaVisitante { get; set; }

        //   public string EquipaVisitada { get; set; }

         public string? Match_Id { get; set; }
        public string? Match_Date { get; set; }
       

        public string? Match_Live { get; set; }//1 QUANDO ESTA EM LIVE E 0 QUANDO NAO ESTÁ EM LIVE
        public string? Match_Time { get; set; } //HORA DO JOGO

        public string? Match_Status { get; set; } //tempo de jogo

        public string? Match_Awayteam_Halftime_Score { get; set; }

        public string? Match_Hometeam_Halftime_Score { get; set; }

        public string? Match_Awayteam_Name { get; set; }

        public string? Match_Hometeam_Name { get; set; }
        public string? Match_Hometeam_Score { get; set; }

        public string? Match_Awayteam_Score { get; set; }

        public string? Team_Home_Badge {get; set; }

        public string? Team_Away_Badge {get; set; }

        public enum Estado {
            LIVE,
            TERMINADO,
            
            COMECANDO,

            ADIADO

        }

        public Estado? estado {get; set;}

    }
}