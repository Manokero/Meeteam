using System;
using MeeteamAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace MeeteamAPI.Context
{
    public class MeeteamDatabase:DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Contact> Contacts { get; set; }
        public DbSet<Email> Emails { get; set; }
        public DbSet<Phone> Phones { get; set; }
        public DbSet<UserType> UserTypes { get; set; }
        public DbSet<Location> Locations { get; set; }
        public DbSet <Event> Eventos { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // Specify the path of the database here
            optionsBuilder.UseSqlite("Filename=Database.sqlite");
        }
    }
}
