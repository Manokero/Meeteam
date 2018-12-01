var Templates = {
    "User" : (User => {
        return `
            <div>
                ${User.Name}
            </div>
        `
    })
}

$("Container").append(Templates.User(UsuarioBonito))