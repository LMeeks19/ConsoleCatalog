namespace ConsoleCatalog.Internal_Server.Models.Playstation
{
    public class TrophyTitleObject
    {
        public int Id { get; set; }
        public int TotalItemCount { get; set; }
        public virtual List<TrophyTitle> TrophyTitles { get; set; }
    }
}
