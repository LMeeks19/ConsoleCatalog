namespace ConsoleCatalog.Internal_Server.Models.Xbox
{
    public class XBXTitle
    {
        public int Id { get; set; }
        public int XBXProfileId { get; set; }
        public string TitleId { get; set; }
        public string Name { get; set; }
        public string[] Devices { get; set; }
        public string DisplayImage { get; set; }
        public bool IsBundle { get; set; }
        public int TitleHistoryId { get; set; }
        public virtual XBXTitleHistory TitleHistory { get; set; }
        public int AchievementId { get; set; }
        public virtual XBXAchievement Achievement { get; set; }
    }
}
