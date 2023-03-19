/** @type {import('next').NextConfig} */

require('dotenv').config() // https://www.npmjs.com/package/dotenv

const withPWA = require('next-pwa')({
    dest: 'public'
})

const nextConfig = {
    reactStrictMode: true,
    serverRuntimeConfig: {
        // Will only be available on the server side
        DB_HOST: process.env.DB_HOST,
        DB_USER: process.env.DB_USER,
        DB_PWD: process.env.DB_PWD,
        DB_PORT: process.env.DB_PORT,
        DB_NAME: process.env.DB_NAME,
        API_SECRET: process.env.API_SECRET || "c4g_user",
        API_SALT: process.env.API_SALT || "c4g_user"
    }
}

module.exports = withPWA(
    nextConfig
)