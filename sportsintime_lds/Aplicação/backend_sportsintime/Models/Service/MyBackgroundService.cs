using backend_sportsintime.Models;
using Newtonsoft.Json;

/**
Serviço de backGround que corre de dia a dia e verifica a data para assim atualizar as datas a que vai obter os jogos
Semana a semana atualiza os pontos dos users e consequentemente atualiza os ranks os users.
Escreve e lê as datas no ficheiro dates.json
*/
namespace Service.Background{


    public class MyBackgroundService :BackgroundService {


        public IServiceProvider Services;
        public MyBackgroundService(IServiceProvider services){
            Services = services;
        }
        private async Task RunPredictsAndPoints(){
            using( var scope = Services.CreateScope()){

                var bdInfo = scope.ServiceProvider.GetRequiredService<bdContext>();

    
                for(int i = 0; i < bdInfo.Sondagem.ToArray().Length; i++){

                    long value = bdInfo.Sondagem.ToList()[i].IdJogo;
                    string id = Convert.ToString(value);
                    Jogo game = await this.GetJogoAsync(id);
                    System.Console.WriteLine(game.Match_Id);
                    System.Console.WriteLine(game.estado);
                    if(game.estado == Jogo.Estado.TERMINADO){

                        for(int x = 0; x < bdInfo.Resposta.ToArray().Length; x++){
                            
                            int opcao = 0; 
                            if(bdInfo.Sondagem.ToList()[i].Id == bdInfo.Resposta.ToList()[x].IdSondagem){
                                if(int.Parse(game.Match_Awayteam_Score) == int.Parse(game.Match_Hometeam_Score)){

                                    opcao = 2;//Empate
                                
                                }
                                if(int.Parse(game.Match_Awayteam_Score) > int.Parse(game.Match_Hometeam_Score)){

                                    opcao = 3;//Perde
                                    System.Console.WriteLine("É o ardes");

                                }

                                if(int.Parse(game.Match_Awayteam_Score) < int.Parse(game.Match_Hometeam_Score)){

                                    opcao = 1;//GAnha
                                
                                }

                            
                                if(bdInfo.Resposta.ToList()[x].resposta == opcao){
                                    var user =  await bdInfo.Users.FindAsync(bdInfo.Resposta.ToList()[x].IdUser);
                                    user.Rank += 100;
                                    await bdInfo.SaveChangesAsync();
                                }else{

                                    var user =  await bdInfo.Users.FindAsync(bdInfo.Resposta.ToList()[x].IdUser);
                                    
                                    if(user.Rank >= 100){
                                        user.Rank -= 100;
                                        await bdInfo.SaveChangesAsync();
                                    }
                                }

                               bdInfo.Resposta.Remove(bdInfo.Resposta.ToList()[x]);
                               await bdInfo.SaveChangesAsync();

                            }//IF

                        }//FOR
                    }//IF  

                }///FOR/*
                
            }
        }
        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested){
                //await RunPredictsAndPoints(); 
                DateTime thisDate = new DateTime();
                thisDate = DateTime.Now;
                string todayDate = thisDate.ToString("yyyy-MM-dd");
                
                if(todayDate == getDates()[1]){

                    await RunPredictsAndPoints();
                    changeJSONDates();

                }
                await Task.Delay(TimeSpan.FromDays(1), stoppingToken);
           }
           await Task.CompletedTask;
        }



        private async Task<Jogo> GetJogoAsync(String id){


            HttpClient client = new HttpClient { BaseAddress = new Uri("https://apiv3.apifootball.com/?action=get_events&from=2021-12-10&to=2022-01-26&league_id=266&APIkey=74b55cfa88d981ac41638b261b8435ec351db16497e0d425bdd07ac4fbeda0d4") };

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

        private void changeJSONDates(){


            DateTime thisDate = new DateTime();
            thisDate = DateTime.Now;
            string? todayDate = thisDate.ToString("yyyy-MM-dd");
            DateTime thisDate2 = thisDate.AddDays(7);
            string? todayDate2 = thisDate2.ToString("yyyy-MM-dd");
            Dates content = new Dates();
            content.date1 = todayDate;
            content.date2 = todayDate2;
            string jsonData = JsonConvert.SerializeObject(content, Formatting.Indented);
            File.WriteAllText("dates.json", jsonData);

        }

    }


}