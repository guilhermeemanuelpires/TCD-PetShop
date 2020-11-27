const { Servico } = require('../models');
const sequelize = require('../models');
const { Pet } = require('../models');
const { Endereco } = require('../models');
const { User } = require('../models');

module.exports = {

    async add(req, res) {
        const { servico } = req.body;
        try {
            if (!servico) {
                throw "Json invalido";
            }

            let UserExist = await User.findByPk(servico.resp);
            let PetExist = await Pet.findByPk(servico.petid);
            let EnderecoExist = await Endereco.findByPk(servico.enderecoid);

            if (!UserExist) {
                return res.send({ status: 404, errorMsg: 'Responsavel vinculado ao serviço não existe!' });
            } else if (!PetExist) {
                return res.send({ status: 404, errorMsg: 'Pet vinculado ao serviço não existe!' });
            } else if (!EnderecoExist) {
                return res.send({ status: 404, errorMsg: 'Endereço vinculado ao serviço não existe!' });
            } else {
                await Servico.create(servico);
                return res.send({ status: 200, sucessMsg: 'Serviço Incluido com sucesso, Verefique sua agenda' });
            }

        } catch (e) {
            console.log(e);
            return res.send({ status: 500, errorMsg: "Não foi possivel incluir um novo Serviço!" })
        }
    },
    async delete(req, res) {
        const id = req.params.id;
        try {
            // Busca servico por Id
            const servico = await Servico.findByPk(id);

            //Se não encontrar, devolve erro 404    
            if (!servico) {
                return res.send({ status: 404, errorMsg: 'Nenhum serviço encontrado!' });
            } else {
                await Servico.destroy({
                    where: {
                        id: id
                    }
                });

                return res.send({ status: 204, sucessMsg: 'Serviço excluido com sucesso!' });
            }
        }
        catch (e) {
            console.log(e);
            return res.send({ status: 500, errorMsg: 'Erro ao excluir serviço!' });
        }
    },
    async findByID(req, res) {
        const id = req.params.id;
        try {
            let servicos = await Servico.findAll({
                where: { resp: id }, include: [{ model: Pet }, { model: Endereco }],
                attributes: ["id", "state", "resp", "typserv", "time", "obs", [sequelize.fn('date_format', sequelize.col('date'), '%d/%m/%Y'), 'date']]
            });
            return res.status(200).send(servicos);
        } catch (e) {
            console.log(e);
            return res.status(500).send('Erro ao cosultar Servicos!');
        }
    },
    async findByIDCount(req, res) {
        const id = req.params.id;
        try {
            let servicos = await Servico.findAll({ where: { resp: id } });
            const servicoCount = servicos.length;
            return res.status(200).send({ status: 200, count: servicoCount });
        } catch (e) {
            console.log(e);
            return res.status(500).send('Erro ao cosultar total de servicos!');
        }
    },
    async findAllCount(req, res) {
        try {
            let servicos = await Servico.findAll();
            const servicoCount = servicos.length;
            return res.status(200).send({ status: 200, count: servicoCount });
        } catch (e) {
            console.log(e);
            return res.status(500).send('Erro ao cosultar total de servicos!');
        }
    },
    async update(req, res) {
        const { servico } = req.body;
        try {

            if (!servico) {
                throw "Json invalido";
            }

            // Busca Servico por Id e responsavel
            const ServicoExist = await Servico.findByPk(servico.id);


            //Se não encontrar, devolve erro 404    
            if (!ServicoExist) {
                return res.send({ status: 404, errorMsg: 'Nenhum serviço encontrado!' });
            } else {
                const novo = await Servico.update(servico, {
                    where: {
                        id: servico.id
                    }
                });
                return res.send({ status: 200, sucessMsg: "Serviço atualizado com sucesso!" });
            }

        } catch (e) {
            console.log(e);
            res.send({ status: 500, errorMsg: 'Erro ao atualizar serviço!' });
        }
    },
    async findAll(req, res) {
        try {
            let servicos = await Servico.findAll({
                include: [{ model: Pet }, { model: Endereco }],
                attributes: ["id", "state", "resp", "typserv", "time", "obs", [sequelize.fn('date_format', sequelize.col('date'), '%d/%m/%Y'), 'date']]
            });
            return res.status(200).send(servicos);
        } catch (e) {
            console.log(e);
            return res.status(500).send('Erro ao cosultar Servicos!');
        }
    },
}