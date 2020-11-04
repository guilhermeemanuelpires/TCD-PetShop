const express = require('express');
const router = express.Router();

/*   Importa controllers */
const AuthController = require('./controllers/AuthConroller');

/* Auth e documentaçõa Swagger*/

/* Auth */
/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags:
 *       - Cadastra Usúario
 *     description: Cadastra Usúario
 *     produces:
 *       - application/json
 *     parameters:
 *     - name: Cadastra 
 *       description: Puppy object 
 *       required: true
 *       in: body
 *       schema:
 *          $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: Cadastro Realizado com sucesso!
 *         schema:
 *            $ref: '#/definitions/User'
 *       500:
 *         description: Server error!
 */
router.post('/auth/register', AuthController.register);

module.exports = (app) => app.use(router);