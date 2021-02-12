import mongoose from 'mongoose';
import http from 'http';
import { App, PORT, MONGO_URI, IS_DEV_MODE } from './api/config/expressSetup';

const server = http.createServer(new App().app);
server.listen(PORT);

server.on('listening', () => {
    mongoose.set('debug', IS_DEV_MODE);
    mongoose.connect(MONGO_URI, {
        autoIndex: IS_DEV_MODE,
        useCreateIndex: IS_DEV_MODE,
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: true
    });
    mongoose.connection.once('open', () => {
        console.info('Connected to Mongo via Mongoose');
    });
    mongoose.connection.on('error', (err) => {
        console.error('Unable to connect to Mongo via Mongoose', err);
    });
})