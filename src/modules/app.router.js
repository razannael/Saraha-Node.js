import connectDb from '../../db/connection.js';
import messageRouter from './message/message.router.js';

const initApp = (app, express) => {
    app.use(express.json());
    connectDb();
    app.use('/messages', messageRouter);

};
export default initApp;