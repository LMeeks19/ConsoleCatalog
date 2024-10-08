namespace ConsoleCatalog.Internal_Server.Models.Xbox
{
    public class XBXProfile
    {
        public int Id { get; set; }
        public string Xuid { get; set; }
        public bool IsIdentiryShared { get; set; }
        public string RealName { get; set; }
        public string DisplayPicRaw { get; set; }
        public string Gamertag { get; set; }
        public int GamerScore { get; set; }
        public int DetailId { get; set; }
        public virtual XBXDetail Detail {  get; set; }
        public virtual List<XBXTitle> Titles { get; set; }
        public int TitlesCount { get; set; }
        
    }
}
