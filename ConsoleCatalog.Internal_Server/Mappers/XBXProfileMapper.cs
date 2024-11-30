using ConsoleCatalog.Internal_Server.Models.Xbox;

namespace ConsoleCatalog.Internal_Server.Mappers
{
    public class XBXProfileMapper
    {
        public XBXProfile MapProfile(XBXProfile xbxProfile, XBXProfile existingXBXProfile)
        {
            var updatedXBXProfile = xbxProfile;

            updatedXBXProfile.Id = existingXBXProfile.Id;

            updatedXBXProfile.DetailId = existingXBXProfile.DetailId;
            updatedXBXProfile.Detail = MapDetail(xbxProfile.Detail, existingXBXProfile.Detail);

            updatedXBXProfile.Titles = MapTitles(xbxProfile.Titles, existingXBXProfile.Titles);

            return updatedXBXProfile;
        }

        public XBXDetail MapDetail(XBXDetail detail, XBXDetail existingDetail) { 

            var updatedDetail = detail;
            updatedDetail.Id = existingDetail.Id;
            return updatedDetail;
        }

        public List<XBXTitle> MapTitles(List<XBXTitle> titles, List<XBXTitle> existingTitles)
        {
            var updatedTitles = titles;

            updatedTitles.ForEach(title => { 
                var existingTitle = existingTitles.SingleOrDefault(existingTitle => existingTitle.TitleId == title.TitleId);
                if (existingTitle != null) 
                { 
                    title.Id = existingTitle.Id;
        
                    title.TitleHistoryId = existingTitle.TitleHistoryId;
                    title.TitleHistory = MapTitleHistory(title.TitleHistory, existingTitle.TitleHistory);

                    title.AchievementSummaryId = existingTitle.AchievementSummaryId;
                    title.AchievementSummary = MapAchievement(title.AchievementSummary, existingTitle.AchievementSummary);
                }
            });

            return updatedTitles;
        }

        public XBXAchievementSummary MapAchievement(XBXAchievementSummary achievement, XBXAchievementSummary existingAchievement)
        {
            var updatedAchievement = achievement;
            updatedAchievement.Id = existingAchievement.Id;
            return updatedAchievement;
        }

        public XBXTitleHistory MapTitleHistory(XBXTitleHistory titleHistory, XBXTitleHistory existingTitleHistory)
        {
            var updatedTitleHistory = titleHistory;
            updatedTitleHistory.Id = existingTitleHistory.Id;
            return updatedTitleHistory;
        }
    }
}
