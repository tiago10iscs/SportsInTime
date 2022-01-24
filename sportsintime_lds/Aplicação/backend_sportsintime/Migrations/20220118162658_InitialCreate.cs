using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend_sportsintime.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "LiveBet",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Match_Id = table.Column<long>(type: "bigint", nullable: false),
                    UserID = table.Column<long>(type: "bigint", nullable: false),
                    opcaoVitoria = table.Column<int>(type: "int", nullable: false),
                    opcaoGolos = table.Column<int>(type: "int", nullable: false),
                    opcaoBTTS = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LiveBet", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Reports",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    idUser = table.Column<long>(type: "bigint", nullable: false),
                    mensagem = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    banOption = table.Column<bool>(type: "bit", nullable: true),
                    isVerified = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reports", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Resposta",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdSondagem = table.Column<long>(type: "bigint", nullable: false),
                    IdUser = table.Column<long>(type: "bigint", nullable: false),
                    resposta = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Resposta", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Sondagem",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdJogo = table.Column<long>(type: "bigint", nullable: false),
                    Opcao = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sondagem", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Rank = table.Column<int>(type: "int", nullable: true),
                    IsBanned = table.Column<bool>(type: "bit", nullable: true),
                    PasswordHash = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    PasswordSalt = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    isAdmin = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LiveBet");

            migrationBuilder.DropTable(
                name: "Reports");

            migrationBuilder.DropTable(
                name: "Resposta");

            migrationBuilder.DropTable(
                name: "Sondagem");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
