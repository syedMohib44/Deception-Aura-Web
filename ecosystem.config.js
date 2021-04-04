module.exports = {
    apps: [{
        name: "deception-aura",
        script: "./app.js",
        env: {
            NODE_ENV: "production",
        },
        env_production: {
            NODE_ENV: "production",
        }
    }]
}
