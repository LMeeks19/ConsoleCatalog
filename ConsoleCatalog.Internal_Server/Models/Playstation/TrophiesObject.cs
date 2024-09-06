namespace ConsoleCatalog.Server.Models.Playstation
{
    public class TrophiesObject
    {
        public int Id { get; set; }
        public bool HasTrophyGroups { get; set; }
        public int TotalItemCount { get; set; }
        public virtual List<Trophy> Trophies { get; set; }
        public string TrophySetVersion { get; set; }
        public DateTime LastUpdatedDateTime { get; set; }
    }
}
