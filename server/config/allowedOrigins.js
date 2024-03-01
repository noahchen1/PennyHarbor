const allowedOrigins = [
    'exp://10.0.0.224:8081',
    'http://localhost:3000',
    'https://chat-app-zs9s.onrender.com',
    'http://localhost:19000'
];

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions;