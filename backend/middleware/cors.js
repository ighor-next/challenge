const cors = require('cors');

const corsConfigurations = {
    origin: '*',
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type, X-PINGOTHER, Authorization'
}

module.exports = cors(corsConfigurations)