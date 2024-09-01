namespace ConsoleCatalog.Server.Models.Playstation
{
    public class PSNProfile
    {
        public required int Id { get; set; }
        public required string AboutMe { get; set; }
        public required string AccountId { get; set; }
        public virtual AvatarUrl[] AvatarUrls { get; set; }
        public required bool Blocking { get; set; }
        public required bool Following { get; set; }
        public required string FriendRelation { get; set; }
        public required bool IsOfficiallyVerified { get; set; }
        public required string[] LanguagesUsed { get; set; }
        public required string NpId { get; set; }
        public required string OnlineId { get; set; }
        public required string PersonalDetailSharing { get; set; }
        public required bool PersonalDetailSharingRequestMessageFlag { get; set; }
        public required int Plus { get; set; }
        public virtual Presence[] Presences { get; set; }
        public required string PrimaryOnlineStatus { get; set; }
        public required bool RequestMessageFlag { get; set; }

        public required int ConsoleAvailabilityId { get; set; }
        public required ConsoleAvailability ConsoleAvailability { get; set; }

        public required int PersonalDetailId { get; set; }
        public virtual PersonalDetail PersonalDetail { get; set; }

        public required int TrophySummaryId { get; set; }
        public virtual TrophySummary TrophySummary { get; set; }

        public required int TrophyTitleObjectId { get; set; }
        public virtual TrophyTitleObject TrophyTitleObject { get; set; }
    }
}
