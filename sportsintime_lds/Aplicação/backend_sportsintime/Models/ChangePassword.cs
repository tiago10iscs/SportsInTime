namespace backend_sportsintime.Models
{
    public class ChangePassword
    {
        public string? OldPassword { get; set; }
        public string? NewPassword { get; set; }
        public string? ConfirmarNewPassword { get; set; }
    }
}