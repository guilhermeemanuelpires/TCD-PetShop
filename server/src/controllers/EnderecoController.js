const { Endereco } = require('../models');
const { User } = require('../models');
module.exports = {
    async add(req, res) {
        const { endereco } = req.body;
        try {
            if (!endereco) {
                throw "Json invalido";
            }

            let EnderecoExist = await User.findByPk(endereco.resp);

            console.log(EnderecoExist);

            if (EnderecoExist) {
                await Endereco.create(endereco);
                return res.send({ status: 200, sucessMsg: 'Endereço Incluido com sucesso!' });
            } else {
                return res.send({ status: 500, errorMsg: 'Responsavel vinculado ao endereço não existe!' });
            }

        } catch (e) {
            console.log(e);
            return res.send({ status: 500, errorMsg: "Não foi possivel incluir um novo Endereço!" })
        }
    },
    async update(req, res) {
        const { endereco } = req.body;
        try {

            if (!endereco) {
                throw "Json invalido";
            }

            // Busca Pet por Id e responsavel
            const EnderecoExist = await Endereco.findByPk(endereco.id);


            //Se não encontrar, devolve erro 404    
            if (!EnderecoExist) {
                return res.send({ status: 404, errorMsg: 'Nenhum endereço encontrado!' });
            } else {
                const novo = await Endereco.update(endereco, {
                    where: {
                        id: endereco.id,
                        resp: endereco.resp
                    }
                });
                return res.send({ status: 200, sucessMsg: "Endereço atualizado com sucesso!" });
            }

        } catch (e) {
            console.log(e);
            res.send({ status: 500, errorMsg: 'Erro ao atualizar endereço!' });
        }
    },
    async delete(req, res) {
        const id = req.params.id;
        try {

            // Busca Pet por Id
            const endereco = await Endereco.findByPk(id);

            //Se não encontrar, devolve erro 404    
            if (!endereco) {
                return res.send({ status: 404, errorMsg: 'Nenhum endereço encontrado!' });
            } else {
                await Endereco.destroy({
                    where: {
                        id: id
                    }
                });

                res.send({ status: 204, sucessMsg: 'Endereço excluido com sucesso!' });
            }
        }
        catch (e) {
            console.log(e);
            return res.send({ status: 500, errorMsg: 'Erro ao endereço pet!' });
        }
    },
    async findAll(req, res) {
        try {
            let enderecos = await Endereco.findAll();
            return res.status(200).send(enderecos);
        } catch (e) {
            console.log(e);
            return res.status(500).send('Erro ao cosultar edereços!');
        }
    },
    async findByID(req, res) {
        const id = req.params.id;
        try {
            let enderecos = await Endereco.findAll({ where: { resp: id } });
            return res.status(200).send(enderecos);
        } catch (e) {
            console.log(e);
            return res.send({ status: 500, errorMsg: 'Erro ao cosultar pets!' });
        }
    },
}