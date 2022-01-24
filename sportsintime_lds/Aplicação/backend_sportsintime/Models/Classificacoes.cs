using System;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;


namespace backend_sportsintime.Models
{
    public class Classificacoes
    {
        public String? Team_Name { get; set; }


        public String? Team_Badge { get; set; }

        public String? Overall_League_Position { get; set; }//POSIÇÃO DA LIGA

        public String? Overall_League_Payed { get; set; }//JOGOS JOGADOS

        public String? Overall_League_W { get; set; }//VITORIAS

        public String? Overall_League_D { get; set; }//EMPATES

        public String? Overall_League_L { get; set; }//DERROTAS

        public String? Overall_League_GF { get; set; }//GOLOS MARCADOS

        public String? Overall_League_GA { get; set; }//GOLOS SOFRIDOS

        public String? Overall_League_PTS { get; set; }//PONTOS


        public async Task<Classificacoes[]> getStandingsAsync()
        {



            HttpClient client = new HttpClient { BaseAddress = new Uri("https://apiv3.apifootball.com/?action=get_standings&league_id=153&APIkey=74b55cfa88d981ac41638b261b8435ec351db16497e0d425bdd07ac4fbeda0d4") };

            var response = await client.GetAsync("");

            var content = await response.Content.ReadAsStringAsync();

            Classificacoes[] data = JsonConvert.DeserializeObject<Classificacoes[]>(content);

            return data;

        }


    }
}
