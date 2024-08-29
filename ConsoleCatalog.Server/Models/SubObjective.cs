namespace ConsoleCatalog.Server.Models
{
    public class SubObjective
    {
        public Guid Id { get; set; }
        public required string TitleId { get; set; }
        public required int TrophyId { get; set; }
        public required string Details { get; set; }
        public required bool IsComplete { get; set; }
    }
}
