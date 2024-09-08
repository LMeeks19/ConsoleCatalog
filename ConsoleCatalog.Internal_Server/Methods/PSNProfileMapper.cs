using ConsoleCatalog.Server.Models.Playstation;

namespace ConsoleCatalog.Internal_Server.Methods
{
    public class PSNProfileMapper
    {
        public PSNProfile MapProfile(PSNProfile psnProfile, PSNProfile existingPSNProfile)
        {
            var updatedPSNProfile = psnProfile;

            updatedPSNProfile.Id = existingPSNProfile.Id;

            updatedPSNProfile.AvatarUrls = MapAvatarUrls(psnProfile.AvatarUrls, existingPSNProfile.AvatarUrls, updatedPSNProfile.Id);

            updatedPSNProfile.ConsoleAvailabilityId = existingPSNProfile.ConsoleAvailabilityId;
            updatedPSNProfile.ConsoleAvailability = MapConsoleAvailability(psnProfile.ConsoleAvailability, existingPSNProfile.ConsoleAvailability);

            updatedPSNProfile.PersonalDetailId = existingPSNProfile.PersonalDetailId;
            updatedPSNProfile.PersonalDetail = MapPersonalDetail(psnProfile.PersonalDetail, existingPSNProfile.PersonalDetail);

            updatedPSNProfile.TrophySummaryId = existingPSNProfile.TrophySummaryId;
            updatedPSNProfile.TrophySummary = MapTrophySummary(psnProfile.TrophySummary, existingPSNProfile.TrophySummary);

            updatedPSNProfile.TrophyTitlesId = existingPSNProfile.TrophyTitlesId;
            updatedPSNProfile.TrophyTitles = MapTrophyTitlesObject(psnProfile.TrophyTitles, existingPSNProfile.TrophyTitles);

            return updatedPSNProfile;
        }

        public List<AvatarUrl> MapAvatarUrls(List<AvatarUrl> avatarUrls, List<AvatarUrl> existingAvatarUrls, int psnProfileId)
        {
            var updatedAvatarUrls = avatarUrls;
            updatedAvatarUrls.ForEach(avatarUrl =>
            {
                avatarUrl.Id = existingAvatarUrls.Single(existingAvatarUrl => existingAvatarUrl.avatarUrl == avatarUrl.avatarUrl).Id;
                avatarUrl.PSNProfileId = psnProfileId;
            });
            return updatedAvatarUrls;
        }

        public ConsoleAvailability MapConsoleAvailability(ConsoleAvailability consoleAvailability, ConsoleAvailability existingConsoleAvailability)
        {
            var updatedConsoleAvailability = consoleAvailability;
            updatedConsoleAvailability.Id = existingConsoleAvailability.Id;
            return updatedConsoleAvailability;
        }

        public PersonalDetail MapPersonalDetail(PersonalDetail personalDetail, PersonalDetail existingPersonalDetail)
        {
            var updatedPersonalDetail = personalDetail;
            updatedPersonalDetail.Id = existingPersonalDetail.Id;
            return updatedPersonalDetail;
        }

        public TrophySummary MapTrophySummary(TrophySummary trophySummary, TrophySummary existingTrophySummary)
        {
            var updatedTrophySummary = trophySummary;
            updatedTrophySummary.Id = existingTrophySummary.Id;
            updatedTrophySummary.EarnedTrophiesId = existingTrophySummary.EarnedTrophiesId; 
            updatedTrophySummary.EarnedTrophies = MapEarnedTrophyTypes(trophySummary.EarnedTrophies, existingTrophySummary.EarnedTrophies);
            return updatedTrophySummary;
        }

        public TrophyTitleObject MapTrophyTitlesObject(TrophyTitleObject trophyTitlesObject, TrophyTitleObject existingTrophyTitlesObject)
        {
            var updatedTrophyTitlesObject = trophyTitlesObject;
            updatedTrophyTitlesObject.Id = existingTrophyTitlesObject.Id;
            updatedTrophyTitlesObject.TrophyTitles = MapTrophyTitles(trophyTitlesObject.TrophyTitles, existingTrophyTitlesObject.TrophyTitles);
            return updatedTrophyTitlesObject;
        }

        public List<TrophyTitle> MapTrophyTitles(List<TrophyTitle> trophyTitles, List<TrophyTitle> existingTrophyTitles)
        {
            var updatedTrophyTitles = trophyTitles;
            updatedTrophyTitles.ForEach(trophyTitle =>
            {
                var existingTrophyTitle = existingTrophyTitles.Single(existingTrophyTitle => existingTrophyTitle.NpCommunicationId == trophyTitle.NpCommunicationId);
                trophyTitle.Id = existingTrophyTitle.Id;
                trophyTitle.DefinedTrophiesId = existingTrophyTitle.DefinedTrophiesId;
                trophyTitle.DefinedTrophies = MapDefinedTrophyTypes(trophyTitle.DefinedTrophies, existingTrophyTitle.DefinedTrophies);
                trophyTitle.EarnedTrophiesId = existingTrophyTitle.EarnedTrophiesId;
                trophyTitle.EarnedTrophies = MapEarnedTrophyTypes(trophyTitle.EarnedTrophies, existingTrophyTitle.EarnedTrophies);
            });
            return updatedTrophyTitles;
        }

        public EarnedTrophyTypes MapEarnedTrophyTypes(EarnedTrophyTypes earnedTrophyTypes, EarnedTrophyTypes existingEarnedTrophyTypes)
        {
            var updatedEarnedTrophyTypes = earnedTrophyTypes;
            updatedEarnedTrophyTypes.Id = existingEarnedTrophyTypes.Id;
            return updatedEarnedTrophyTypes;
        }

        public DefinedTrophyTypes MapDefinedTrophyTypes(DefinedTrophyTypes definedTrophyTypes, DefinedTrophyTypes existingDefinedTrophyTypes)
        {
            var updatedDefinedTrophyTypes = definedTrophyTypes;
            updatedDefinedTrophyTypes.Id = existingDefinedTrophyTypes.Id;
            return updatedDefinedTrophyTypes;
        }
    }
}
