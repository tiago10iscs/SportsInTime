using System.Threading.Tasks;
using backend_sportsintime.Models.Resources;
namespace backend_sportsintime.Models
{
    public partial class Formacoes
    {

         public string? Match_Id { get; set; }
       
        public string? Match_Hometeam_System { get; set; }

        public string? Match_Awayteam_System { get; set; }

        public LineUp? home { get; set; }

        public LineUp? away { get; set; }

        public  async Task<Formacoes[]> getFormacoesAsync(){

            JogosLineups dataAPI = new JogosLineups();
            JogosLineups [] lineupAPI = await dataAPI.getLineUpsAsync();

            Formacoes[] formacoes = new Formacoes[lineupAPI.Length];
            
            for(int i = 0; i < lineupAPI.Length; i++){
                Formacoes formacoesToSave = new Formacoes();
                formacoesToSave.Match_Id = lineupAPI[i].Match_Id;
                formacoesToSave.Match_Hometeam_System = lineupAPI[i].Match_Hometeam_System;
                formacoesToSave.Match_Awayteam_System = lineupAPI[i].Match_Awayteam_System;
               
               
                

                LineUps [] lineUpsToSave = new LineUps[lineupAPI[i].Lineup.Home.Starting_Lineups.Length];

                for(int j = 0; j < lineupAPI[i].Lineup.Home.Starting_Lineups.Length; j++){
                    
                    LineUps lu = new LineUps();

                    lu.player_name = lineupAPI[i].Lineup.Home.Starting_Lineups[j].Lineup_Player;

                    lu.player_number = lineupAPI[i].Lineup.Home.Starting_Lineups[j].Lineup_Number;
     

                    if (lineupAPI[i].Lineup.Home.Starting_Lineups[j].Lineup_Position == "1")
                    {
                        lu.isGR = true;
                    }else
                    {
                        lu.isGR = false;
                    }

                    lineUpsToSave[j] = lu;
                    
                    
                }//FOR
                     
                LineUps [] lineUpsToSave1 = new LineUps[lineupAPI[i].Lineup.Home.Substitutes.Length];

                for(int j = 0; j < lineupAPI[i].Lineup.Home.Substitutes.Length; j++){
                    LineUps lu = new LineUps();
                    lu.player_name = lineupAPI[i].Lineup.Home.Substitutes[j].Lineup_Player;
                    lu.player_number = lineupAPI[i].Lineup.Home.Substitutes[j].Lineup_Number;
                    lu.isGR = false;


                    lineUpsToSave1[j] = lu;
                }//FOR

                LineUp homeTeam = new LineUp();
                homeTeam.titulares = lineUpsToSave;
                homeTeam.substitutos = lineUpsToSave1;

                formacoesToSave.home = homeTeam;
                
                //formacoesToSave.home.substitutos = lineUpsToSave1;

                LineUps [] lineUpsToSave2 = new LineUps[lineupAPI[i].Lineup.Away.Starting_Lineups.Length];
                
                for(int j = 0; j < lineupAPI[i].Lineup.Away.Starting_Lineups.Length; j++){
                    LineUps lu = new LineUps();
                    lu.player_name = lineupAPI[i].Lineup.Away.Starting_Lineups[j].Lineup_Player;
                    lu.player_number = lineupAPI[i].Lineup.Away.Starting_Lineups[j].Lineup_Number;
                    if (lineupAPI[i].Lineup.Away.Starting_Lineups[j].Lineup_Position == "1")
                    {
                       lu.isGR = true;
                    }else
                    {
                        lu.isGR = false;
                    }

                    lineUpsToSave2[j] = lu;
                }//FOR

                //formacoesToSave.away.titulares = lineUpsToSave2;

                LineUps [] lineUpsToSave3 = new LineUps[lineupAPI[i].Lineup.Away.Substitutes.Length];



                for(int j = 0; j < lineupAPI[i].Lineup.Away.Substitutes.Length; j++){
                    LineUps lu = new LineUps();
                    lu.player_name = lineupAPI[i].Lineup.Away.Substitutes[j].Lineup_Player;
                    lu.player_number = lineupAPI[i].Lineup.Away.Substitutes[j].Lineup_Number;
                    lu.isGR = false;

                    lineUpsToSave3[j] = lu;

                }//FOR
                LineUp awayTeam = new LineUp();
                awayTeam.titulares = lineUpsToSave2;
                awayTeam.substitutos = lineUpsToSave3;
                formacoesToSave.away = awayTeam;

            formacoes[i] = formacoesToSave;

            }//FOR*/


            return formacoes;
        }

    }


     




}