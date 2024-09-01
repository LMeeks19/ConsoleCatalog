namespace ConsoleCatalog.Server.Models.Playstation
{
    public class TrophiesObject
    {
        public required int Id { get; set; }
        public required bool HasTrophyGroups { get; set; }
        public required int TotalItemCount { get; set; }
        public virtual Trophy[] Trophies { get; set; }
        public required string TrophySetVersion { get; set; }
        public required DateTime LastUpdatedDateTime { get; set; }
    }
}
