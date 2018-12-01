using System;
using MeeteamAPI.Context;
using MeeteamAPI.Models;

namespace MeeteamAPI.Services
{
    public static class UserService
    {
        public static User Create(User user)
        {
            MeeteamDatabase database = new MeeteamDatabase();
            database.Add(user);
            database.SaveChanges();
            return user;
        }

        public static User Update(User user)
        {
            MeeteamDatabase database = new MeeteamDatabase();
            database.Update(user);
            database.SaveChanges();
            return user;
        }

        public static User Delete(User user)
        {
            MeeteamDatabase database = new MeeteamDatabase();
            database.Remove(user);
            database.SaveChanges();
            return user;
        }

        public static User Get(int ID)
        {
            MeeteamDatabase database = new MeeteamDatabase();
            return database.Users.Find(ID);
        }

    }
}
