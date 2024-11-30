using ConsoleCatalog.Internal_Server.Models;

namespace ConsoleCatalog.Internal_Server.Helpers
{
    public class SubObjectiveHelper
    {
        public SubObjective GetSubObjectiveChildren(DatabaseContext databaseContext, SubObjective subObjective)
        {
            subObjective.Children = [.. databaseContext.SubObjectives
                .Where(so => so.SubObjectiveId == subObjective.Id)
                .Select(so => so)
                .OrderByDescending(so => !so.IsComplete)
                    .ThenByDescending(so => so.CreatedDate)
                    .ThenBy(so => so.Details)];

            if (subObjective.Children.Count == 0)
                return subObjective;

            subObjective.Children.ForEach(so => {
                so = GetSubObjectiveChildren(databaseContext, so);
            });

            return subObjective;
        }

        public void DeleteSubObjectiveChildren(DatabaseContext databaseContext, SubObjective subObjective)
        {

            subObjective.Children = [.. databaseContext.SubObjectives
                .Where(so => so.SubObjectiveId == subObjective.Id)
                .Select(so => so)];

            subObjective.Children.ForEach(so =>
            {
                DeleteSubObjectiveChildren(databaseContext, so);
            });

            databaseContext.Remove(subObjective);
        }

    }
}
