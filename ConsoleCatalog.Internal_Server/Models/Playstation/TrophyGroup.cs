using ConsoleCatalog.Server.Models.Playstation;

namespace ConsoleCatalog.Internal_Server.Models.Playstation
{
    public class DefinedTrophyGroup
    {
        public int Id { get; set; }
        public int TrophyGroupObjectId { get; set; }
        public DefinedTrophyTypes DefinedTrophies { get; set; }
        public string TrophyGroupIconUrl { get; set; }
        public string TrophyGroupId { get; set; }
        public string TrophyGroupName { get; set; }
    }

    public class EarnedTrophyGroup
    {
        public int Id { get; set; }
        public int TrophyGroupObjectId { get; set; }

        public EarnedTrophyTypes EarnedTrophies { get; set; }
        public string LastUpdatedDateTime { get; set; }
        public double Progress { get; set; }
        public string TrophyGroupId { get; set; }
    }
}
