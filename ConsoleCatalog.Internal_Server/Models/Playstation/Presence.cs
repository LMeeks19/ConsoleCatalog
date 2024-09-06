namespace ConsoleCatalog.Server.Models.Playstation
{
    public class Presence
    {
        public int Id { get; set; }
        public int PSNProfileId { get; set; }
        public bool HasBroadcastData { get; set; }
        public DateTime LastOnlineDate { get; set; }
        public string OnlineStatus { get; set; }
    }
}
