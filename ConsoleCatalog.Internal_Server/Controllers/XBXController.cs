using ConsoleCatalog.Internal_Server.Mappers;
using ConsoleCatalog.Internal_Server.Models;
using ConsoleCatalog.Internal_Server.Models.Xbox;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ConsoleCatalog.Internal_Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class XBXController : ControllerBase
    {
        private readonly ILogger<XBXController> _logger;
        private readonly DatabaseContext _databaseContext;

        public XBXController(ILogger<XBXController> logger, DatabaseContext databaseContext)
        {
            _logger = logger;
            _databaseContext = databaseContext;
        }

        // Profile
        [HttpGet(Name = "GetXBXProfileByGamertag")]
        [Route("[action]/{gamertag}")]
        public async Task<XBXProfile?> GetXBXProfileByGamertag(string gamertag)
        {
            var profile = await _databaseContext.XBXProfiles
                .Include(p => p.Detail)
                .Include(p => p.Titles)
                    .ThenInclude(t => t.TitleHistory)
                .Include(p => p.Titles)
                    .ThenInclude(t => t.Achievement)
                .SingleOrDefaultAsync(p => p.Gamertag == gamertag);

            if (profile != null)
                profile.Titles = profile.Titles
                    .OrderByDescending(t => t.TitleHistory.LastTimePlayed)
                    .Take(10)
                    .ToList();

            return profile;
        }

        [HttpPost(Name = "PostXBXProfile")]
        [Route("[action]")]
        public async Task<XBXProfile> PostXBXProfile([FromBody] XBXProfile xbxProfile)
        {
            await _databaseContext.XBXProfiles.AddAsync(xbxProfile);
            await _databaseContext.SaveChangesAsync();
            return xbxProfile;
        }

        [HttpPut(Name = "PutXBXProfile")]
        [Route("[action]")]
        public async Task<XBXProfile> PutXBXProfile([FromBody] XBXProfile xbxProfile)
        {
            var existingXBXProfile = await _databaseContext.XBXProfiles
                .Include(p => p.Detail)
                .Include(p => p.Titles)
                    .ThenInclude(t => t.TitleHistory)
                .Include(p => p.Titles)
                    .ThenInclude(t => t.Achievement)
                .AsNoTracking()
                .SingleAsync(p => p.Gamertag == xbxProfile.Gamertag);

            var updatedXBXProfile = new XBXProfileMapper().MapProfile(xbxProfile, existingXBXProfile);

            _databaseContext.XBXProfiles.Update(updatedXBXProfile);
            await _databaseContext.SaveChangesAsync();

            xbxProfile.Titles = xbxProfile.Titles
                .OrderByDescending(t => t.TitleHistory.LastTimePlayed)
                .Take(10)
                .ToList();

            return xbxProfile;
        }

        [HttpGet(Name = "GetXBXProfileTitles")]
        [Route("[action]/{profileId}/{offset}")]
        public async Task<List<XBXTitle>> GetXBXProfileTitles(int profileId, int offset)
        {
            var titles = await _databaseContext.XBXTitles
                .Include(t => t.TitleHistory)
                .Include(t => t.Achievement)
                .Where(title => title.XBXProfileId == profileId)
                .Select(title => title)
                .Skip(offset)
                .Take(10)
                .ToListAsync();

            return titles;
        }
    }
}
