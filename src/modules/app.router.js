import connectDb from '../../db/connection.js';
import messageRouter from './message/message.router.js';
import * as authRouter from './auth/auth.router.js';

const initApp = (app, express) => {
    app.use(express.json());
    connectDb();
    app.use('/messages', messageRouter);
    app.use('/auth',authRouter)
};
export default initApp;