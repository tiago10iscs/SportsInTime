using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;
using backend_sportsintime.Models;
using backend_sportsintime.Models.LiveBets;

namespace backend_sportsintime.Models
{
    public class bdContext : DbContext
    {
        public bdContext(DbContextOptions<bdContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; } = null!;

        public DbSet<Report> Reports { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Password=sa123;Persist Security Info=False;User ID=sa;Initial Catalog=Sports;Data Source=LAPTOP-3UESU4T5\\SQLEXPRESS1");
        }

        public DbSet<Sondagem> Sondagem { get; set; } = null;

        public DbSet<Resposta> Resposta { get; set; } = null;

        public DbSet<LiveBet> LiveBet { get; set; }
    }
}
