namespace ConsoleCatalog.Internal_Server.Models.Xbox
{
    public class XBXAchievementSummary
    {
        public int Id { get; set; }
        public int CurrentAchievements { get; set; }
        public int TotalAchievements { get; set; }
        public int CurrentGamerscore { get; set; }
        public int TotalGamerscore { get; set; }
        public double ProgressPercentage { get; set; }
    }
}
