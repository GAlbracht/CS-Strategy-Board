class User {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.is_admin = false;
    }

}

module.exports = User;