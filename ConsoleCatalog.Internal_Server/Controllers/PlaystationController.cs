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

        [HttpGet(Name = "GetProfileTitles")]
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

        [HttpGet(Name = "GetTitleTrophies")]
        [Route("getTitleTrophies/{titleId}")]
        public List<TitleTrophy>? GetTitleTrophies(string titleId)
        {
            var titleTrophies = _databaseContext.TitleTrophies
                .Where(titleTrophy => titleTrophy.TitleId == titleId)
                .Select(titleTrophy => titleTrophy)
                .ToList();
            return titleTrophies;
        }

        [HttpPost(Name = "PostTitleTrophies")]
        [Route("postTitleTrophies")]
        public List<TitleTrophy> PostTitleTrophies([FromBody] List<TitleTrophy> titleTrophies)
        {
            _databaseContext.TitleTrophies.AddRange(titleTrophies);
            _databaseContext.SaveChanges();
            return titleTrophies;
        }

        [HttpPut(Name = "PutTitleTrophies")]
        [Route("putTitleTrophies")]
        public List<TitleTrophy> PutTitleTrophies([FromBody] List<TitleTrophy> titleTrophies)
        {
            _databaseContext.TitleTrophies.UpdateRange(titleTrophies);
            _databaseContext.SaveChanges();
            return titleTrophies;
        }

        [HttpGet(Name = "GetEarnedTitleTrophies")]
        [Route("getEarnedTitleTrophies/{psnProfileId}/{titleId}")]
        public List<EarnedTitleTrophy>? GetEarnedTitleTrophies(int psnProfileId, string titleId)
        {
            var earnedtitleTrophies = _databaseContext.EarnedTitleTrophies
                .Where(earnedtitleTrophy => earnedtitleTrophy.PSNProfileId == psnProfileId && earnedtitleTrophy.TitleId == titleId)
                .Select(earnedtitleTrophy => earnedtitleTrophy)
                .ToList();
            return earnedtitleTrophies;
        }

        [HttpPost(Name = "PostEarnedTitleTrophies")]
        [Route("postEarnedTitleTrophies")]
        public List<EarnedTitleTrophy> PostEarnedTitleTrophies([FromBody] List<EarnedTitleTrophy> earnedTitleTrophies)
        {
            _databaseContext.EarnedTitleTrophies.AddRange(earnedTitleTrophies);
            _databaseContext.SaveChanges();
            return earnedTitleTrophies;
        }

        [HttpPut(Name = "PutEarnedTitleTrophies")]
        [Route("putEarnedTitleTrophies")]
        public List<EarnedTitleTrophy> PutEarnedTitleTrophies([FromBody] List<EarnedTitleTrophy> earnedTitleTrophies)
        {
            _databaseContext.EarnedTitleTrophies.UpdateRange(earnedTitleTrophies);
            _databaseContext.SaveChanges();
            return earnedTitleTrophies;
        }
    }
}