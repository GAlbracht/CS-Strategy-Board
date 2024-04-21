class LoginController {
    constructor() {

    }


    async login(req, res) {
        try {

            const { username, password } = req.body;



        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'error during login' });
        }
    }
}

module.exports = LoginController;