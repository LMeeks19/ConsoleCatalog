using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ConsoleCatalog.Internal_Server.Migrations
{
    /// <inheritdoc />
    public partial class AddParentIdToSubObjective : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "SubObjectiveId",
                table: "SubObjectives",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_SubObjectives_SubObjectiveId",
                table: "SubObjectives",
                column: "SubObjectiveId");

            migrationBuilder.AddForeignKey(
                name: "FK_SubObjectives_SubObjectives_SubObjectiveId",
                table: "SubObjectives",
                column: "SubObjectiveId",
                principalTable: "SubObjectives",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SubObjectives_SubObjectives_SubObjectiveId",
                table: "SubObjectives");

            migrationBuilder.DropIndex(
                name: "IX_SubObjectives_SubObjectiveId",
                table: "SubObjectives");

            migrationBuilder.DropColumn(
                name: "SubObjectiveId",
                table: "SubObjectives");
        }
    }
}
