import express from 'express';
import initApp from './src/modules/app.router.js';
import 'dotenv/config.js'
import SendEmail from './src/utils/sendEmail.js';

const app = express();
const PORT = process.env.PORT;

initApp(app, express);
app.listen(PORT, ()=>{
    console.log(`server listening on ${PORT}`);
})