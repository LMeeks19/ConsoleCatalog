namespace ConsoleCatalog.Server.Models.Playstation
{
    public class TrophyTitle
    {
        public int Id { get; set; }
        public int TrophyTitleObjectId { get; set; }
        public bool HasTrophyGroups { get; set; }
        public bool HiddenFlag { get; set; }
        public DateTime LastUpdatedDateTime { get; set; }
        public string NpCommunicationId { get; set; }
        public string NpServiceName { get; set; }
        public int Progress { get; set; }
        public int TrophyGroupCount { get; set; }
        public string TrophySetVersion { get; set; }
        public string? TrophyTitleDetail { get; set; }
        public string TrophyTitleIconUrl { get; set; }
        public string TrophyTitleName { get; set; }
        public string TrophyTitlePlatform { get; set; }

        public int DefinedTrophiesId { get; set; }
        public TrophyTypes DefinedTrophies { get; set; }

        public int EarnedTrophiesId { get; set; }
        public TrophyTypes EarnedTrophies { get; set; }
    }
}
