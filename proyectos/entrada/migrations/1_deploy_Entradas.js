
let Entradas = artifacts.require("Entradas");

module.exports = function(deployer) {
    deployer.deploy(Entradas, "Wizink", 7, 4, 3, 1, 1649472000);
};
