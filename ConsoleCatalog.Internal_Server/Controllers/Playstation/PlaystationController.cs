using ConsoleCatalog.Server.Models;
using ConsoleCatalog.Server.Models.Playstation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ConsoleCatalog.Server.Controllers.Playstation
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

        [HttpGet(Name = "GetProfileById")]
        [Route("getProfileById/{Id}")]
        public PSNProfile? GetProfileById(int Id)
        {
            var profile = _databaseContext.PSNProfiles
                .Include(p => p.AvatarUrls)
                .Include(p => p.Presences)
                .Include(p => p.ConsoleAvailability)
                .Include(p => p.PersonalDetail)
                .Include(p => p.TrophySummary)
                    .ThenInclude(ts => ts.EarnedTrophies)
                .Include(p => p.TrophyTitles)
                    .ThenInclude(tt => tt.TrophyTitles)
                        .ThenInclude(tt => tt.DefinedTrophies)
                .Include(p => p.TrophyTitles)
                    .ThenInclude(tt => tt.TrophyTitles)
                        .ThenInclude(tt => tt.EarnedTrophies)
                .SingleOrDefault(p => p.Id == Id);

            if (profile != null)
                profile.TrophyTitles.TrophyTitles = profile.TrophyTitles.TrophyTitles
                    .Take(10)
                    .ToList();

            return profile;
        }

        [HttpGet(Name = "GetProfileByOnlineId")]
        [Route("getProfileByOnlineId/{onlineId}")]
        public PSNProfile? GetProfileByOnlineId(string onlineId)
        {
            var profile = _databaseContext.PSNProfiles
                .Include(p => p.AvatarUrls)
                .Include(p => p.Presences)
                .Include(p => p.ConsoleAvailability)
                .Include(p => p.PersonalDetail)
                .Include(p => p.TrophySummary)
                    .ThenInclude(ts => ts.EarnedTrophies)
                .Include(p => p.TrophyTitles)
                    .ThenInclude(tt => tt.TrophyTitles)
                        .ThenInclude(tt => tt.DefinedTrophies)
                .Include(p => p.TrophyTitles)
                    .ThenInclude(tt => tt.TrophyTitles)
                        .ThenInclude(tt => tt.EarnedTrophies)
                .SingleOrDefault(p => p.OnlineId == onlineId);

            if (profile != null)
                profile.TrophyTitles.TrophyTitles = profile.TrophyTitles.TrophyTitles
                    .Take(10)
                    .ToList();
            
            return profile;
        }

        [HttpGet(Name = "GetProfileByAccountId")]
        [Route("getProfileByAccountId/{accountId}")]
        public PSNProfile? GetProfileByAccountId(string accountId)
        {
            var profile = _databaseContext.PSNProfiles
                .Include(p => p.AvatarUrls)
                .Include(p => p.Presences)
                .Include(p => p.ConsoleAvailability)
                .Include(p => p.PersonalDetail)
                .Include(p => p.TrophySummary)
                    .ThenInclude(ts => ts.EarnedTrophies)
                .Include(p => p.TrophyTitles)
                    .ThenInclude(tt => tt.TrophyTitles)
                        .ThenInclude(tt => tt.DefinedTrophies)
                .Include(p => p.TrophyTitles)
                    .ThenInclude(tt => tt.TrophyTitles)
                        .ThenInclude(tt => tt.EarnedTrophies)
                .SingleOrDefault(p => p.AccountId == accountId);

            if (profile != null)
                profile.TrophyTitles.TrophyTitles = profile.TrophyTitles.TrophyTitles
                    .Take(10)
                    .ToList();

            return profile;
        }

        [HttpPost(Name = "PostProfile")]
        [Route("postProfile")]
        public PSNProfile PostProfile([FromBody] PSNProfile psnProfile)
        {
            _databaseContext.PSNProfiles.Add(psnProfile);
            _databaseContext.SaveChanges();
            return psnProfile;
        }

        [HttpPut(Name = "PutProfile")]
        [Route("putProfile")]
        public PSNProfile PutProfile([FromBody] PSNProfile psnProfile)
        {
            _databaseContext.PSNProfiles.Update(psnProfile);
            _databaseContext.SaveChanges();
            return psnProfile;
        }

        [HttpPost(Name = "GetProfileTitles")]
        [Route("getProfileTitles/{trophyTitlesObjectId}/{offset}")]
        public List<TrophyTitle> GetProfileTitles(int trophyTitlesObjectId, int offset)
        {
            var trophyTitles = _databaseContext.TrophyTitles
                .Include(tt => tt.DefinedTrophies)
                .Include(tt => tt.EarnedTrophies)
                .Where(trophyTitle => trophyTitle.TrophyTitleObjectId == trophyTitlesObjectId)
                .Select(trophyTitle => trophyTitle)
                .Skip(offset)
                .Take(10)
                .ToList();
            return trophyTitles;
        }
    }
}