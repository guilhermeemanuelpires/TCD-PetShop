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
                return res.send({ status: 200, sucessMsg: 'Pet Incluido com sucesso!' });
            } else {
                return res.send({ status: 500, errorMsg: 'Responsavel vinculado ao Pet não existe!' });
            }

        } catch (e) {
            console.log(e);
            return res.send({ status: 500, errorMsg: "Não foi possivel incluir um novo Pet!" })
        }
    },
    async update(req, res) {
        const { pet } = req.body;
        try {

            if (!pet) {
                throw "Json invalido";
            }

            // Busca Pet por Id e responsavel
            const petExist = await Pet.findByPk(pet.id);


            //Se não encontrar, devolve erro 404    
            if (!petExist) {
                return res.send({ status: 404, errorMsg: 'Nenhum Pet Encontrado!' });
            } else {
                const novo = await Pet.update(pet, {
                    where: {
                        id: pet.id,
                        resp: pet.resp
                    }
                });
                return res.send({ status: 200, sucessMsg: "Pet atualizado com sucesso!" });
            }

        } catch (e) {
            console.log(e);
            res.send({ status: 500, errorMsg: 'Erro ao atualizar pet' });
        }
    },
    async delete(req, res) {
        const id = req.params.id;
        try {

            // Busca Pet por Id
            const pet = await Pet.findByPk(id);

            //Se não encontrar, devolve erro 404    
            if (!pet) {
                return res.send({ status: 404, errorMsg: 'Nenhum Pet Encontrado!' });
            } else {
                await Pet.destroy({
                    where: {
                        id: id
                    }
                });

                res.send({ status: 204, sucessMsg: 'Pet excluido com sucesso!' });
            }
        }
        catch (e) {
            console.log(e);
            return res.send({ status: 500, errorMsg: 'Erro ao excluir pet!' });
        }
    },
    async findAll(req, res) {
        try {
            let pets = await Pet.findAll();
            return res.status(200).send(pets);
        } catch (e) {
            console.log(e);
            return res.status(500).send('Erro ao cosultar pets!');
        }
    },
    async findByID(req, res) {
        const id = req.params.id;
        try {
            let pets = await Pet.findAll({ where: { resp: id } });
            return res.status(200).send(pets);
        } catch (e) {
            console.log(e);
            return res.status(500).send('Erro ao cosultar pets!');
        }
    },
    async findByIDCount(req, res) {
        const id = req.params.id;
        try {
            let Pets = await Pet.findAll({ where: { resp: id } });
            const petCount = Pets.length;
            return res.status(200).send({ status: 200, count: petCount });
        } catch (e) {
            console.log(e);
            return res.status(500).send('Erro ao cosultar totla de endereços!');
        }
    },
}