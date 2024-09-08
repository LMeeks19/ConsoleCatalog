using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ConsoleCatalog.Server.Migrations
{
    /// <inheritdoc />
    public partial class CreatePSNProfileTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ConsoleAvailabilities",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AvailabilityStatus = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConsoleAvailabilities", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DefinedTrophyTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Platinum = table.Column<int>(type: "int", nullable: false),
                    Gold = table.Column<int>(type: "int", nullable: false),
                    Silver = table.Column<int>(type: "int", nullable: false),
                    Bronze = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DefinedTrophyTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EarnedTitleTrophies",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PSNProfileId = table.Column<int>(type: "int", nullable: false),
                    TitleId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TrophyId = table.Column<int>(type: "int", nullable: false),
                    Earned = table.Column<bool>(type: "bit", nullable: false),
                    EarnedDateTime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TrophyEarnedRate = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TrophyRare = table.Column<int>(type: "int", nullable: false),
                    Progress = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ProgressRate = table.Column<int>(type: "int", nullable: true),
                    ProgressedDateTime = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EarnedTitleTrophies", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EarnedTrophyTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Platinum = table.Column<int>(type: "int", nullable: false),
                    Gold = table.Column<int>(type: "int", nullable: false),
                    Silver = table.Column<int>(type: "int", nullable: false),
                    Bronze = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EarnedTrophyTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PersonalDetails",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Firstname = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Lastname = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PersonalDetails", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TitleTrophies",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TitleId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TrophyId = table.Column<int>(type: "int", nullable: false),
                    TrophyHidden = table.Column<bool>(type: "bit", nullable: false),
                    TrophyType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TrophyName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TrophyDetail = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TrophyIconUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TrophyGroupId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TrophyProgressTargetValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TitleTrophies", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TrophyTitleObjects",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TotalItemCount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TrophyTitleObjects", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TrophySummaries",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Level = table.Column<int>(type: "int", nullable: false),
                    Progress = table.Column<int>(type: "int", nullable: false),
                    EarnedTrophiesId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TrophySummaries", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TrophySummaries_EarnedTrophyTypes_EarnedTrophiesId",
                        column: x => x.EarnedTrophiesId,
                        principalTable: "EarnedTrophyTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TrophyTitles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TrophyTitleObjectId = table.Column<int>(type: "int", nullable: false),
                    HasTrophyGroups = table.Column<bool>(type: "bit", nullable: false),
                    HiddenFlag = table.Column<bool>(type: "bit", nullable: false),
                    LastUpdatedDateTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    NpCommunicationId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NpServiceName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Progress = table.Column<int>(type: "int", nullable: false),
                    TrophyGroupCount = table.Column<int>(type: "int", nullable: false),
                    TrophySetVersion = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TrophyTitleDetail = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TrophyTitleIconUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TrophyTitleName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TrophyTitlePlatform = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DefinedTrophiesId = table.Column<int>(type: "int", nullable: false),
                    EarnedTrophiesId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TrophyTitles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TrophyTitles_DefinedTrophyTypes_DefinedTrophiesId",
                        column: x => x.DefinedTrophiesId,
                        principalTable: "DefinedTrophyTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TrophyTitles_EarnedTrophyTypes_EarnedTrophiesId",
                        column: x => x.EarnedTrophiesId,
                        principalTable: "EarnedTrophyTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TrophyTitles_TrophyTitleObjects_TrophyTitleObjectId",
                        column: x => x.TrophyTitleObjectId,
                        principalTable: "TrophyTitleObjects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PSNProfiles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AboutMe = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AccountId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Blocking = table.Column<bool>(type: "bit", nullable: false),
                    Following = table.Column<bool>(type: "bit", nullable: false),
                    FriendRelation = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsOfficiallyVerified = table.Column<bool>(type: "bit", nullable: false),
                    LanguagesUsed = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NpId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OnlineId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PersonalDetailSharing = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PersonalDetailSharingRequestMessageFlag = table.Column<bool>(type: "bit", nullable: false),
                    Plus = table.Column<int>(type: "int", nullable: false),
                    PrimaryOnlineStatus = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RequestMessageFlag = table.Column<bool>(type: "bit", nullable: false),
                    ConsoleAvailabilityId = table.Column<int>(type: "int", nullable: false),
                    PersonalDetailId = table.Column<int>(type: "int", nullable: false),
                    TrophySummaryId = table.Column<int>(type: "int", nullable: false),
                    TrophyTitlesId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PSNProfiles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PSNProfiles_ConsoleAvailabilities_ConsoleAvailabilityId",
                        column: x => x.ConsoleAvailabilityId,
                        principalTable: "ConsoleAvailabilities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PSNProfiles_PersonalDetails_PersonalDetailId",
                        column: x => x.PersonalDetailId,
                        principalTable: "PersonalDetails",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PSNProfiles_TrophySummaries_TrophySummaryId",
                        column: x => x.TrophySummaryId,
                        principalTable: "TrophySummaries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PSNProfiles_TrophyTitleObjects_TrophyTitlesId",
                        column: x => x.TrophyTitlesId,
                        principalTable: "TrophyTitleObjects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AvatarUrls",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PSNProfileId = table.Column<int>(type: "int", nullable: false),
                    avatarUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Size = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AvatarUrls", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AvatarUrls_PSNProfiles_PSNProfileId",
                        column: x => x.PSNProfileId,
                        principalTable: "PSNProfiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AvatarUrls_PSNProfileId",
                table: "AvatarUrls",
                column: "PSNProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_PSNProfiles_ConsoleAvailabilityId",
                table: "PSNProfiles",
                column: "ConsoleAvailabilityId");

            migrationBuilder.CreateIndex(
                name: "IX_PSNProfiles_PersonalDetailId",
                table: "PSNProfiles",
                column: "PersonalDetailId");

            migrationBuilder.CreateIndex(
                name: "IX_PSNProfiles_TrophySummaryId",
                table: "PSNProfiles",
                column: "TrophySummaryId");

            migrationBuilder.CreateIndex(
                name: "IX_PSNProfiles_TrophyTitlesId",
                table: "PSNProfiles",
                column: "TrophyTitlesId");

            migrationBuilder.CreateIndex(
                name: "IX_TrophySummaries_EarnedTrophiesId",
                table: "TrophySummaries",
                column: "EarnedTrophiesId");

            migrationBuilder.CreateIndex(
                name: "IX_TrophyTitles_DefinedTrophiesId",
                table: "TrophyTitles",
                column: "DefinedTrophiesId");

            migrationBuilder.CreateIndex(
                name: "IX_TrophyTitles_EarnedTrophiesId",
                table: "TrophyTitles",
                column: "EarnedTrophiesId");

            migrationBuilder.CreateIndex(
                name: "IX_TrophyTitles_TrophyTitleObjectId",
                table: "TrophyTitles",
                column: "TrophyTitleObjectId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AvatarUrls");

            migrationBuilder.DropTable(
                name: "EarnedTitleTrophies");

            migrationBuilder.DropTable(
                name: "TitleTrophies");

            migrationBuilder.DropTable(
                name: "TrophyTitles");

            migrationBuilder.DropTable(
                name: "PSNProfiles");

            migrationBuilder.DropTable(
                name: "DefinedTrophyTypes");

            migrationBuilder.DropTable(
                name: "ConsoleAvailabilities");

            migrationBuilder.DropTable(
                name: "PersonalDetails");

            migrationBuilder.DropTable(
                name: "TrophySummaries");

            migrationBuilder.DropTable(
                name: "TrophyTitleObjects");

            migrationBuilder.DropTable(
                name: "EarnedTrophyTypes");
        }
    }
}
