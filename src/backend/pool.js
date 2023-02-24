import mysql from "serverless-mysql";
import getConfig from 'next/config';

const {serverRuntimeConfig} = getConfig();

// https://www.npmjs.com/package/serverless-mysql
const pool = mysql({
    config: {
        host: serverRuntimeConfig.DB_HOST || "localhost",
        user: serverRuntimeConfig.DB_USER || "c4g_user",
        password: serverRuntimeConfig.DB_PWD,
        port: serverRuntimeConfig.DB_PORT || 3306,
        database: serverRuntimeConfig.DB_NAME || "c4g_hands_db",
    },
});

export { pool };
