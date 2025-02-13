import express from 'express';
import path from 'path';


//Se realiza la interfaz de Options para definir las variables de entorno
interface Options{
    port: number,
    public_path?: string
}

export class Server {

    private app: express.Application = express();
    private readonly port:number;
    private readonly public_path:string;
    constructor(options: Options){
        const {port, public_path = 'public'} = options;
        this.port = port;
        this.public_path = public_path; 
    }
    async start(){
        console.log('Starting server...');

        //Middlewares


        //Public routes
        this.app.use(express.static(this.public_path))

        this.app.get('*',(req,res)=> {
            const indexPath = path.join(__dirname + `../../../${ this.public_path }/index.html`);
            res.sendFile(indexPath);
        })

        this.app.listen(this.port, () => console.log(`Server running on port ${this.port}`));
    }
    
};
