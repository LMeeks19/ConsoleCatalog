using ConsoleCatalog.Server.Models.Playstation;

namespace ConsoleCatalog.Internal_Server.Models.Playstation
{
    public class DefinedTrophyGroupObject
    {
        public int Id { get; set; }
        public DefinedTrophyTypes DefinedTrophies { get; set; }
        public string NpCommunicationId { get; set; }
        public DefinedTrophyGroup[] TrophyGroups { get; set; }
        public string TrophyTitleIconUrl { get; set; }
        public string TrophyTitleName { get; set; }
        public string TrophyTitlePlatform { get; set; }
    }

    public class EarnedTrophyGroupObject
    {
        public int Id { get; set; }
        public int PSNProfileId { get; set; }
        public EarnedTrophyTypes EarnedTrophies { get; set; }
        public string NpCommunicationId { get; set; }
        public string LastUpdatedDateTime { get; set; }
        public double Progress { get; set; }
        public EarnedTrophyGroup[] TrophyGroups { get; set; }
    }
}
