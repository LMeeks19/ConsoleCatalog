namespace ConsoleCatalog.Internal_Server.Models.Playstation
{
    public class PSNProfile
    {
        public int Id { get; set; }
        public string AboutMe { get; set; }
        public string AccountId { get; set; }
        public virtual List<AvatarUrl> AvatarUrls { get; set; }
        public bool Blocking { get; set; }
        public bool Following { get; set; }
        public string FriendRelation { get; set; }
        public bool IsOfficiallyVerified { get; set; }
        public List<string> LanguagesUsed { get; set; }
        public string NpId { get; set; }
        public string OnlineId { get; set; }
        public string PersonalDetailSharing { get; set; }
        public bool PersonalDetailSharingRequestMessageFlag { get; set; }
        public int Plus { get; set; }
        public string PrimaryOnlineStatus { get; set; }
        public bool RequestMessageFlag { get; set; }

        public int PersonalDetailId { get; set; }
        public virtual PersonalDetail PersonalDetail { get; set; }

        public int TrophySummaryId { get; set; }
        public virtual TrophySummary TrophySummary { get; set; }

        public int TrophyTitlesId { get; set; }
        public virtual TrophyTitleObject TrophyTitles { get; set; }
    }
}
