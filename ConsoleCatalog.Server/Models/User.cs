namespace ConsoleCatalog.Server.Models
{
    public class User
    {

        public Guid Id { get; set; }
        public required string Username { get; set; }
        public string? PlaystationGamertag { get; set; }
        public string? XboxGamertag { get; set; }
        public required string Password { get; set; }

    }
}
