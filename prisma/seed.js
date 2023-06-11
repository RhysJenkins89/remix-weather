import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function seed() {
    await Promise.all(
        getCities().map((city) => {
            return db.city.create({ data: city })
        })
    )
}
seed();

function getCities() {
    return [
        {
            name: 'Birmingham',
            lat: '52.4862',  
            long: '1.8904'
        }
    ]
}

// Note that we don't actually want to seed the database. The database should start empty. The user will add cities on the frontend.