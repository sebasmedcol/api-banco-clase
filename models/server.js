import express from 'express';
import 'dotenv/config';
import dbConnection from '../database/config.js'; 
import clienteRoutes from '../routers/clienteRoutes.js';
import usuarioRoutes from '../routers/usuarioRoutes.js';
import cuentaRoutes from '../routers/cuentaRoutes.js';
import cors from 'cors'; // Importar cors

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;

        this.middlewares();
        this.routes();
        this.dbConnect();
        this.listen();
    }

    middlewares() {
        this.app.use(cors({
            origin: 'https://react-banco.onrender.com', // Permitir solo este origen
            methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
        }));
        this.app.use(express.json());
    }

    routes() {
        this.app.use('/api/clientes', clienteRoutes);
        this.app.use('/api/usuarios', usuarioRoutes);
        this.app.use('/api/cuentas', cuentaRoutes);
    }

    async dbConnect() {
        try {
            await dbConnection();
            console.log('Database connected');
        } catch (error) {
            console.error('Database connection error:', error);
            process.exit(1);
        }
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}

export default Server;
