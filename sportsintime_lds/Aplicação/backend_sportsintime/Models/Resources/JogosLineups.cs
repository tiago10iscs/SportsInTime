using System;
using System.IO;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;
namespace backend_sportsintime.Models.Resources
{
    public class JogosLineups
    {

        public string? Match_Id { get; set; }

        public string? Match_Hometeam_System { get; set; }

        public string? Match_Awayteam_System { get; set; }
        public AllLineUps? Lineup { get; set; }

        public async Task<JogosLineups[]> getLineUpsAsync()
        {

            String[] dates = this.getDates();

            HttpClient client = new HttpClient { BaseAddress = new Uri("https://apiv3.apifootball.com/?action=get_events&from=" + dates[0] + "&to=" + dates[1] + "&league_id=153&APIkey=74b55cfa88d981ac41638b261b8435ec351db16497e0d425bdd07ac4fbeda0d4") };

            var response = await client.GetAsync("");

            var content = await response.Content.ReadAsStringAsync();

            JogosLineups[] data = JsonConvert.DeserializeObject<JogosLineups[]>(content);

            return data;

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






    }
}