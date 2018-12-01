using System;
using System.Linq;
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

        public static void Validate(User user)
        {
            if (user == null)
                throw new Exception("El usuario no existe.");
            if (user.Name == null)
                throw new Exception("El nombre de usuario debe estar definido");
            if (user.Name.Trim() == "")
                throw new Exception("El nombre de usuario no puede estar vacio.");
            if (user.Password == null)
                throw new Exception("La clave debe estar definida.");
            if (user.Password.Trim() == "")
                throw new Exception("La clave no puede estar vacia.");
            if (user.Password.Trim().Length < 6)
                throw new Exception("La clave debe tener almenos 6 caracteres.");

        }

        public static User Get(string Name)
        {
            MeeteamDatabase database = new MeeteamDatabase();
            return database.Users.Where(x => x.Name == Name).FirstOrDefault();
        }
    }
}
