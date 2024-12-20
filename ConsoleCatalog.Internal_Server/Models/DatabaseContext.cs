﻿using ConsoleCatalog.Internal_Server.Models.Playstation;
using ConsoleCatalog.Internal_Server.Models.Xbox;
using Microsoft.EntityFrameworkCore;

namespace ConsoleCatalog.Internal_Server.Models
{
    public class DatabaseContext: DbContext
    {
        public DbSet<Cookie> Cookies { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<SubObjective> SubObjectives { get; set; }

        public DbSet<AvatarUrl> AvatarUrls { get; set; }
        public DbSet<PersonalDetail> PersonalDetails { get; set; }
        public DbSet<PSNProfile> PSNProfiles { get; set; }
        public DbSet<TitleTrophy> TitleTrophies { get; set; }
        public DbSet<EarnedTitleTrophy> EarnedTitleTrophies { get; set; }
        public DbSet<TrophySummary> TrophySummaries { get; set; }
        public DbSet<TrophyTitle> TrophyTitles { get; set; }
        public DbSet<TrophyTitleObject> TrophyTitleObjects { get; set; }
        public DbSet<DefinedTrophyTypes> DefinedTrophyTypes { get; set; }
        public DbSet<EarnedTrophyTypes> EarnedTrophyTypes { get; set; }
        public DbSet<DefinedTrophyGroupObject> DefinedTrophyGroupObjects { get; set; }
        public DbSet<DefinedTrophyGroup> DefinedTrophyGroups { get; set; }
        public DbSet<EarnedTrophyGroupObject> EarnedTrophyGroupObjects { get; set; }
        public DbSet<EarnedTrophyGroup> EarnedTrophyGroups { get; set; }

        public DbSet<XBXProfile> XBXProfiles { get; set; }
        public DbSet<XBXDetail> XBXDetails { get; set; }
        public DbSet<XBXTitleHistory> XBXTitleHistories { get; set; }
        public DbSet<XBXTitle> XBXTitles { get; set; }
        public DbSet<XBXAchievementSummary> XBXAchievements { get; set; }

        public DatabaseContext(DbContextOptions options) : base(options) { }
    }
}
