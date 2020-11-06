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

router.get('/pet/findAll', PetController.findAll);

module.exports = (app) => app.use(router);