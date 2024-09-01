namespace ConsoleCatalog.Server.Models.Playstation
{
    public class TrophyTitle
    {
        public required int Id { get; set; }
        public required int TrophyTitleObjectId { get; set; }
        public required bool HasTrophyGroups { get; set; }
        public required bool HiddenFlag { get; set; }
        public required DateTime LastUpdatedDateTime { get; set; }
        public required string NpCommunicationId { get; set; }
        public required string NpServiceName { get; set; }
        public required int Progress { get; set; }
        public required int TrophyGroupCount { get; set; }
        public required string TrophySetVersion { get; set; }
        public required string TrophyTitleDetail { get; set; }
        public required string TrophyTitleIconUrl { get; set; }
        public required string TrophyTitleName { get; set; }
        public required string TrophyTitlePlatform { get; set; }

        public required int DefinedTrophiesId { get; set; }
        public required TrophyTypes DefinedTrophies { get; set; }

        public required int EarnedTrophiesId { get; set; }
        public required TrophyTypes EarnedTrophies { get; set; }
    }
}
