module.exports = async callback => {

    try {
        const Asignatura = artifacts.require("./Asignatura.sol");

        // Usar las cuentas de usuario
        const accounts = await web3.eth.getAccounts();
        if (accounts.length < 8) {
            throw new Error("No hay cuentas.");
        }

        let asignatura = await Asignatura.deployed();

        // Identificar al profesor:
        let profesor = await asignatura.profesor();
        console.log("Cuenta del profesor =", profesor);


        console.log("Matricular a un alumno:");
        let pepeAccount = accounts[0];

        console.log("Cuenta de Pepe =", pepeAccount);
        await asignatura.automatricula("Jose Redondo", "jr@stio.com", {from: pepeAccount});

        console.log("Añadir calificaciones:");
        await asignatura.califica(pepeAccount, 0, 0, 0);
        await asignatura.califica(pepeAccount, 1, 1, 0);
        await asignatura.califica(pepeAccount, 2, 2, 350);
        await asignatura.califica(pepeAccount, 3, 2, 650);
    } catch (err) {   // Capturar errores
        console.log(`Error: ${err}`);
    } finally {
        console.log("FIN");
    }

    callback();      // Terminar
};
