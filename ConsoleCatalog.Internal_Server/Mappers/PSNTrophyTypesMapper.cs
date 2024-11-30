using ConsoleCatalog.Internal_Server.Models.Playstation;

namespace ConsoleCatalog.Internal_Server.Mappers
{
    public class PSNTrophyTypesMapper
    {
        public EarnedTrophyTypes MapEarnedTrophyTypes(EarnedTrophyTypes earnedTrophyTypes, EarnedTrophyTypes existingEarnedTrophyTypes)
        {
            var updatedEarnedTrophyTypes = earnedTrophyTypes;
            updatedEarnedTrophyTypes.Id = existingEarnedTrophyTypes.Id;
            return updatedEarnedTrophyTypes;
        }

        public DefinedTrophyTypes MapDefinedTrophyTypes(DefinedTrophyTypes definedTrophyTypes, DefinedTrophyTypes existingDefinedTrophyTypes)
        {
            var updatedDefinedTrophyTypes = definedTrophyTypes;
            updatedDefinedTrophyTypes.Id = existingDefinedTrophyTypes.Id;
            return updatedDefinedTrophyTypes;
        }
    }
}
