namespace ConsoleCatalog.Server.Models.Playstation
{
    public class Presence
    {
        public required int Id { get; set; }
        public required int PSNProfileId { get; set; }
        public required bool HasBroadcastData { get; set; }
        public required DateTime LastOnlineDate { get; set; }
        public required string OnlineStatus { get; set; }
    }
}
