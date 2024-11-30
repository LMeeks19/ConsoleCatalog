namespace ConsoleCatalog.Internal_Server.Models
{
    public class User
    {

        public Guid Id { get; set; }
        public string Username { get; set; }
        public string? PlaystationGamertag { get; set; }
        public string? XboxGamertag { get; set; }
        public string Password { get; set; }

    }

    public class RegisterDetails
    {
        public string Username { get; set; }
        public string? PlaystationGamertag { get; set; }
        public string? XboxGamertag { get; set; }
        public string Password { get; set; }
        public string Confirm_Password { get; set; }
    }
}
