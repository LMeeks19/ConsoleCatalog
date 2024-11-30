using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ConsoleCatalog.Internal_Server.Migrations
{
    /// <inheritdoc />
    public partial class CreateXBXProfileTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "XBXAchievements",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CurrentAchievements = table.Column<int>(type: "int", nullable: false),
                    TotalAchievements = table.Column<int>(type: "int", nullable: false),
                    CurrentGamerscore = table.Column<int>(type: "int", nullable: false),
                    TotalGamerscore = table.Column<int>(type: "int", nullable: false),
                    ProgressPercentage = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_XBXAchievements", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "XBXDetails",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AccountTier = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Bio = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsVerified = table.Column<bool>(type: "bit", nullable: false),
                    FollowerCount = table.Column<int>(type: "int", nullable: false),
                    FollowingCount = table.Column<int>(type: "int", nullable: false),
                    HasGamePass = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_XBXDetails", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "XBXTitleHistories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LastTimePlayed = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_XBXTitleHistories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "XBXProfiles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Xuid = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsIdentiryShared = table.Column<bool>(type: "bit", nullable: false),
                    RealName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DisplayPicRaw = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Gamertag = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    GamerScore = table.Column<int>(type: "int", nullable: false),
                    DetailId = table.Column<int>(type: "int", nullable: false),
                    TitlesCount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_XBXProfiles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_XBXProfiles_XBXDetails_DetailId",
                        column: x => x.DetailId,
                        principalTable: "XBXDetails",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "XBXTitles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    XBXProfileId = table.Column<int>(type: "int", nullable: false),
                    TitleId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Devices = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DisplayImage = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsBundle = table.Column<bool>(type: "bit", nullable: false),
                    TitleHistoryId = table.Column<int>(type: "int", nullable: false),
                    AchievementId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_XBXTitles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_XBXTitles_XBXAchievements_AchievementId",
                        column: x => x.AchievementId,
                        principalTable: "XBXAchievements",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_XBXTitles_XBXProfiles_XBXProfileId",
                        column: x => x.XBXProfileId,
                        principalTable: "XBXProfiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_XBXTitles_XBXTitleHistories_TitleHistoryId",
                        column: x => x.TitleHistoryId,
                        principalTable: "XBXTitleHistories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_XBXProfiles_DetailId",
                table: "XBXProfiles",
                column: "DetailId");

            migrationBuilder.CreateIndex(
                name: "IX_XBXTitles_AchievementId",
                table: "XBXTitles",
                column: "AchievementId");

            migrationBuilder.CreateIndex(
                name: "IX_XBXTitles_TitleHistoryId",
                table: "XBXTitles",
                column: "TitleHistoryId");

            migrationBuilder.CreateIndex(
                name: "IX_XBXTitles_XBXProfileId",
                table: "XBXTitles",
                column: "XBXProfileId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "XBXTitles");

            migrationBuilder.DropTable(
                name: "XBXAchievements");

            migrationBuilder.DropTable(
                name: "XBXProfiles");

            migrationBuilder.DropTable(
                name: "XBXTitleHistories");

            migrationBuilder.DropTable(
                name: "XBXDetails");
        }
    }
}
