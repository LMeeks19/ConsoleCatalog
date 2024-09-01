namespace ConsoleCatalog.Server.Models.Playstation
{
    public class AvatarUrl
    {
        public required int Id { get; set; }
        public required int PSNProfileID { get; set; }
        public required string Url {  get; set; }
        public required string Size { get; set; }
    }
}
