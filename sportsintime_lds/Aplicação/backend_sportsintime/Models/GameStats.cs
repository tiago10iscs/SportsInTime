using System.Threading.Tasks;
using Newtonsoft.Json;

namespace backend_sportsintime.Models{
    public class GameStats
    {
        public string? Match_Id { get; set; }
        
        public string? ballPossessionHome {get; set; }

        public string? ballPossessionAway {get; set; }

        public string? PassesHome {get; set; }

        public string? PassesAway {get; set; }

        public string? ShotsHome {get; set; }

        public string? ShotsAway {get; set; }

        public string? FoulsAway {get; set; }

        public string? FoulsHome {get; set; }

        public string? CornersAway {get; set; }

        public string? CornersHome {get; set; }

        public  async Task<GameStats[]> getStatsAsync(){

            AllStats allStats = new AllStats();

            AllStats[] allStats1 =  await allStats.getStatsAsync();

            System.Console.WriteLine(allStats1.Length);
            
            
            GameStats[] data = new GameStats[allStats1.Length];

            for (int i = 0; i < allStats1.Length; i++)
            {
                GameStats toSave = new GameStats();
                //data[i].Match_Id = allStats1[i].Match_Id;
                toSave.Match_Id = allStats1[i].Match_Id;
                for (int x = 0; x < allStats1[i].Statistics.Length; x++)
                {
                    if (allStats1[i].Statistics[x].Type == "Ball Possession")
                    {
                        toSave.ballPossessionHome = allStats1[i].Statistics[x].Home;
                        toSave.ballPossessionAway = allStats1[i].Statistics[x].Away;
                    }//IF

                    if (allStats1[i].Statistics[x].Type == "Corners")
                    {
                        toSave.CornersHome = allStats1[i].Statistics[x].Home;
                        toSave.CornersAway = allStats1[i].Statistics[x].Away;
                    }//IF

                    if (allStats1[i].Statistics[x].Type == "Passes Total")
                    {
                        toSave.PassesHome = allStats1[i].Statistics[x].Home;
                        toSave.PassesAway = allStats1[i].Statistics[x].Away;
                    }//IF

                    if (allStats1[i].Statistics[x].Type == "Shots Total")
                    {
                        toSave.ShotsHome = allStats1[i].Statistics[x].Home;
                        toSave.ShotsAway = allStats1[i].Statistics[x].Away;
                    }//IF

                    if (allStats1[i].Statistics[x].Type == "Fouls")
                    {
                        toSave.FoulsHome = allStats1[i].Statistics[x].Home;
                        toSave.FoulsAway = allStats1[i].Statistics[x].Away;
                    }//IF


                }//For


                data[i] = toSave;
            }//FOR
              
            return data;
        }
    

    }

}