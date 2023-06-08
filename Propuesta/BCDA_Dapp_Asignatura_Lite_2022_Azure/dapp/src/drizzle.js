
import { Drizzle } from '@drizzle/store';

import Asignatura from './contracts/Asignatura.json'

// Opciones:
const options = {
    contracts: [ Asignatura ],
    polls: {
        accounts: 3000,
    },
    web3: {
        fallback: {
           type: "ws",
            url: "wss://sepolia.infura.io/ws/v3/85d45a403dd742418d085ca00966d26d"
        }
    }
}

// Crear y exportar el objeto drizzle:
export default new Drizzle(options);


