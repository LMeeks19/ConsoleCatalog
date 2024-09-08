using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ConsoleCatalog.Server.Migrations
{
    /// <inheritdoc />
    public partial class CreateTrophyGroupTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DefinedTrophyGroupObjects",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DefinedTrophiesId = table.Column<int>(type: "int", nullable: false),
                    NpCommunicationId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TrophyTitleIconUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TrophyTitleName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TrophyTitlePlatform = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DefinedTrophyGroupObjects", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DefinedTrophyGroupObjects_DefinedTrophyTypes_DefinedTrophiesId",
                        column: x => x.DefinedTrophiesId,
                        principalTable: "DefinedTrophyTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EarnedTrophyGroupObjects",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PSNProfileId = table.Column<int>(type: "int", nullable: false),
                    EarnedTrophiesId = table.Column<int>(type: "int", nullable: false),
                    NpCommunicationId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastUpdatedDateTime = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Progress = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EarnedTrophyGroupObjects", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EarnedTrophyGroupObjects_EarnedTrophyTypes_EarnedTrophiesId",
                        column: x => x.EarnedTrophiesId,
                        principalTable: "EarnedTrophyTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DefinedTrophyGroups",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TrophyGroupObjectId = table.Column<int>(type: "int", nullable: false),
                    DefinedTrophiesId = table.Column<int>(type: "int", nullable: false),
                    TrophyGroupIconUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TrophyGroupId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TrophyGroupName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DefinedTrophyGroupObjectId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DefinedTrophyGroups", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DefinedTrophyGroups_DefinedTrophyGroupObjects_DefinedTrophyGroupObjectId",
                        column: x => x.DefinedTrophyGroupObjectId,
                        principalTable: "DefinedTrophyGroupObjects",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_DefinedTrophyGroups_DefinedTrophyTypes_DefinedTrophiesId",
                        column: x => x.DefinedTrophiesId,
                        principalTable: "DefinedTrophyTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EarnedTrophyGroups",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TrophyGroupObjectId = table.Column<int>(type: "int", nullable: false),
                    EarnedTrophiesId = table.Column<int>(type: "int", nullable: false),
                    LastUpdatedDateTime = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Progress = table.Column<double>(type: "float", nullable: false),
                    TrophyGroupId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EarnedTrophyGroupObjectId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EarnedTrophyGroups", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EarnedTrophyGroups_EarnedTrophyGroupObjects_EarnedTrophyGroupObjectId",
                        column: x => x.EarnedTrophyGroupObjectId,
                        principalTable: "EarnedTrophyGroupObjects",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EarnedTrophyGroups_EarnedTrophyTypes_EarnedTrophiesId",
                        column: x => x.EarnedTrophiesId,
                        principalTable: "EarnedTrophyTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DefinedTrophyGroupObjects_DefinedTrophiesId",
                table: "DefinedTrophyGroupObjects",
                column: "DefinedTrophiesId");

            migrationBuilder.CreateIndex(
                name: "IX_DefinedTrophyGroups_DefinedTrophiesId",
                table: "DefinedTrophyGroups",
                column: "DefinedTrophiesId");

            migrationBuilder.CreateIndex(
                name: "IX_DefinedTrophyGroups_DefinedTrophyGroupObjectId",
                table: "DefinedTrophyGroups",
                column: "DefinedTrophyGroupObjectId");

            migrationBuilder.CreateIndex(
                name: "IX_EarnedTrophyGroupObjects_EarnedTrophiesId",
                table: "EarnedTrophyGroupObjects",
                column: "EarnedTrophiesId");

            migrationBuilder.CreateIndex(
                name: "IX_EarnedTrophyGroups_EarnedTrophiesId",
                table: "EarnedTrophyGroups",
                column: "EarnedTrophiesId");

            migrationBuilder.CreateIndex(
                name: "IX_EarnedTrophyGroups_EarnedTrophyGroupObjectId",
                table: "EarnedTrophyGroups",
                column: "EarnedTrophyGroupObjectId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DefinedTrophyGroups");

            migrationBuilder.DropTable(
                name: "EarnedTrophyGroups");

            migrationBuilder.DropTable(
                name: "DefinedTrophyGroupObjects");

            migrationBuilder.DropTable(
                name: "EarnedTrophyGroupObjects");
        }
    }
}
