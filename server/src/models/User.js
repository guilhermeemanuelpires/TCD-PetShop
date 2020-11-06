/**
 *@swagger
 *definitions:
 *  Auth:
 *    type: object
 *    required:
 *      - path
 *    properties:
 *      username:
 *        type: string
 *        description: Nome usuário.
 *      password:
 *        type: string
 *        description: Senha do usuário.
 *    example: 
 *      username: fulano
 *      password: "123"
 */

/**
 *@swagger
 *definitions:
 *  Register:
 *    type: object
 *    required:
 *      - path
 *    properties:
 *      id:
 *        type: integer
 *        description: Chave primaria.
 *      name:
 *        type: string
 *        description: Nome completo do usuário.
 *      username:
 *        type: string
 *        description: Nome usuário.
 *      password:
 *        type: string
 *        description: Senha do usuário.
 *      fone:
 *        type: string
 *        description: Telefone celular o fico do usuário.
 *      email:
 *        type: string
 *        description: E-mail do usuário.
 *      updatedAt:
 *        type: datetime
 *        description: Data de alteração do usuário.
 *      createdAt:
 *        type: datetime
 *        description: Data de inserção do usuário.
 *    example:
 *       user: 
 *          name: fulano
 *          username: fulano
 *          password: A123
 *          fone: "4699999999"
 *          email: teste@gmail.com
 */

module.exports = (sequelize, DataType) => sequelize.define('user', {
    name: {
        type: DataType.STRING
    },
    username: {
        type: DataType.STRING,
    },
    password: {
        type: DataType.STRING        
    },
    fone: {
        type : DataType.STRING
    },
    email: {
        type : DataType.STRING
    }
});