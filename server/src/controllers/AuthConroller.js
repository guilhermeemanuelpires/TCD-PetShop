const { User } = require('../models');

module.exports = {    

    async register(req, res) {
        const { user } = req.body;
        try {
            console.log(user);
            let createdUser = await User.create(user);
            console.log(createdUser);
            createdUser = createdUser.get({ plain: true });
            delete createdUser.password;
            return res.status(200).send({ user: createdUser });
        } catch (e) {
            console.log(e);
            return res.status(400).send('Não foi possível criar o usuário');
        }
    },

    async login(req, res) {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).send('Usuário e/ou senha não informado(a)'); // Bad Request
        }

        /* Usúario */
        let user = await User.findOne({
            where: { username }
        });

    }

}