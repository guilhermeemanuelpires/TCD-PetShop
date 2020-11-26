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

            return res.send({ status: 200, sucessMsg: 'Usuário Cadastrado com sucesso!', user: createdUser });
        } catch (e) {
            console.log(e);
            return res.send({ status: 500, errorMsg: 'Não foi possível criar o usuário' });
        }
    },
    async update(req, res) {
        const { user } = req.body;
        try {
            if (!user) {
                throw "Json invalido";
            }
            // Busca User por Id
            const UserExist = await User.findByPk(user.id);

            if (!UserExist) {
                return res.send({ status: 404, errorMsg: 'Nenhum usuário encontrado!' });
            } else {
                try {
                    const novo = await User.update(user, { where: { id: user.id } });

                    let novoRetorno = await User.findByPk(user.id);
                    //remove a senha!
                    novoRetorno = novoRetorno.get({ plain: true });
                    delete novoRetorno.password;

                    return res.send({ status: 200, sucessMsg: 'Usuário atualizado com sucesso!', user: novoRetorno });
                } catch (e) {
                    return res.send({ status: 500, errorMsg: 'Erro ao atualizar usuario :  ' + e.message });
                }
            }

        } catch (e) {
            return res.send({ status: 500, errorMsg: error.message });
        }
    },
    async login(req, res) {
        const { username, password } = req.body;
        try {

            if (!username || !password) {
                return res.send({ status: 400, errorMsg: 'Uário e/ou senha não informado(a)' }); // Bad Request
            }

            /* busca u súario */
            let user = await User.findOne({
                where: { username }
            });

            if (user) {

                if (!bcrypt.compareSync(password, user.password)) {
                    return res.send({ status: 401, errorMsg: 'Senha inválida!' });
                } else {
                    user = user.get({ plain: true });
                    delete user.password;
                    return res.status(200).send({ status: 200, sucessMsg: 'Login realizado com sucesso!', user: user });
                }

            } else {
                return res.send({ status: 401, errorMsg: 'Usuário inválido!' });
            }

        } catch (error) {
            return res.send({ errorMsg: error.message });
        }
    }
}