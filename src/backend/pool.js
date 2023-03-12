import mysql from "serverless-mysql";
import getConfig from 'next/config';

const {serverRuntimeConfig} = getConfig();

// https://www.npmjs.com/package/serverless-mysql
const pool = mysql({
    config: {
        host: serverRuntimeConfig.DB_HOST || "c4g-hands-app.unitedway.dreamhosters.com",
        user: serverRuntimeConfig.DB_USER || "c4g_user",
        password: serverRuntimeConfig.DB_PWD || "f#r#T#RQ@#r",
        port: serverRuntimeConfig.DB_PORT || 80,
        database: serverRuntimeConfig.DB_NAME || "c4g_hands_db",
    },
});

export { pool };
