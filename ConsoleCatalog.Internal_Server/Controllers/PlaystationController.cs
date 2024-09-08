using ConsoleCatalog.Internal_Server.Methods;
using ConsoleCatalog.Internal_Server.Models.Playstation;
using ConsoleCatalog.Server.Models;
using ConsoleCatalog.Server.Models.Playstation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ConsoleCatalog.Internal_Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PlaystationController : ControllerBase
    {
        private readonly ILogger<PlaystationController> _logger;
        private readonly DatabaseContext _databaseContext;

        public PlaystationController(ILogger<PlaystationController> logger, DatabaseContext databaseContext)
        {
            _logger = logger;
            _databaseContext = databaseContext;
        }

        [HttpGet(Name = "GetProfileByOnlineId")]
        [Route("getProfileByOnlineId/{onlineId}")]
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
                profile.TrophyTitles.TrophyTitles = profile.TrophyTitles.TrophyTitles
                    .Take(10)
                    .ToList();

            return profile;
        }

        [HttpPost(Name = "PostProfile")]
        [Route("postProfile")]
        public async Task<PSNProfile> PostProfile([FromBody] PSNProfile psnProfile)
        {
            await _databaseContext.PSNProfiles.AddAsync(psnProfile);
            await _databaseContext.SaveChangesAsync();
            return psnProfile;
        }

        [HttpPut(Name = "PutProfile")]
        [Route("putProfile")]
        public async Task<PSNProfile> PutProfile([FromBody] PSNProfile psnProfile)
        {
            var psnProfileToUpdate = await _databaseContext.PSNProfiles
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

            psnProfileToUpdate = new PSNProfileMapper().MapProfile(psnProfile, psnProfileToUpdate);

            _databaseContext.PSNProfiles.Update(psnProfileToUpdate);
            await _databaseContext.SaveChangesAsync();

            psnProfile.TrophyTitles.TrophyTitles = psnProfile.TrophyTitles.TrophyTitles
                .Take(10)
                .ToList();

            return psnProfile;
        }

        [HttpGet(Name = "GetProfileTitles")]
        [Route("getProfileTitles/{trophyTitlesObjectId}/{offset}")]
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

        [HttpGet(Name = "GetTitleTrophies")]
        [Route("getTitleTrophies/{titleId}/groups/{trophyGroupId}")]
        public async Task<List<TitleTrophy>?> GetTitleTrophies(string titleId, string trophyGroupId)
        {
            var titleTrophies = await _databaseContext.TitleTrophies
                .Where(titleTrophy => titleTrophy.TitleId == titleId && titleTrophy.TrophyGroupId == trophyGroupId)
                .Select(titleTrophy => titleTrophy)
                .ToListAsync();
            return titleTrophies;
        }

        [HttpPost(Name = "PostTitleTrophies")]
        [Route("postTitleTrophies")]
        public async Task<List<TitleTrophy>> PostTitleTrophies([FromBody] List<TitleTrophy> titleTrophies)
        {
            await _databaseContext.TitleTrophies.AddRangeAsync(titleTrophies);
            await _databaseContext.SaveChangesAsync();
            return titleTrophies;
        }

        [HttpPut(Name = "PutTitleTrophies")]
        [Route("putTitleTrophies")]
        public async Task<List<TitleTrophy>> PutTitleTrophies([FromBody] List<TitleTrophy> titleTrophies)
        {
            _databaseContext.TitleTrophies.UpdateRange(titleTrophies);
            await _databaseContext.SaveChangesAsync();

            return titleTrophies;
        }

        [HttpGet(Name = "GetEarnedTitleTrophies")]
        [Route("getEarnedTitleTrophies/{psnProfileId}/titles/{titleId}/groups/{trophyGroupId}")]
        public async Task<List<EarnedTitleTrophy>?> GetEarnedTitleTrophies(int psnProfileId, string titleId, string trophyGroupId)
        {
            var earnedtitleTrophies = await _databaseContext.EarnedTitleTrophies 
                .Where(earnedtitleTrophy => earnedtitleTrophy.PSNProfileId == psnProfileId && earnedtitleTrophy.TitleId == titleId && earnedtitleTrophy.TrophyGroupId == trophyGroupId)
                .Select(earnedtitleTrophy => earnedtitleTrophy)
                .ToListAsync();
            return earnedtitleTrophies;
        }

        [HttpPost(Name = "PostEarnedTitleTrophies")]
        [Route("postEarnedTitleTrophies")]
        public async Task<List<EarnedTitleTrophy>> PostEarnedTitleTrophies([FromBody] List<EarnedTitleTrophy> earnedTitleTrophies)
        {
            await _databaseContext.EarnedTitleTrophies.AddRangeAsync(earnedTitleTrophies);
            await _databaseContext.SaveChangesAsync();
            return earnedTitleTrophies;
        }

        [HttpPut(Name = "PutEarnedTitleTrophies")]
        [Route("putEarnedTitleTrophies")]
        public async Task<List<EarnedTitleTrophy>> PutEarnedTitleTrophies([FromBody] List<EarnedTitleTrophy> earnedTitleTrophies)
        {
            _databaseContext.EarnedTitleTrophies.UpdateRange(earnedTitleTrophies);
            await _databaseContext.SaveChangesAsync();
            return earnedTitleTrophies;
        }

        [HttpGet(Name = "GetDefinedTrophyGroupObject")]
        [Route("getDefinedTrophyGroupObject/{titleId}/groups")]
        public async Task<DefinedTrophyGroupObject>? GetDefinedTrophyGroupObject(string titleId)
        {
            var definedTrophyGroupObject = await _databaseContext.DefinedTrophyGroupObjects
                .Include(etgo => etgo.DefinedTrophies)
                .Include(etgo => etgo.TrophyGroups)
                    .ThenInclude(tg => tg.DefinedTrophies)
                .SingleAsync(etgo => etgo.NpCommunicationId == titleId);

            return definedTrophyGroupObject;
        }

        [HttpGet(Name = "GetEarnedTrophyGroupObject")]
        [Route("getEarnedTrophyGroupObject/{psnProfileId}/{titleId}/groups")]
        public async Task<EarnedTrophyGroupObject>? GetEarnedTrophyGroupObject(int psnProfileId, string titleId)
        {
            var earnedTrophyGroupObject = await _databaseContext.EarnedTrophyGroupObjects
                .Include(etgo => etgo.EarnedTrophies)
                .Include(etgo => etgo.TrophyGroups)
                    .ThenInclude(tg => tg.EarnedTrophies)
                .SingleAsync(etgo => etgo.PSNProfileId == psnProfileId && etgo.NpCommunicationId == titleId);

            return earnedTrophyGroupObject;
        }
    }
}