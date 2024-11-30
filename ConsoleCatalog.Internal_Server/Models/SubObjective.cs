namespace ConsoleCatalog.Internal_Server.Models
{
    public class SubObjective
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public Guid? SubObjectiveId { get; set; }
        public virtual List<SubObjective>? Children { get; set; }
        public string TitleId { get; set; }
        public int? TrophyId { get; set; }
        public int? AchievementId { get; set; }
        public SubObjectivePlatform Platform { get; set; }
        public string Details { get; set; }
        public DateTime CreatedDate { get; set; }
        public bool IsComplete { get; set; }
    }

    public enum SubObjectivePlatform
    {
        XBX,
        PSN
    }
}