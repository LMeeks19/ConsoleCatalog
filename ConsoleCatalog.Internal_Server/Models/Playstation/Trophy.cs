namespace ConsoleCatalog.Server.Models.Playstation
{
    public class Trophy
    {
        public int Id { get; set; }
        public int TrophiesObjectId { get; set; }
        public string TrophyDetail { get; set; }
        public string TrophyGroupId { get; set; }
        public bool TrophyHidden { get; set; }
        public string TrophyIconUrl { get; set; }
        public int TrophyId { get; set; }
        public string TrophyName { get; set; }
        public string TrophyType { get; set; }
        public bool Earned { get; set; }
        public string EarnedDateTime { get; set; }
        public string TrophyEarnedRate { get; set; }
        public int TrophyRare { get; set; }
        public string? TrophyProgressTargetValue { get; set; }
        public string? Progress {  get; set; }
        public int? ProgressRate { get; set; }
        public string? ProgressDateTime { get; set; }

    }
}
