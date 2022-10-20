// conecting to database
const Pool = require("pg").Pool;

const devConfig = {
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE
}

const proConfig = {
    connectionString: process.env.DATABASE_URL // heroku addons - postgres databe on heroku
}

const pool = new Pool(process.env.NODE_ENV === "production" ? proConfig : devConfig,
);

module.exports = pool;