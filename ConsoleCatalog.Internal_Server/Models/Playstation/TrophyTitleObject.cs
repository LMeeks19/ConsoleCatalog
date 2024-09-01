namespace ConsoleCatalog.Server.Models.Playstation
{
    public class TrophyTitleObject
    {
        public required int Id { get; set; }
        public required int NextOffset { get; set; }
        public required int PreviousOffset { get; set; }
        public required int TotalItemCount { get; set; }
        public virtual TrophyTitle[] TrophyTitles { get; set; }
    }
}
