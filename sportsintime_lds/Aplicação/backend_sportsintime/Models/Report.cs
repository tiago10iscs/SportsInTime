namespace backend_sportsintime.Models
{
    public partial class Report
    {
        public long Id { get; set; }

        public long idUser {get; set; }

        public string mensagem {get; set; }

        public bool? banOption {get; set; }

        public bool? isVerified {get; set; }

    }
}