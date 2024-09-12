using ConsoleCatalog.Internal_Server.Mappers;
using ConsoleCatalog.Internal_Server.Methods;
using ConsoleCatalog.Internal_Server.Models.Playstation;
using ConsoleCatalog.Internal_Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ConsoleCatalog.Internal_Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PSNController : ControllerBase
    {
        private readonly ILogger<PSNController> _logger;
        private readonly DatabaseContext _databaseContext;

        public PSNController(ILogger<PSNController> logger, DatabaseContext databaseContext)
        {
            _logger = logger;
            _databaseContext = databaseContext;
        }

        // Profile
        [HttpGet(Name = "GetProfileByOnlineId")]
        [Route("[action]/{onlineId}")]
        public async Task<PSNProfile?> GetProfileByOnlineId(string onlineId)
        {
            var profile = await _databaseContext.PSNProfiles
                .Include(p => p.AvatarUrls)
                .Include(p => p.PersonalDetail)
                .Include(p => p.TrophySummary)
                    .ThenInclude(ts => ts.EarnedTrophies)
                .Include(p => p.TrophyTitles)
                    .ThenInclude(tt => tt.TrophyTitles)
                        .ThenInclude(tt => tt.DefinedTrophies)
                .Include(p => p.TrophyTitles)
                    .ThenInclude(tt => tt.TrophyTitles)
                        .ThenInclude(tt => tt.EarnedTrophies)
                .SingleOrDefaultAsync(p => p.OnlineId == onlineId);

            if (profile != null)
                profile.TrophyTitles.TrophyTitles = profile.TrophyTitles.TrophyTitles.OrderByDescending(tt => tt.LastUpdatedDateTime)
                    .Take(10)
                    .ToList();

            return profile;
        }

        [HttpPost(Name = "PostProfile")]
        [Route("[action]")]
        public async Task<PSNProfile> PostProfile([FromBody] PSNProfile psnProfile)
        {
            await _databaseContext.PSNProfiles.AddAsync(psnProfile);
            await _databaseContext.SaveChangesAsync();
            return psnProfile;
        }

        [HttpPut(Name = "PutProfile")]
        [Route("[action]")]
        public async Task<PSNProfile> PutProfile([FromBody] PSNProfile psnProfile)
        {
            var existingPSNProfile = await _databaseContext.PSNProfiles
                .Include(p => p.AvatarUrls)
                .Include(p => p.PersonalDetail)
                .Include(p => p.TrophySummary)
                    .ThenInclude(ts => ts.EarnedTrophies)
                .Include(p => p.TrophyTitles)
                    .ThenInclude(tt => tt.TrophyTitles)
                        .ThenInclude(tt => tt.DefinedTrophies)
                .Include(p => p.TrophyTitles)
                    .ThenInclude(tt => tt.TrophyTitles)
                        .ThenInclude(tt => tt.EarnedTrophies)
                .AsNoTracking()
                .SingleAsync(p => p.OnlineId == psnProfile.OnlineId);

            var updatedPSNProfile = new PSNProfileMapper().MapProfile(psnProfile, existingPSNProfile);

            _databaseContext.PSNProfiles.Update(updatedPSNProfile);
            await _databaseContext.SaveChangesAsync();

            psnProfile.TrophyTitles.TrophyTitles = psnProfile.TrophyTitles.TrophyTitles
                .Take(10)
                .ToList();

            return psnProfile;
        }

        [HttpGet(Name = "GetProfileTitles")]
        [Route("[action]/{trophyTitlesObjectId}/{offset}")]
        public async Task<List<TrophyTitle>> GetProfileTitles(int trophyTitlesObjectId, int offset)
        {
            var trophyTitles = await _databaseContext.TrophyTitles
                .Include(tt => tt.DefinedTrophies)
                .Include(tt => tt.EarnedTrophies)
                .Where(trophyTitle => trophyTitle.TrophyTitleObjectId == trophyTitlesObjectId)
                .Select(trophyTitle => trophyTitle)
                .Skip(offset)
                .Take(10)
                .ToListAsync();
            return trophyTitles;
        }

        // Defined Title Trophies
        [HttpGet(Name = "GetTitleTrophies")]
        [Route("[action]/{titleId}/{trophyGroupId}")]
        public async Task<List<TitleTrophy>?> GetTitleTrophies(string titleId, string trophyGroupId)
        {
            var titleTrophies = await _databaseContext.TitleTrophies
                .Where(titleTrophy => titleTrophy.TitleId == titleId && titleTrophy.TrophyGroupId == trophyGroupId)
                .Select(titleTrophy => titleTrophy)
                .ToListAsync();
            return titleTrophies;
        }

        [HttpPost(Name = "PostTitleTrophies")]
        [Route("[action]")]
        public async Task<List<TitleTrophy>> PostTitleTrophies([FromBody] List<TitleTrophy> titleTrophies)
        {
            await _databaseContext.TitleTrophies.AddRangeAsync(titleTrophies);
            await _databaseContext.SaveChangesAsync();
            return titleTrophies;
        }

        [HttpPut(Name = "PutTitleTrophies")]
        [Route("[action]")]
        public async Task<List<TitleTrophy>> PutTitleTrophies([FromBody] List<TitleTrophy> titleTrophies)
        {
            var existingTitleTrophies = await _databaseContext.TitleTrophies
                .Where(titleTrophy => titleTrophy.TitleId == titleTrophies.First().TitleId && titleTrophy.TrophyGroupId == titleTrophies.First().TrophyGroupId)
                .Select(titleTrophy => titleTrophy)
                .AsNoTracking()
                .ToListAsync();


            var updatedTitleTrophies = titleTrophies;

            updatedTitleTrophies.ForEach(titleTrophy =>
            {
                var existingTitleTrophy = existingTitleTrophies.Single(existingTitleTrophy => existingTitleTrophy.TrophyId == titleTrophy.TrophyId);
                titleTrophy = new PSNTitleTrophyMapper().MapTitleTrophy(titleTrophy, existingTitleTrophy);
            });

            _databaseContext.TitleTrophies.UpdateRange(updatedTitleTrophies);
            await _databaseContext.SaveChangesAsync();

            return updatedTitleTrophies;
        }

        // Earned Title Trophies
        [HttpGet(Name = "GetEarnedTitleTrophies")]
        [Route("[action]/{psnProfileId}/{titleId}/{trophyGroupId}")]
        public async Task<List<EarnedTitleTrophy>?> GetEarnedTitleTrophies(int psnProfileId, string titleId, string trophyGroupId)
        {
            var earnedtitleTrophies = await _databaseContext.EarnedTitleTrophies 
                .Where(earnedtitleTrophy => earnedtitleTrophy.PSNProfileId == psnProfileId && earnedtitleTrophy.TitleId == titleId && earnedtitleTrophy.TrophyGroupId == trophyGroupId)
                .Select(earnedtitleTrophy => earnedtitleTrophy)
                .ToListAsync();
            return earnedtitleTrophies;
        }

        [HttpPost(Name = "PostEarnedTitleTrophies")]
        [Route("[action]")]
        public async Task<List<EarnedTitleTrophy>> PostEarnedTitleTrophies([FromBody] List<EarnedTitleTrophy> earnedTitleTrophies)
        {
            await _databaseContext.EarnedTitleTrophies.AddRangeAsync(earnedTitleTrophies);
            await _databaseContext.SaveChangesAsync();
            return earnedTitleTrophies;
        }

        [HttpPut(Name = "PutEarnedTitleTrophies")]
        [Route("[action]")]
        public async Task<List<EarnedTitleTrophy>> PutEarnedTitleTrophies([FromBody] List<EarnedTitleTrophy> earnedTitleTrophies)
        {
            var existingEarnedtitleTrophies = await _databaseContext.EarnedTitleTrophies
                .Where(earnedtitleTrophy => earnedtitleTrophy.PSNProfileId == earnedTitleTrophies[0].PSNProfileId && earnedtitleTrophy.TitleId == earnedTitleTrophies[0].TitleId && earnedtitleTrophy.TrophyGroupId == earnedTitleTrophies[0].TrophyGroupId)
                .Select(earnedtitleTrophy => earnedtitleTrophy)
                .AsNoTracking()
                .ToListAsync();

            var updatedEarnedTitleTrophies = earnedTitleTrophies;

            updatedEarnedTitleTrophies.ForEach(earnedTitleTrophy =>
            {
                var existingEarnedTitleTrophy = existingEarnedtitleTrophies.SingleOrDefault(existingEarnedTitleTrophy => existingEarnedTitleTrophy.TrophyId == earnedTitleTrophy.TrophyId);
                if (existingEarnedTitleTrophy == null)
                    _databaseContext.EarnedTitleTrophies.Add(earnedTitleTrophy);
                else
                {
                    earnedTitleTrophy = new PSNTitleTrophyMapper().MapEarnedTitleTrophy(earnedTitleTrophy, existingEarnedTitleTrophy);
                    _databaseContext.EarnedTitleTrophies.Update(earnedTitleTrophy);
                }
            });

            await _databaseContext.SaveChangesAsync();

            return updatedEarnedTitleTrophies;
        }

        // Defined Trophy Group Object
        [HttpGet(Name = "GetDefinedTrophyGroupObject")]
        [Route("[action]/{titleId}")]
        public async Task<DefinedTrophyGroupObject?> GetDefinedTrophyGroupObject(string titleId)
        {
            var definedTrophyGroupObject = await _databaseContext.DefinedTrophyGroupObjects
                .Include(etgo => etgo.DefinedTrophies)
                .Include(etgo => etgo.TrophyGroups)
                    .ThenInclude(tg => tg.DefinedTrophies)
                .SingleOrDefaultAsync(etgo => etgo.NpCommunicationId == titleId);

            return definedTrophyGroupObject;
        }

        [HttpPost(Name = "PostDefinedTrophyGroupObject")]
        [Route("[action]")]
        public async Task<DefinedTrophyGroupObject> PostDefinedTrophyGroupObject([FromBody] DefinedTrophyGroupObject definedTrophyGroupObject)
        {
            await _databaseContext.DefinedTrophyGroupObjects.AddRangeAsync(definedTrophyGroupObject);
            await _databaseContext.SaveChangesAsync();
            return definedTrophyGroupObject;
        }

        [HttpPut(Name = "PutDefinedTrophyGroupObject")]
        [Route("[action]")]
        public async Task<DefinedTrophyGroupObject> PutDefinedTrophyGroupObject([FromBody] DefinedTrophyGroupObject definedTrophyGroupObject)
        {
            var existingDefinedTrophyGroupObject = await _databaseContext.DefinedTrophyGroupObjects
               .Include(etgo => etgo.DefinedTrophies)
               .Include(etgo => etgo.TrophyGroups)
                   .ThenInclude(tg => tg.DefinedTrophies)
               .AsNoTracking()
               .SingleAsync(etgo => etgo.NpCommunicationId == definedTrophyGroupObject.NpCommunicationId);

            var updatedDefinedTrophyGroupObject = new PSNTrophyGroupObjectMapper().MapDefinedTrophyGroupObject(definedTrophyGroupObject, existingDefinedTrophyGroupObject);

            _databaseContext.DefinedTrophyGroupObjects.Update(updatedDefinedTrophyGroupObject);
            await _databaseContext.SaveChangesAsync();


            return updatedDefinedTrophyGroupObject;
        }

        // Earend Trophy Group Object
        [HttpGet(Name = "GetEarnedTrophyGroupObject")]
        [Route("[action]/{psnProfileId}/{titleId}")]
        public async Task<EarnedTrophyGroupObject?> GetEarnedTrophyGroupObject(int psnProfileId, string titleId)
        {
            var earnedTrophyGroupObject = await _databaseContext.EarnedTrophyGroupObjects
                .Include(etgo => etgo.EarnedTrophies)
                .Include(etgo => etgo.TrophyGroups)
                    .ThenInclude(tg => tg.EarnedTrophies)
                .SingleOrDefaultAsync(etgo => etgo.PSNProfileId == psnProfileId && etgo.NpCommunicationId == titleId);

            return earnedTrophyGroupObject;
        }

        [HttpPost(Name = "PostEarnedTrophyGroupObject")]
        [Route("[action]")]
        public async Task<EarnedTrophyGroupObject> PostEarnedTrophyGroupObject([FromBody] EarnedTrophyGroupObject earnedTrophyGroupObject)
        {
            await _databaseContext.EarnedTrophyGroupObjects.AddRangeAsync(earnedTrophyGroupObject);
            await _databaseContext.SaveChangesAsync();
            return earnedTrophyGroupObject;
        }

        [HttpPut(Name = "PutEarnedTrophyGroupObject")]
        [Route("[action]")]
        public async Task<EarnedTrophyGroupObject> PutEarnedTrophyGroupObject([FromBody] EarnedTrophyGroupObject earnedTrophyGroupObject)
        {
            var existingEarnedTrophyGroupObject = await _databaseContext.EarnedTrophyGroupObjects
               .Include(etgo => etgo.EarnedTrophies)
               .Include(etgo => etgo.TrophyGroups)
                   .ThenInclude(tg => tg.EarnedTrophies)
               .AsNoTracking()
               .SingleAsync(etgo => etgo.PSNProfileId == earnedTrophyGroupObject.PSNProfileId && etgo.NpCommunicationId == earnedTrophyGroupObject.NpCommunicationId);

            var updatedEarnedTrophyGroupObject = new PSNTrophyGroupObjectMapper().MapEarnedTrophyGroupObject(earnedTrophyGroupObject, existingEarnedTrophyGroupObject);

            _databaseContext.EarnedTrophyGroupObjects.Update(updatedEarnedTrophyGroupObject);
            await _databaseContext.SaveChangesAsync();


            return updatedEarnedTrophyGroupObject;
        }
    }
}