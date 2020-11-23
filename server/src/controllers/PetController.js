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
                return res.status(404).send('Nenhum Pet Encontrado!');
            } else {                
                const novo = await Pet.update(pet, {
                    id: pet.id,
                    resp: pet.resp
                });
                return res.send(novo);
            }

        } catch (e) {
            console.log(e);
            res.status(500).send('Erro ao atualizar pet');
        }
    },
    async delete(req, res) {
        const id = req.params.id;
        try {

            // Busca Pet por Id
            const pet = await Pet.findByPk(id);

            //Se não encontrar, devolve erro 404    
            if (!pet) {
                return res.status(404).send('Nenhum Pet Encontrado!');
            } else {
                await Pet.destroy({
                    where: {
                        id: id
                    }
                });

                res.status(204).send('Pet excluido com sucesso!');
            }
        }
        catch (e) {
            console.log(e);
            return res.status(500).send('Erro ao excluir pet!');
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
}