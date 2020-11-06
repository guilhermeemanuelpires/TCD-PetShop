const { Pet } = require('../models');
const { User } = require('../models');
module.exports = {
    async add(req, res) {
        const { pet } = req.body;
        try {
            if (!pet) {
                throw "Json invalido";
            }

            let UserExist = await User.findByPk(pet.resp);

            console.log(UserExist);

            if (UserExist) {
                
                await Pet.create(pet);
                return res.status(200).send('Pet Incluido com sucesso!');

            } else {
                return res.status(500).send('Responsavel vinculado ao Pet não existe!');
            }

        } catch (e) {
            console.log(e);
            return res.status(500).send('Não foi possivel incluir um novo Pet!');
        }
    },
    async findAll(req, res) {
        try {
            return res.status(200).send('lista de Pet');
        } catch (e) {
            console.log(e);
            return res.status(400).send('Não foi possível criar o usuário');
        }
    },
}