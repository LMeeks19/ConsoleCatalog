﻿// <auto-generated />
using System;
using ConsoleCatalog.Internal_Server.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace ConsoleCatalog.Internal_Server.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    [Migration("20240908184739_Create-PSN-Tables")]
    partial class CreatePSNTables
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.7")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("ConsoleCatalog.Internal_Server.Models.Playstation.AvatarUrl", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("PSNProfileId")
                        .HasColumnType("int");

                    b.Property<string>("Size")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("avatarUrl")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("PSNProfileId");

                    b.ToTable("AvatarUrls");
                });

            modelBuilder.Entity("ConsoleCatalog.Internal_Server.Models.Playstation.DefinedTrophyTypes", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("Bronze")
                        .HasColumnType("int");

                    b.Property<int>("Gold")
                        .HasColumnType("int");

                    b.Property<int>("Platinum")
                        .HasColumnType("int");

                    b.Property<int>("Silver")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("DefinedTrophyTypes");
                });

            modelBuilder.Entity("ConsoleCatalog.Internal_Server.Models.Playstation.EarnedTitleTrophy", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<bool>("Earned")
                        .HasColumnType("bit");

                    b.Property<string>("EarnedDateTime")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("PSNProfileId")
                        .HasColumnType("int");

                    b.Property<string>("Progress")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("ProgressRate")
                        .HasColumnType("int");

                    b.Property<string>("ProgressedDateTime")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TitleId")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TrophyEarnedRate")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TrophyGroupId")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("TrophyId")
                        .HasColumnType("int");

                    b.Property<int>("TrophyRare")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("EarnedTitleTrophies");
                });

            modelBuilder.Entity("ConsoleCatalog.Internal_Server.Models.Playstation.EarnedTrophyTypes", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("Bronze")
                        .HasColumnType("int");

                    b.Property<int>("Gold")
                        .HasColumnType("int");

                    b.Property<int>("Platinum")
                        .HasColumnType("int");

                    b.Property<int>("Silver")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("EarnedTrophyTypes");
                });

            modelBuilder.Entity("ConsoleCatalog.Internal_Server.Models.Playstation.PSNProfile", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("AboutMe")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("AccountId")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("Blocking")
                        .HasColumnType("bit");

                    b.Property<bool>("Following")
                        .HasColumnType("bit");

                    b.Property<string>("FriendRelation")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsOfficiallyVerified")
                        .HasColumnType("bit");

                    b.Property<string>("LanguagesUsed")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NpId")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("OnlineId")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("PersonalDetailId")
                        .HasColumnType("int");

                    b.Property<string>("PersonalDetailSharing")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PersonalDetailSharingRequestMessageFlag")
                        .HasColumnType("bit");

                    b.Property<int>("Plus")
                        .HasColumnType("int");

                    b.Property<string>("PrimaryOnlineStatus")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("RequestMessageFlag")
                        .HasColumnType("bit");

                    b.Property<int>("TrophySummaryId")
                        .HasColumnType("int");

                    b.Property<int>("TrophyTitlesId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("PersonalDetailId");

                    b.HasIndex("TrophySummaryId");

                    b.HasIndex("TrophyTitlesId");

                    b.ToTable("PSNProfiles");
                });

            modelBuilder.Entity("ConsoleCatalog.Internal_Server.Models.Playstation.PersonalDetail", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Firstname")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Lastname")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("PersonalDetails");
                });

            modelBuilder.Entity("ConsoleCatalog.Internal_Server.Models.Playstation.TitleTrophy", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("TitleId")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TrophyDetail")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TrophyGroupId")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("TrophyHidden")
                        .HasColumnType("bit");

                    b.Property<string>("TrophyIconUrl")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("TrophyId")
                        .HasColumnType("int");

                    b.Property<string>("TrophyName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TrophyProgressTargetValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TrophyType")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("TitleTrophies");
                });

            modelBuilder.Entity("ConsoleCatalog.Internal_Server.Models.Playstation.TrophySummary", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("EarnedTrophiesId")
                        .HasColumnType("int");

                    b.Property<int>("Level")
                        .HasColumnType("int");

                    b.Property<int>("Progress")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("EarnedTrophiesId");

                    b.ToTable("TrophySummaries");
                });

            modelBuilder.Entity("ConsoleCatalog.Internal_Server.Models.Playstation.TrophyTitle", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("DefinedTrophiesId")
                        .HasColumnType("int");

                    b.Property<int>("EarnedTrophiesId")
                        .HasColumnType("int");

                    b.Property<bool>("HasTrophyGroups")
                        .HasColumnType("bit");

                    b.Property<bool>("HiddenFlag")
                        .HasColumnType("bit");

                    b.Property<DateTime>("LastUpdatedDateTime")
                        .HasColumnType("datetime2");

                    b.Property<string>("NpCommunicationId")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NpServiceName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Progress")
                        .HasColumnType("int");

                    b.Property<int>("TrophyGroupCount")
                        .HasColumnType("int");

                    b.Property<string>("TrophySetVersion")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TrophyTitleDetail")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TrophyTitleIconUrl")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TrophyTitleName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("TrophyTitleObjectId")
                        .HasColumnType("int");

                    b.Property<string>("TrophyTitlePlatform")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("DefinedTrophiesId");

                    b.HasIndex("EarnedTrophiesId");

                    b.HasIndex("TrophyTitleObjectId");

                    b.ToTable("TrophyTitles");
                });

            modelBuilder.Entity("ConsoleCatalog.Internal_Server.Models.Playstation.TrophyTitleObject", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("TotalItemCount")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("TrophyTitleObjects");
                });

            modelBuilder.Entity("ConsoleCatalog.Internal_Server.Models.SubObjective", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Details")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsComplete")
                        .HasColumnType("bit");

                    b.Property<string>("TitleId")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("TrophyId")
                        .HasColumnType("int");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.ToTable("SubObjectives");
                });

            modelBuilder.Entity("ConsoleCatalog.Internal_Server.Models.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PlaystationGamertag")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("XboxGamertag")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("ConsoleCatalog.Internal_Server.Models.Playstation.AvatarUrl", b =>
                {
                    b.HasOne("ConsoleCatalog.Internal_Server.Models.Playstation.PSNProfile", null)
                        .WithMany("AvatarUrls")
                        .HasForeignKey("PSNProfileId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("ConsoleCatalog.Internal_Server.Models.Playstation.PSNProfile", b =>
                {
                    b.HasOne("ConsoleCatalog.Internal_Server.Models.Playstation.PersonalDetail", "PersonalDetail")
                        .WithMany()
                        .HasForeignKey("PersonalDetailId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ConsoleCatalog.Internal_Server.Models.Playstation.TrophySummary", "TrophySummary")
                        .WithMany()
                        .HasForeignKey("TrophySummaryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ConsoleCatalog.Internal_Server.Models.Playstation.TrophyTitleObject", "TrophyTitles")
                        .WithMany()
                        .HasForeignKey("TrophyTitlesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("PersonalDetail");

                    b.Navigation("TrophySummary");

                    b.Navigation("TrophyTitles");
                });

            modelBuilder.Entity("ConsoleCatalog.Internal_Server.Models.Playstation.TrophySummary", b =>
                {
                    b.HasOne("ConsoleCatalog.Internal_Server.Models.Playstation.EarnedTrophyTypes", "EarnedTrophies")
                        .WithMany()
                        .HasForeignKey("EarnedTrophiesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("EarnedTrophies");
                });

            modelBuilder.Entity("ConsoleCatalog.Internal_Server.Models.Playstation.TrophyTitle", b =>
                {
                    b.HasOne("ConsoleCatalog.Internal_Server.Models.Playstation.DefinedTrophyTypes", "DefinedTrophies")
                        .WithMany()
                        .HasForeignKey("DefinedTrophiesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ConsoleCatalog.Internal_Server.Models.Playstation.EarnedTrophyTypes", "EarnedTrophies")
                        .WithMany()
                        .HasForeignKey("EarnedTrophiesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ConsoleCatalog.Internal_Server.Models.Playstation.TrophyTitleObject", null)
                        .WithMany("TrophyTitles")
                        .HasForeignKey("TrophyTitleObjectId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("DefinedTrophies");

                    b.Navigation("EarnedTrophies");
                });

            modelBuilder.Entity("ConsoleCatalog.Internal_Server.Models.Playstation.PSNProfile", b =>
                {
                    b.Navigation("AvatarUrls");
                });

            modelBuilder.Entity("ConsoleCatalog.Internal_Server.Models.Playstation.TrophyTitleObject", b =>
                {
                    b.Navigation("TrophyTitles");
                });
#pragma warning restore 612, 618
        }
    }
}
