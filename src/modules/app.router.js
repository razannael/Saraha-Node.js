import messageRouter from './message/message.router.js';

const initApp = (app, express) => {
    app.use(express.json());
    app.use('/messages', messageRouter);

};
export default initApp;