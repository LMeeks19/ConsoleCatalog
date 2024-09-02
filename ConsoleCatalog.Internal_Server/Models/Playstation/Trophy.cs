namespace ConsoleCatalog.Server.Models.Playstation
{
    public class Trophy
    {
        public required int Id { get; set; }
        public required int TrophiesObjectId { get; set; }
        public required string TrophyDetail { get; set; }
        public required string TrophyGroupId { get; set; }
        public required bool TrophyHidden { get; set; }
        public required string TrophyIconUrl { get; set; }
        public required int TrophyId { get; set; }
        public required string TrophyName { get; set; }
        public required string TrophyType { get; set; }
        public required bool Earned { get; set; }
        public required string EarnedDateTime { get; set; }
        public required string TrophyEarnedRate { get; set; }
        public required int TrophyRare { get; set; }
        public string? TrophyProgressTargetValue { get; set; }
        public string? Progress {  get; set; }
        public int? ProgressRate { get; set; }
        public string? ProgressDateTime { get; set; }

    }
}
