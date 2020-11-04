module.exports = {
    dialect: 'mariadb',
    host: '127.0.0.1',
    username: 'root',
    password: 'root',
    database: 'petshop',
    define: {
        timestamps: true,
        underscored : true,
        underscoredAll: true,
    },
}