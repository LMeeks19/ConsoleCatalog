namespace ConsoleCatalog.Internal_Server.Models
{
    public class SubObjective
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string TitleId { get; set; }
        public int TrophyId { get; set; }
        public string Details { get; set; }
        public bool IsComplete { get; set; }
    }
}
