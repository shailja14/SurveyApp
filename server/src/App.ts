import express from 'express';
import DBConnector from './web/configs/connection/Database';
import Middlewares from './web/configs/middlewares/ExpressMiddleware';

class App {
    public app : express.Application

    private port : any

    private db: DBConnector

    public constructor() {
        this.app = express();
        this.port = parseInt(<string>process.env.PORT, 10) || 5000;
        this.db = new DBConnector(process.env.DB_URI || 'mongodb://localhost/surveyDB');
    }

    public init() {
        this.db.connect();
        this.app.set('port', this.port);
        this.app.use(Middlewares.configuration);
        this.app.listen(this.port, () => {
            console.log('App Running on ', this.port);
        });
    }
}

export default App;
