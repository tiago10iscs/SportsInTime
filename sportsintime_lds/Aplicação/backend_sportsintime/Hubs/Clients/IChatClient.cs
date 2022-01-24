using System.Threading.Tasks;
using backend_sportsintime.Models;

/**
Interface que representa o metodo para receber uma mensagem no Chat
*/
namespace backend_sportsintime.Hubs.Clients
{
    public interface IChatClient
    {
        Task ReceiveMessage(ChatMessage message);
    }
}