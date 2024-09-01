using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ConsoleCatalog.Server.Migrations
{
    /// <inheritdoc />
    public partial class CreatePSNTables : Migration
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
                name: "TrophiesObjects",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    HasTrophyGroups = table.Column<bool>(type: "bit", nullable: false),
                    TotalItemCount = table.Column<int>(type: "int", nullable: false),
                    TrophySetVersion = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastUpdatedDateTime = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TrophiesObjects", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TrophyTitleObjects",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NextOffset = table.Column<int>(type: "int", nullable: false),
                    PreviousOffset = table.Column<int>(type: "int", nullable: false),
                    TotalItemCount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TrophyTitleObjects", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TrophyTypes",
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
                    table.PrimaryKey("PK_TrophyTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Trophies",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TrophiesObjectId = table.Column<int>(type: "int", nullable: false),
                    TrophyDetail = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TrophyGroupId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TrophyHidden = table.Column<bool>(type: "bit", nullable: false),
                    TrophyIconUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TrophyId = table.Column<int>(type: "int", nullable: false),
                    TrophyName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TrophyType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Earned = table.Column<bool>(type: "bit", nullable: false),
                    EarnedDateTime = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TrophyEarnedRate = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TrophyRare = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Trophies", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Trophies_TrophiesObjects_TrophiesObjectId",
                        column: x => x.TrophiesObjectId,
                        principalTable: "TrophiesObjects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
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
                        name: "FK_TrophySummaries_TrophyTypes_EarnedTrophiesId",
                        column: x => x.EarnedTrophiesId,
                        principalTable: "TrophyTypes",
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
                    TrophyTitleDetail = table.Column<string>(type: "nvarchar(max)", nullable: false),
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
                        name: "FK_TrophyTitles_TrophyTitleObjects_TrophyTitleObjectId",
                        column: x => x.TrophyTitleObjectId,
                        principalTable: "TrophyTitleObjects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TrophyTitles_TrophyTypes_DefinedTrophiesId",
                        column: x => x.DefinedTrophiesId,
                        principalTable: "TrophyTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TrophyTitles_TrophyTypes_EarnedTrophiesId",
                        column: x => x.EarnedTrophiesId,
                        principalTable: "TrophyTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
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
                    TrophyTitleObjectId = table.Column<int>(type: "int", nullable: false)
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
                        name: "FK_PSNProfiles_TrophyTitleObjects_TrophyTitleObjectId",
                        column: x => x.TrophyTitleObjectId,
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
                    PSNProfileID = table.Column<int>(type: "int", nullable: false),
                    Url = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Size = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AvatarUrls", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AvatarUrls_PSNProfiles_PSNProfileID",
                        column: x => x.PSNProfileID,
                        principalTable: "PSNProfiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Presences",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PSNProfileId = table.Column<int>(type: "int", nullable: false),
                    HasBroadcastData = table.Column<bool>(type: "bit", nullable: false),
                    LastOnlineDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    OnlineStatus = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Presences", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Presences_PSNProfiles_PSNProfileId",
                        column: x => x.PSNProfileId,
                        principalTable: "PSNProfiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AvatarUrls_PSNProfileID",
                table: "AvatarUrls",
                column: "PSNProfileID");

            migrationBuilder.CreateIndex(
                name: "IX_Presences_PSNProfileId",
                table: "Presences",
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
                name: "IX_PSNProfiles_TrophyTitleObjectId",
                table: "PSNProfiles",
                column: "TrophyTitleObjectId");

            migrationBuilder.CreateIndex(
                name: "IX_Trophies_TrophiesObjectId",
                table: "Trophies",
                column: "TrophiesObjectId");

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
                name: "Presences");

            migrationBuilder.DropTable(
                name: "Trophies");

            migrationBuilder.DropTable(
                name: "TrophyTitles");

            migrationBuilder.DropTable(
                name: "PSNProfiles");

            migrationBuilder.DropTable(
                name: "TrophiesObjects");

            migrationBuilder.DropTable(
                name: "ConsoleAvailabilities");

            migrationBuilder.DropTable(
                name: "PersonalDetails");

            migrationBuilder.DropTable(
                name: "TrophySummaries");

            migrationBuilder.DropTable(
                name: "TrophyTitleObjects");

            migrationBuilder.DropTable(
                name: "TrophyTypes");
        }
    }
}
