module.exports = (sequelize, DataType) => sequelize.define('servico', {
    state: {
        type: DataType.INTEGER,
    },
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
    enderecoid: {
        type: DataType.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
            model: 'Enderecos',
            key: 'id'
        }
    },
    petid: {
        type: DataType.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
            model: 'Pets',
            key: 'id'
        }
    },
    typserv: {
        type: DataType.STRING(1)
    },
    date: {
        type: DataType.DATE
    },
    time: {
        type: DataType.TIME
    },
    obs: {
        type: DataType.STRING
    }
});