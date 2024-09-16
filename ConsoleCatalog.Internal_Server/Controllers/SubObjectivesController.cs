using ConsoleCatalog.Internal_Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace ConsoleCatalog.Internal_Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SubObjectivesController : ControllerBase
    {
        private readonly ILogger<SubObjectivesController> _logger;
        private readonly DatabaseContext _databaseContext;

        public SubObjectivesController(ILogger<SubObjectivesController> logger, DatabaseContext databaseContext)
        {
            _logger = logger;
            _databaseContext = databaseContext;
        }

        [HttpGet(Name = "GetSubObjective")]
        [Route("[action]/{subObjectiveId}")]
        public SubObjective GetSubObjective(string subObjectiveId)
        {
            var subObjective = _databaseContext.SubObjectives
                .Single(subObjective => subObjective.Id == new Guid(subObjectiveId));
            return subObjective;
        }

        [HttpGet(Name = "GetSubObjectives")]
        [Route("[action]/{userId}/{titleId}/{trophyId}")]
        public List<SubObjective> GetSubObjectives(string userId, string titleId, string trophyId)
        {
            var subObjectives = _databaseContext.SubObjectives
                .Where(subObjective => subObjective.UserId == new Guid(userId) && subObjective.TitleId == titleId && subObjective.TrophyId == int.Parse(trophyId))
                .Select(subObjective => subObjective)
                .ToList();
            return subObjectives;
        }

        [HttpPost(Name = "PostSubObjective")]
        [Route("[action]")]
        public SubObjective PostSubObjective([FromBody] SubObjective subObjective)
        {
            _databaseContext.SubObjectives.Add(subObjective);
            _databaseContext.SaveChanges();
            return subObjective;
        }

        [HttpPost(Name = "PostSubObjectives")]
        [Route("[action]")]
        public List<SubObjective> PostSubObjectives([FromBody] List<SubObjective> subObjectives)
        {
            _databaseContext.SubObjectives.AddRange(subObjectives);
            _databaseContext.SaveChanges();
            var newSubObjectives = _databaseContext.SubObjectives
                .Where(subObjective => subObjective.UserId == subObjectives[0].UserId && subObjective.TitleId == subObjectives[0].TitleId && subObjective.TrophyId == subObjectives[0].TrophyId)
                .Select(subObjective => subObjective)
                .ToList();
            return newSubObjectives;
        }

        [HttpPut(Name = "PutSubObjective")]
        [Route("[action]")]
        public SubObjective PutSubObjective(SubObjective subObjective)
        {
            subObjective.IsComplete = !subObjective.IsComplete;
            _databaseContext.SubObjectives.Update(subObjective);
            _databaseContext.SaveChanges();
            return subObjective;
        }

        [HttpDelete(Name = "DeleteSubObjective")]
        [Route("[action]/{subObjectiveId}")]
        public Guid DeleteSubObjective(string subObjectiveId)
        {
            var subObjective = _databaseContext.SubObjectives
                .Single(subObjective => subObjective.Id == new Guid(subObjectiveId));
            _databaseContext.SubObjectives.Remove(subObjective);
            _databaseContext.SaveChanges();
            return subObjective.Id;
        }

        [HttpDelete(Name = "DeleteSubObjectives")]
        [Route("[action]")]
        public List<Guid> DeleteSubObjectives([FromBody] List<SubObjective> subObjectives)
        {
            _databaseContext.SubObjectives.RemoveRange(subObjectives);
            _databaseContext.SaveChanges();
            return subObjectives
                .Select(subObjective => subObjective.Id)
                .ToList();
        }
    }
}
