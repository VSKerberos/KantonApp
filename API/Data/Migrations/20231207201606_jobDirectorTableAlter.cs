using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class jobDirectorTableAlter : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // migrationBuilder.DropIndex(
            //     name: "IX_Directors_JobId",
            //     table: "Directors");

            migrationBuilder.CreateIndex(
                name: "IX_Directors_JobId",
                table: "Directors",
                column: "JobId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // migrationBuilder.DropIndex(
            //     name: "IX_Directors_JobId",
            //     table: "Directors");

            migrationBuilder.CreateIndex(
                name: "IX_Directors_JobId",
                table: "Directors",
                column: "JobId",
                unique: true);
        }
    }
}
