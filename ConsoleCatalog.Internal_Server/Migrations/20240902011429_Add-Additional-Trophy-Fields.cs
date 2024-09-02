using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ConsoleCatalog.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddAdditionalTrophyFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Progress",
                table: "Trophies",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProgressDateTime",
                table: "Trophies",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ProgressRate",
                table: "Trophies",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TrophyProgressTargetValue",
                table: "Trophies",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Progress",
                table: "Trophies");

            migrationBuilder.DropColumn(
                name: "ProgressDateTime",
                table: "Trophies");

            migrationBuilder.DropColumn(
                name: "ProgressRate",
                table: "Trophies");

            migrationBuilder.DropColumn(
                name: "TrophyProgressTargetValue",
                table: "Trophies");
        }
    }
}
