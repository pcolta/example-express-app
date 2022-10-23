import sequelizeFixtures from "sequelize-fixtures";
const models = require('../models');

const fixtures = sequelizeFixtures.loadFile("./fixtures/products.json", models).then(() => {
    process.exit()
})

export default fixtures;
