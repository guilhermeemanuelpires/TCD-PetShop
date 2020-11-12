/**
 *@swagger
 *definitions:
 *  PetUpDate:
 *    type: object
 *    required:
 *      - path
 *    properties:
 *      id:
 *        type: integer
 *        description: chave primaria.
 *      resp:
 *        type: integer
 *        description: usuário resposavel pelo pet.
 *      name:
 *        type: string
 *        description: nome do pet.
 *      weight:
 *        type: double
 *        description: peso do pet.
 *      sex:
 *        type: varchar(1)
 *        description: sexo do pet 
 *      updatedAt:
 *        type: datetime
 *        description: Data de alteração do pet.
 *      createdAt:
 *        type: datetime
 *        description: Data de inserção do pet.
 *    example: 
 *      pet:
 *          id: 2
 *          resp: 7
 *          name: QUICHORRO
 *          weight: 0.500
 *          sex: M
 */

/**
 *@swagger
 *definitions:
 *  Pet:
 *    type: object
 *    required:
 *      - path
 *    properties:
 *      id:
 *        type: integer
 *        description: chave primaria.
 *      resp:
 *        type: integer
 *        description: usuário resposavel pelo pet.
 *      name:
 *        type: string
 *        description: nome do pet.
 *      weight:
 *        type: double
 *        description: peso do pet.
 *      sex:
 *        type: varchar(1)
 *        description: sexo do pet 
 *      updatedAt:
 *        type: datetime
 *        description: Data de alteração do pet.
 *      createdAt:
 *        type: datetime
 *        description: Data de inserção do pet.
 *    example: 
 *      pet:
 *          resp: 7
 *          name: QUICHORRO
 *          weight: 0.500
 *          sex: M
 */

module.exports = (sequelize, DataType) => sequelize.define('pet', {
    resp: {
        type: DataType.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
            model: 'Users',
            key: 'id'
        }  
    },
    name:{
        type: DataType.STRING
    },
    weight : {
        type: DataType.DOUBLE
    },
    sex : {
        type: DataType.STRING(1)
    }
});