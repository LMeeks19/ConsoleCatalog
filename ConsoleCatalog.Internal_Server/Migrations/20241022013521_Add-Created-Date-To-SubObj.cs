﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ConsoleCatalog.Internal_Server.Migrations
{
    /// <inheritdoc />
    public partial class AddCreatedDateToSubObj : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedDate",
                table: "SubObjectives",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedDate",
                table: "SubObjectives");
        }
    }
}
