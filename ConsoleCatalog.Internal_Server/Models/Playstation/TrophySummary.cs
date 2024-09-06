namespace ConsoleCatalog.Server.Models.Playstation
{
    public class TrophySummary
    {
        public int Id { get; set; }
        public int Level { get; set; }
        public int Progress { get; set; }

        public int EarnedTrophiesId { get; set; }
        public virtual TrophyTypes EarnedTrophies { get; set; }

    }
}
