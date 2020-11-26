module.exports = (sequelize, DataType) => sequelize.define('endereco', {
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
    street:{
        type: DataType.STRING
    },
    number : {
        type: DataType.INTEGER
    },
    complement : {
        type: DataType.STRING
    }
});