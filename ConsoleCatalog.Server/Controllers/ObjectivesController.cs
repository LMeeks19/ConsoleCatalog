using ConsoleCatalog.Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace ConsoleCatalog.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ObjectivesController : ControllerBase
    {
        private readonly ILogger<ObjectivesController> _logger;
        private readonly DatabaseContext _databaseContext;

        public ObjectivesController(ILogger<ObjectivesController> logger, DatabaseContext databaseContext)
        {
            _logger = logger;
            _databaseContext = databaseContext;
        }

        [HttpGet(Name = "GetSubObjective")]
        [Route("getSubObjective/{subObjectiveId}")]
        public SubObjective GetSubObjective(string subObjectiveId)
        {
            var subObjective = _databaseContext.SubObjectives
                .Single(subObjective => subObjective.Id == new Guid(subObjectiveId));
            return subObjective;
        }

        [HttpGet(Name = "GetSubObjectives")]
        [Route("getSubObjectives/{titleId}/{trophyId}")]
        public List<SubObjective> GetSubObjectives(string titleId, string trophyId)
        {
            var subObjectives = _databaseContext.SubObjectives
                .Where(subObjective => subObjective.TitleId == titleId && subObjective.TrophyId == int.Parse(trophyId))
                .Select(subObjective => subObjective)
                .ToList();
            return subObjectives;
        }

        [HttpPost(Name = "PostSubObjective")]
        [Route("postSubObjective")]

        public SubObjective PostSubObjective([FromBody] SubObjective subObjective)
        {
            _databaseContext.SubObjectives.Add(subObjective);
            _databaseContext.SaveChanges();
            return subObjective;
        }

        [HttpPost(Name = "PostSubObjectives")]
        [HttpPost(Name = "postSubObjectives")]
        public List<SubObjective> PostSubObjectives([FromBody] List<SubObjective> subObjectives)
        {
            _databaseContext.SubObjectives.AddRange(subObjectives);
            _databaseContext.SaveChanges();
            var newSubObjectives = _databaseContext.SubObjectives
                .Where(subObjective => subObjective.TitleId == subObjectives[0].TitleId && subObjective.TrophyId == subObjectives[0].TrophyId)
                .Select(subObjective => subObjective)
                .ToList();
            return subObjectives;
        }

        [HttpPut(Name = "PutSubObjective")]
        [Route("putSubObjective")]
        public SubObjective PutSubObjective(SubObjective subObjective)
        {
            subObjective.IsComplete = !subObjective.IsComplete;
            _databaseContext.SubObjectives.Update(subObjective);
            _databaseContext.SaveChanges();
            return subObjective;
        }

        [HttpDelete(Name = "DeleteSubObjective")]
        [Route("deleteSubObjective/{subObjectiveId}")]
        public Guid DeleteSubObjective(string subObjectiveId)
        {
            var subObjective = _databaseContext.SubObjectives
                .Single(subObjective => subObjective.Id == new Guid(subObjectiveId));
            _databaseContext.SubObjectives.Remove(subObjective);
            _databaseContext.SaveChanges();
            return subObjective.Id;
        }

        [HttpDelete(Name = "DeleteSubObjectives")]
        [Route("deleteSubObjectives")]
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
