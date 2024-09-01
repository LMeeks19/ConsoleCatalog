namespace ConsoleCatalog.Server.Models.Playstation
{
    public class TrophySummary
    {
        public required int Id { get; set; }
        public required int Level { get; set; }
        public required int Progress { get; set; }

        public required int EarnedTrophiesId { get; set; }
        public virtual TrophyTypes EarnedTrophies { get; set; }

    }
}
