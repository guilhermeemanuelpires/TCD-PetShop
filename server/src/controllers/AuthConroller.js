const { User } = require('../models');
const bcrypt = require('bcryptjs');

module.exports = {

    async register(req, res) {
        const { user } = req.body;
        try {

            if (!user) {
                throw "Json invalido";
            }

            // criptografar senha antes mesmo de inserir ao banco
            const salt = bcrypt.genSaltSync(10);
            user.password = bcrypt.hashSync(user.password, salt);

            let createdUser = await User.create(user);

            createdUser = createdUser.get({ plain: true });

            delete createdUser.password;
            
            return res.status(200).send({ user: createdUser });
        } catch (e) {
            console.log(e);
            return res.status(500).send('Não foi possível criar o usuário');
        }
    },

    async login(req, res) {
        const { username, password } = req.body;
        try {

            if (!username || !password) {
                return res.send({ status: 400, errorMsg: 'Usuário e/ou senha não informado(a)' }); // Bad Request
            }

            /* busca u súario */
            let user = await User.findOne({
                where: { username }
            });

            if (user) {

                if (!bcrypt.compareSync(password, user.password)) {
                    return res.send({ status: 401, errorMsg: 'Senha inválida!' });
                } else {
                    return res.status(200).send({ status: 200, sucessMsg: 'Login realizado com sucesso!' });
                }

            } else {
                return res.send({ status: 401, errorMsg: 'Usuário inválido!' });
            }

        } catch (error) {
            return res.send({ errorMsg: error.message });
        }
    }
}