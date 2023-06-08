module.exports = async callback => {

    try {
        const Asignatura = artifacts.require("./Asignatura.sol");

        const accounts = await web3.eth.getAccounts();

        let asignatura = await Asignatura.deployed();
        let numTransacciones = 0;
        let gasTotal = 0;
        let startTime = Date.now();
        
        const imprimirTiempo = (accion) => {
            console.log(`Tiempo ${accion}: ${Date.now() - startTime} ms`);
        }

        const imprimirInfoTransaccion = async (txHash) => {
            let receipt = await web3.eth.getTransactionReceipt(txHash);
            console.log(`Transacción ${txHash}:`);
            console.log(`Estado: ${receipt.status}`);
            console.log(`Gas utilizado: ${receipt.gasUsed}`);
            console.log(`Coste en wei: ${web3.utils.fromWei(String(receipt.gasUsed * (await web3.eth.getGasPrice())), 'ether')} ETH`);
            console.log(`Bloque: ${receipt.blockNumber}`);
            console.log(`Tiempo: ${new Date((await web3.eth.getBlock(receipt.blockNumber)).timestamp * 1000).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', second: '2-digit'})}`);
            gasTotal += Number(receipt.gasUsed);
        }

        let profesor = await asignatura.profesor();
        console.log("Cuenta del profesor =", profesor);

        imprimirTiempo("antes");

        console.log("Crear 5 evaluaciones:");
        for (let i = 1; i <= 5; i++) {
            let nombreEvaluacion = `Evaluación ${i}`;
            let fecha = Date.now() + i * 24 * 3600000;
            let ponderacion = Math.floor(Math.random() * 50) + 1;
            let tx = await asignatura.creaEvaluacion(nombreEvaluacion, fecha, ponderacion);
            await imprimirInfoTransaccion(tx.tx);
            numTransacciones++;
        }


        console.log(`--------------------------------------------------------------------------`);
        imprimirTiempo("después");
        console.log(`Creadas: ${numTransacciones}`);
        console.log(`Coste total en gas (en wei): ${gasTotal * (await web3.eth.getGasPrice())} wei`);
        console.log(`Coste total en ether: ${web3.utils.fromWei(String(gasTotal * (await web3.eth.getGasPrice())), 'ether')} ETH`);
        console.log(`Número de bloques creados: ${await web3.eth.getBlockNumber()}`);
    } catch (error) {
        console.error(error);
    }

    callback();
};
