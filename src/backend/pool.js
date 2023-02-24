import mysql from "serverless-mysql";

// https://www.npmjs.com/package/serverless-mysql
const pool = mysql({
    config: {
        host: "localhost",
        user: "c4g_user",
        password: "c4g_pwd",
        port: 13306,
        database: "c4g_hands_db",
    },
});

export { pool };
