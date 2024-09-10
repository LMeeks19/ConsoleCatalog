using ConsoleCatalog.Server.Models.Playstation;

namespace ConsoleCatalog.Internal_Server.Mappers
{
    public class PSNTitleTrophyMapper
    {
        public TitleTrophy MapTitleTrophy(TitleTrophy titleTrophy, TitleTrophy existingTitleTrophy)
        {
            var updatedTitleTrophy = titleTrophy;
            
            updatedTitleTrophy.Id = existingTitleTrophy.Id;
            updatedTitleTrophy.TitleId = existingTitleTrophy.TitleId;
            updatedTitleTrophy.TrophyGroupId = existingTitleTrophy.TrophyGroupId;

            return updatedTitleTrophy;
        }

        public EarnedTitleTrophy MapEarnedTitleTrophy(EarnedTitleTrophy earnedTitleTrophy, EarnedTitleTrophy existingEarnedTitleTrophy)
        {
            var updatedEarnedTitleTrophy = earnedTitleTrophy;

            updatedEarnedTitleTrophy.Id = existingEarnedTitleTrophy.Id;
            updatedEarnedTitleTrophy.TitleId = existingEarnedTitleTrophy.TitleId;
            updatedEarnedTitleTrophy.PSNProfileId = existingEarnedTitleTrophy.PSNProfileId;
            updatedEarnedTitleTrophy.TrophyGroupId = existingEarnedTitleTrophy.TrophyGroupId;

            return updatedEarnedTitleTrophy;
        }

    }
}
