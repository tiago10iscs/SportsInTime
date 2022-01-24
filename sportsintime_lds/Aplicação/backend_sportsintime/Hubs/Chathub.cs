using System.Threading.Tasks;
using backend_sportsintime.Hubs.Clients;
using backend_sportsintime.Models;
using Microsoft.AspNetCore.SignalR;

/**
Classe que corresponde ao metodo de envio de uma mensagem para o Chat
*/
namespace backend_sportsintime.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(ChatMessage message)
        {
            await Clients.All.SendAsync("ReceiveMessage", message);
        }
    }
}