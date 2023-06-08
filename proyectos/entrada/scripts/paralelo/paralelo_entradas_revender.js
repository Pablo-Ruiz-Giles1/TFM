module.exports = async callback => {
  try {
    const Entradas = artifacts.require("./Entradas.sol");
    const accounts = await web3.eth.getAccounts();

    const direccionContrato = '0x227Fa8cbB7BdCD2275c1602edBDCFD487d4D8627'; // Aquí reemplaza con la dirección real del contrato
    let entradas = await Entradas.at(direccionContrato);
    
    let numTransacciones = 0;
    let gasTotal = 0;
    let startTime = Date.now();

    const imprimirTiempo = accion => {
      console.log(`Tiempo ${accion}: ${Date.now() - startTime} ms`);
    };

    const imprimir = accion => {
      console.log(`${accion}: ${Date.now() - startTime} ms`);
    };


    const imprimirInfoTransaccion = async (txHash, mensaje, i) => {
      let receipt = await web3.eth.getTransactionReceipt(txHash);
      if (!receipt) {
        console.log(`Transaction receipt not found for hash ${txHash}, retrying in 1500ms`);
        await new Promise(resolve => setTimeout(resolve, 1500));
        receipt = await web3.eth.getTransactionReceipt(txHash);
        if (!receipt) {
          console.log(`Transaction receipt not found for hash ${txHash} after retrying, skipping...`);
          return null;
        }
      }
      const gasPrice = await web3.eth.getGasPrice();
      const transaccion = {
        numTransaccion: numTransacciones + 1,
        estado: receipt.status,
        gasUsado: receipt.gasUsed,
        costeEnWei: receipt.gasUsed * gasPrice,
        costeEnEther: web3.utils.fromWei(String(receipt.gasUsed * gasPrice), "ether"),
        bloque: receipt.blockNumber,
        tiempo: new Date((await web3.eth.getBlock(receipt.blockNumber)).timestamp * 1000).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
        })
      };
      gasTotal += Number(receipt.gasUsed);
      numTransacciones++;
      console.log(`${mensaje} ${i + 1}`);
      console.log(`Transacción ${txHash}:`);
      console.log(`Estado: ${transaccion.estado}`);
      console.log(`Gas utilizado: ${transaccion.gasUsado}`);
      console.log(`Coste en wei: ${web3.utils.fromWei(String(transaccion.costeEnWei), "ether")} ETH`);
      console.log(`Bloque: ${transaccion.bloque}`);
      console.log(`Tiempo: ${transaccion.tiempo}`);
      //  console.log(`------------------------------------------------`);
      return transaccion;
    };
    

    let creador = await entradas.creador();
   // console.log("Cuenta del creador =", creador);

    imprimirTiempo("antes");
    let totalEntradas2 = await entradas.numeroTotalEntradas();


    function obtenerNumero(arreglo) {
      return arreglo.words[0];
    }
    
    let totalEntradas = obtenerNumero(totalEntradas2);
    
    

    console.log("Total entradas", totalEntradas);

 

    console.log("--2--")
    //Revender
    let revenderPromises = [];
    imprimir("Antes");
    for (let i = 0; i < totalEntradas; i++) {
      revenderPromises.push(
        entradas.modificarEntrada(i, accounts[0]).then(tx => {
          return imprimirInfoTransaccion(tx.tx, `Modificada entrada numero:`, i);
        })
      );
    }
    const revenderTransacciones = await Promise.all(revenderPromises);
    imprimir("Posterior");

    console.log(`--------------------------------------------------------------------------`);
    imprimirTiempo("después");
    console.log(`Creadas: ${numTransacciones}`);
    console.log(
      `Coste total en gas (en wei): ${gasTotal *
        (await web3.eth.getGasPrice())} wei`
    );
    console.log(
      `Coste total en ether: ${web3.utils.fromWei(
        String(gasTotal * (await web3.eth.getGasPrice())),
        "ether"
      )} ETH`
    );
    console.log(`Número de bloques creados: ${await web3.eth.getBlockNumber()}`);
  } catch (error) {
    console.error(error);
  }

  callback();
};
