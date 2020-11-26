const express = require('express');
const router = express.Router();

/*   Importa controllers */
const AuthController = require('./controllers/AuthConroller');
const PetController = require('./controllers/PetController');

/* Auth e documentaçõa Swagger*/

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags:
 *       - Usuário
 *     description: Usuário
 *     produces:
 *       - application/json
 *     parameters:
 *     - name: Cadastra 
 *       description: Puppy object 
 *       required: true
 *       in: body
 *       schema:
 *          $ref: '#/definitions/Register'
 *     responses:
 *       200:
 *         description: Cadastro Realizado com sucesso!
 *         schema:
 *            $ref: '#/definitions/Register'
 *       500:
 *         description: Server error!
 */
router.post('/auth/register', AuthController.register);

router.put('/auth/register', AuthController.update);

/**
 * @swagger
 * /auth:
 *   post:
 *     tags:
 *       - Usuário
 *     description: Usuário
 *     produces:
 *       - application/json
 *     parameters:
 *     - name: Cadastra 
 *       description: Puppy object 
 *       required: true
 *       in: body
 *       schema:
 *          $ref: '#/definitions/Auth'
 *     responses:
 *       200:
 *         description: Login realizado com sucesso! 
 *       404:
 *         description: Senha inválida!! 
 *       500:
 *         description: Server error!
 */
router.post('/auth', AuthController.login);

/**
 * @swagger
 * /pet/add:
 *   post:
 *     tags:
 *       - Pet
 *     description: Pet
 *     produces:
 *       - application/json
 *     parameters:
 *     - name: Cadastra 
 *       description: Puppy object 
 *       required: true
 *       in: body
 *       schema:
 *          $ref: '#/definitions/Pet'
 *     responses:
 *       200:
 *         description: Pet Incluido com sucesso!
 *       500:
 *         description: Não foi possivel incluir um novo Pet!
 */
router.post('/pet/add', PetController.add);

/**
 * @swagger
 * /pet/findall:
 *   get:
 *     tags:
 *       - Pet
 *     description: Pet
 *     produces:
 *       - application/json 
 *     responses:
 *       200:
 *         description: Pet Incluido com sucesso!
 *         schema:
 *            $ref: '#/definitions/Register' 
 *       500:
 *         description: Erro ao cosultar pets!
 */
router.get('/pet/findall', PetController.findAll);

/**
 * @swagger
 * /pet/delete/{id}:
 *   delete:
 *     tags:
 *       - Pet
 *     description: Pet
 *     produces:
 *       - application/json 
 *     parameters:
 *       - name: id
 *         description: id pet
 *         in: path
 *         required : true
 *         type: integer 
 *     responses:
 *       200:
 *         description: Pet excluido com sucesso!
 *       404:
 *         description: Nenhum Pet Encontrado!
 *       500:
 *         description: Erro ao excluir pet!
 */
router.delete('/pet/delete/:id([0-9]+)', PetController.delete);

/**
 * @swagger
 * /pet/update:
 *   put:
 *     tags:
 *       - Pet
 *     description: Usuário
 *     produces:
 *       - application/json
 *     parameters:
 *     - name: Cadastra 
 *       description: Puppy object 
 *       required: true
 *       in: body
 *       schema:
 *          $ref: '#/definitions/PetUpDate'
 *     responses:
 *       200:
 *         description: Cadastro Realizado com sucesso!
 *         schema:
 *            $ref: '#/definitions/PetUpDate'
 *       500:
 *         description: Server error!
 */
router.put('/pet/update', PetController.update);

router.get('/pet/:id([0-9]+)', PetController.findByID);
module.exports = (app) => app.use(router);