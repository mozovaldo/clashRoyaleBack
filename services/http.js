const http = require('axios').create({
    baseUrl:'https://api.clashroyale.com/v1',
    headers:{
        'Authorization':`Bearer ${process.env.API_KEY_CLASH_ROYALE}`,
        'Content-Type':'application/json'
    }
})

module.exports = http