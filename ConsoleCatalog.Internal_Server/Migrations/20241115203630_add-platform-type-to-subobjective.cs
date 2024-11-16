using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ConsoleCatalog.Internal_Server.Migrations
{
    /// <inheritdoc />
    public partial class addplatformtypetosubobjective : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_XBXTitles_XBXAchievements_AchievementId",
                table: "XBXTitles");

            migrationBuilder.RenameColumn(
                name: "AchievementId",
                table: "XBXTitles",
                newName: "AchievementSummaryId");

            migrationBuilder.RenameIndex(
                name: "IX_XBXTitles_AchievementId",
                table: "XBXTitles",
                newName: "IX_XBXTitles_AchievementSummaryId");

            migrationBuilder.AlterColumn<int>(
                name: "TrophyId",
                table: "SubObjectives",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "AchievementId",
                table: "SubObjectives",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Platform",
                table: "SubObjectives",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_XBXTitles_XBXAchievements_AchievementSummaryId",
                table: "XBXTitles",
                column: "AchievementSummaryId",
                principalTable: "XBXAchievements",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_XBXTitles_XBXAchievements_AchievementSummaryId",
                table: "XBXTitles");

            migrationBuilder.DropColumn(
                name: "AchievementId",
                table: "SubObjectives");

            migrationBuilder.DropColumn(
                name: "Platform",
                table: "SubObjectives");

            migrationBuilder.RenameColumn(
                name: "AchievementSummaryId",
                table: "XBXTitles",
                newName: "AchievementId");

            migrationBuilder.RenameIndex(
                name: "IX_XBXTitles_AchievementSummaryId",
                table: "XBXTitles",
                newName: "IX_XBXTitles_AchievementId");

            migrationBuilder.AlterColumn<int>(
                name: "TrophyId",
                table: "SubObjectives",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_XBXTitles_XBXAchievements_AchievementId",
                table: "XBXTitles",
                column: "AchievementId",
                principalTable: "XBXAchievements",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
