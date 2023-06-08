module.exports = async callback => {
  try {
    const Entradas = artifacts.require("./Entradas.sol");
    const accounts = await web3.eth.getAccounts();

    let entradas = await Entradas.new(
      "Evento de prueba",
      4, //normal
      4, //super
      4, //vip
      4, //owner
      50
    );
    let numTransacciones = 0;
    let gasTotal = 0;
    let startTime = Date.now();

    const imprimirTiempo = accion => {
      console.log(`Tiempo ${accion}: ${Date.now() - startTime} ms`);
    };

    
    const imprimirInfoTransaccion = async txHash => {
      let receipt = await web3.eth.getTransactionReceipt(txHash);
    
      if (receipt) {
        console.log(`Transacción ${txHash}:`);
        console.log(`Estado: ${receipt.status}`);
        console.log(`Gas utilizado: ${receipt.gasUsed}`);
        console.log(
          `Coste en wei: ${web3.utils.fromWei(
            String(receipt.gasUsed * (await web3.eth.getGasPrice())),
            "ether"
          )} ETH`
        );
        console.log(`Bloque: ${receipt.blockNumber}`);
        console.log(
          `Tiempo: ${new Date(
            (await web3.eth.getBlock(receipt.blockNumber)).timestamp * 1000
          ).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
          })}`
        );
        gasTotal += Number(receipt.gasUsed);
      } else {
        // La transacción aún no está disponible, se vuelve a llamar la función en unos segundos
        setTimeout(() => imprimirInfoTransaccion(txHash), 1500);
      }
    };
    

    let creador = await entradas.creador();
    console.log("Cuenta del creador =", creador);

    imprimirTiempo("antes");
    let totalEntradas2 = await entradas.numeroTotalEntradas();


    function obtenerNumero(arreglo) {
      return arreglo.words[0];
    }
    
    let totalEntradas = obtenerNumero(totalEntradas2);
    
    



    console.log("Total entradas", totalEntradas);

    console.log("Compramos todas entradas:");

    //Comprar
    let tx;
    for (let i = 0; i < totalEntradas; i++) {
      tx = await entradas.comprarEntrada(i, accounts[0]);
      console.log(`Comprada entrada numero: ${i + 1}`);
      await imprimirInfoTransaccion(tx.tx);
      numTransacciones++;
    }
    
    //Revender
    for (let i = 0; i < totalEntradas; i++) {
      tx = await entradas.modificarEntrada(i, accounts[0]);
      console.log(`Modificada entrada numero: ${i + 1}`);
      await imprimirInfoTransaccion(tx.tx);
      numTransacciones++;
    }
    
    //Eliminar

    tx = await entradas.eliminarContratoDespuesFecha({ from: accounts[0] });
      console.log(`Eliminamos contrato`);
      await imprimirInfoTransaccion(tx.tx);
      numTransacciones++;
    



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
