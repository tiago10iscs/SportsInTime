namespace backend_sportsintime.Models
{
    public class User
    {

        public long Id { get; set; }

        public string? Name { get; set; } = string.Empty;

        public string? Email { get; set; } 

        public int? Rank { get; set; }

        public bool? IsBanned {get; set;}

        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }

        public bool isAdmin { get; set; }


    }
}
