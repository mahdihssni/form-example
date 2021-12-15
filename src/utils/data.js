const faker = require('faker');

export const getData = (n) =>  {
    const result = []
    for (let i = 0; i < n; ++i) {
        const user = {}
        user.id = faker.datatype.uuid();
        user.name = faker.name.findName();
        user.email = faker.internet.email();
        result.push({...user})
    }
    return result
}
