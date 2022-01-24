namespace backend_sportsintime.Models
{
    public class UserDTO
    {
        public long Id { get; set; }

        public string? Name { get; set; }
        public string? Password { get; set; }
        public string? ConfirmarPassword { get; set; }
        public string? Email { get; set; }
        public bool isAdmin { get; set; }
    }
}