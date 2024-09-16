using ConsoleCatalog.Internal_Server.Models.Playstation;

namespace ConsoleCatalog.Internal_Server.Mappers
{
    public class PSNTrophyGroupObjectMapper
    {
        public readonly PSNTrophyTypesMapper psnTrophyTypesMapper = new();

        public DefinedTrophyGroupObject MapDefinedTrophyGroupObject(DefinedTrophyGroupObject definedTrophyGroupObject, DefinedTrophyGroupObject existingDefinedTrophyGroupObject) {

            var updatedDefinedTrophyGroupObject = definedTrophyGroupObject;

            updatedDefinedTrophyGroupObject.Id = existingDefinedTrophyGroupObject.Id;
            updatedDefinedTrophyGroupObject.NpCommunicationId = existingDefinedTrophyGroupObject.NpCommunicationId;

            updatedDefinedTrophyGroupObject.DefinedTrophies = psnTrophyTypesMapper.MapDefinedTrophyTypes(definedTrophyGroupObject.DefinedTrophies, existingDefinedTrophyGroupObject.DefinedTrophies);

            updatedDefinedTrophyGroupObject.TrophyGroups = MapDefinedTrophyGroups(definedTrophyGroupObject.TrophyGroups, existingDefinedTrophyGroupObject.TrophyGroups);

            return updatedDefinedTrophyGroupObject;
        }

        private List<DefinedTrophyGroup> MapDefinedTrophyGroups(List<DefinedTrophyGroup> definedTrophyGroups, List<DefinedTrophyGroup> existingDefinedTrophyGroups) {

            var updatedDefinedTrophyGroups = definedTrophyGroups;

            updatedDefinedTrophyGroups.ForEach(definedTrophyGroup =>
            {
                var existingDefinedTrophyGroup = existingDefinedTrophyGroups.Single(existingDefinedTrophyGroup => existingDefinedTrophyGroup.TrophyGroupId == definedTrophyGroup.TrophyGroupId);

                definedTrophyGroup.Id = existingDefinedTrophyGroup.Id;
                definedTrophyGroup.DefinedTrophyGroupObjectId = existingDefinedTrophyGroup.DefinedTrophyGroupObjectId;

                definedTrophyGroup.DefinedTrophies = psnTrophyTypesMapper.MapDefinedTrophyTypes(definedTrophyGroup.DefinedTrophies, existingDefinedTrophyGroup.DefinedTrophies);
            });

            return updatedDefinedTrophyGroups;
        }

        public EarnedTrophyGroupObject MapEarnedTrophyGroupObject(EarnedTrophyGroupObject earnedTrophyGroupObject, EarnedTrophyGroupObject existingEarnedTrophyGroupObject)
        {
            var updatedEarnedTrophyGroupObject = earnedTrophyGroupObject;

            updatedEarnedTrophyGroupObject.Id = existingEarnedTrophyGroupObject.Id;
            updatedEarnedTrophyGroupObject.PSNProfileId = existingEarnedTrophyGroupObject.PSNProfileId;
            updatedEarnedTrophyGroupObject.NpCommunicationId = existingEarnedTrophyGroupObject.NpCommunicationId;

            updatedEarnedTrophyGroupObject.EarnedTrophies = psnTrophyTypesMapper.MapEarnedTrophyTypes(earnedTrophyGroupObject.EarnedTrophies, existingEarnedTrophyGroupObject.EarnedTrophies);

            updatedEarnedTrophyGroupObject.TrophyGroups = MapEarnedTrophyGroups(earnedTrophyGroupObject.TrophyGroups, existingEarnedTrophyGroupObject.TrophyGroups);

            return updatedEarnedTrophyGroupObject;
        }

        private List<EarnedTrophyGroup> MapEarnedTrophyGroups(List<EarnedTrophyGroup> earnedTrophyGroups, List<EarnedTrophyGroup> existingEarnedTrophyGroups)
        {

            var updatedEarnedTrophyGroups = earnedTrophyGroups;

            updatedEarnedTrophyGroups.ForEach(earnedTrophyGroup =>
            {
                var existingEarnedTrophyGroup = existingEarnedTrophyGroups.Single(existingEarnedTrophyGroup => existingEarnedTrophyGroup.TrophyGroupId == earnedTrophyGroup.TrophyGroupId);

                earnedTrophyGroup.Id = existingEarnedTrophyGroup.Id;
                earnedTrophyGroup.EarnedTrophyGroupObjectId = existingEarnedTrophyGroup.EarnedTrophyGroupObjectId;

                earnedTrophyGroup.EarnedTrophies = psnTrophyTypesMapper.MapEarnedTrophyTypes(earnedTrophyGroup.EarnedTrophies, existingEarnedTrophyGroup.EarnedTrophies);
            });

            return updatedEarnedTrophyGroups;
        }
    }
}
