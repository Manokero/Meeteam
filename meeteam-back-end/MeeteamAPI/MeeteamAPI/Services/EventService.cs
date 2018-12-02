using System;
using System.Collections.Generic;
using System.Linq;
using MeeteamAPI.Context;
using MeeteamAPI.Models;

namespace MeeteamAPI.Services
{
    public static class EventService
    {
        public static Event Create(Event localEvent)
        {
            MeeteamDatabase database = new MeeteamDatabase();
            localEvent.Organizer = database.Users.Find(localEvent.Organizer.ID);
            database.Add(localEvent);
            database.SaveChanges();
            return localEvent;
        }

        public static List<Event> All()
        {
            MeeteamDatabase database = new MeeteamDatabase();

            return database.Events.ToList();
        }
        public static Event Update(Event localEvent)
        {
            MeeteamDatabase database = new MeeteamDatabase();
            database.Update(localEvent);
            database.SaveChanges();
            return localEvent;
        }

        public static Event Delete(Event localEvent)
        {
            MeeteamDatabase database = new MeeteamDatabase();
            database.Remove(localEvent);
            database.SaveChanges();
            return localEvent;
        }

        public static Event Get(int ID)
        {
            MeeteamDatabase database = new MeeteamDatabase();
            return database.Events.Find(ID);
        }

        public static void Validate(Event localEvent)
        {
            if (localEvent == null)
                throw new Exception("El evento no existe.");
            if (localEvent.Title == null)
                throw new Exception("El titulo del evento debe estar definido");
            if (localEvent.Title.Trim() == "")
                throw new Exception("El titulo del evento no puede estar vacio.");
            if (localEvent.Description == null)
                throw new Exception("Debe agregar una descripcion al evento.");
            if (localEvent.Description.Trim() == "")
                throw new Exception("El evento no puede estar vacio.");
            if (localEvent.Date == null)
                throw new Exception("La fecha del evento debe estar definido.");
            if (localEvent.Organizer == null)
                throw new Exception("El organizador del evento debe estar definido.");

        }
        
    }
}
