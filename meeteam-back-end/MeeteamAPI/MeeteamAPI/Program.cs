using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using MeeteamAPI.Context;
using MeeteamAPI.Models;
using MeeteamAPI.Services;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace MeeteamAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            MeeteamDatabase database = new MeeteamDatabase();
            database.Database.EnsureDeleted();
            database.Database.EnsureCreated();


            database.Add(new UserType
            {
                Name = "Colaborador"
            });

            database.Add(new UserType
            {
                Name = "Organizador"
            });
            database.SaveChanges();


            database.Add(new User
            {
                Name = "Pablo",
                Password = CypherService.Hash("1234678"),
                Contact = new Contact
                {
                    FirstName = "Pablo",
                    LastName = "Ferreira"
                },
                Status = 1,
                UserType = database.UserTypes.First()
            });
            database.SaveChanges();


            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();
    }
}
