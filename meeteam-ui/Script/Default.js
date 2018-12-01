var Session = {
    get User() {
        try {
            return JSON.parse(localStorage.User);
        } catch(e) {
            return {
                "Name" : "Guest",
                "Contact" : {
                    "FirstName" : "Invitado",
                    "LastName" : "Especial"
                },
                "UserType" : {
                    "ID" : "1",
                    "Name" : "Colaborador"
                }
            };
        }
    }  
}

