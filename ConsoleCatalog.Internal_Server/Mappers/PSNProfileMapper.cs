using ConsoleCatalog.Internal_Server.Mappers;
using ConsoleCatalog.Internal_Server.Models.Playstation;

namespace ConsoleCatalog.Internal_Server.Methods
{
    public class PSNProfileMapper
    {
        public readonly PSNTrophyTypesMapper psnTrophyTypesMapper = new();
        public PSNProfile MapProfile(PSNProfile psnProfile, PSNProfile existingPSNProfile)
        {
            var updatedPSNProfile = psnProfile;

            updatedPSNProfile.Id = existingPSNProfile.Id;

            updatedPSNProfile.AvatarUrls = MapAvatarUrls(psnProfile.AvatarUrls, existingPSNProfile.AvatarUrls, updatedPSNProfile.Id);

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
            updatedTrophySummary.EarnedTrophies = psnTrophyTypesMapper.MapEarnedTrophyTypes(trophySummary.EarnedTrophies, existingTrophySummary.EarnedTrophies);
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
                var existingTrophyTitle = existingTrophyTitles.SingleOrDefault(existingTrophyTitle => existingTrophyTitle.NpCommunicationId == trophyTitle.NpCommunicationId);
                if (existingTrophyTitle != null)
                {
                    trophyTitle.Id = existingTrophyTitle.Id;
                    trophyTitle.TrophyTitleObjectId = existingTrophyTitle.TrophyTitleObjectId;
                    trophyTitle.DefinedTrophiesId = existingTrophyTitle.DefinedTrophiesId;
                    trophyTitle.DefinedTrophies = psnTrophyTypesMapper.MapDefinedTrophyTypes(trophyTitle.DefinedTrophies, existingTrophyTitle.DefinedTrophies);
                    trophyTitle.EarnedTrophiesId = existingTrophyTitle.EarnedTrophiesId;
                    trophyTitle.EarnedTrophies = psnTrophyTypesMapper.MapEarnedTrophyTypes(trophyTitle.EarnedTrophies, existingTrophyTitle.EarnedTrophies);
                }
            });
            return updatedTrophyTitles;
        }
    }
}
