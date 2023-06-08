// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

/**
 *  El contrato Entardas que representa un conjunto de entradas de un evento.
 */
 
 contract Entradas {

    /// Nombre del evento
    string public evento;

    /**
     * address del creador que ha desplegado el contrato.
     * El contrato lo despliega el creador.
     */
    address public  creador;

      
    enum TipoEntrada {Normal, Super, VIP, Owner}
    /// Estructura de la entrada."añadirEntrada" a

    struct Entrada {

        address participante;
        uint    n_ticket;
        uint butaca;
        uint fecha;
        //False: Aun no tiene asignado comprador
        //True: Ya tiene asignado comprador
        bool estado;
        TipoEntrada tipo;
    }
    //Números de tipos de entrada
    uint public numero_entradas_total;
    uint numero_entradas_normal;
    uint numero_entradas_super;
    uint numero_entradas_vip;
    uint numero_entradas_owner;
  
    Entrada[] public TotalEntradas;

    //fecha del evento en timestamp
    uint fecha_evento;

    /*
     * Constructor.
     */
    constructor(string memory _evento, uint _numero_entradas_normal, uint _numero_entradas_super, uint _numero_entradas_vip, uint _numero_entradas_owner, uint _fecha) {
        require(bytes(_evento).length != 0, "El nombre del evento no puede estar vacio");
        require(_numero_entradas_normal + _numero_entradas_super + _numero_entradas_vip + _numero_entradas_owner > 0, "El numero total de entradas debe ser mayor que 0");
      
        creador = msg.sender;
        evento = _evento;
        numero_entradas_total = _numero_entradas_normal + _numero_entradas_super + _numero_entradas_vip + _numero_entradas_owner;
        numero_entradas_normal = _numero_entradas_normal;
        numero_entradas_super = _numero_entradas_super;
        numero_entradas_vip = _numero_entradas_vip;
        numero_entradas_owner = _numero_entradas_owner;
        fecha_evento = _fecha;
        crearEntradasPorDefecto(_fecha);
    }
    
 
    /**
     * Crea las entradas por defecto en el constructor.
     INTERNAL -> Solo puede ser llamada desde el interior de una función
     */
    function crearEntradasPorDefecto(uint _fecha) internal {
        uint i;
        for (i = 0; i < numero_entradas_normal; i++) {
            address participante = address(0); // ninguna persona asignada aún
            uint fecha = _fecha; // la fecha actual del bloque
            uint butaca = i + 1; // número de butaca
            TipoEntrada tipoEntrada = TipoEntrada.Normal; // entrada normal
            Entrada memory nuevaEntrada = Entrada(participante, i + 1, butaca, fecha, false, tipoEntrada);
            TotalEntradas.push(nuevaEntrada);
        }
        for (; i < numero_entradas_normal + numero_entradas_super; i++) {
            address participante = address(0); // ninguna persona asignada aún
            uint fecha = _fecha; // la fecha actual del bloque
            uint butaca = i + 1; // número de butaca
            TipoEntrada tipoEntrada = TipoEntrada.Super; // entrada super
            Entrada memory nuevaEntrada = Entrada(participante, i + 1, butaca, fecha, false, tipoEntrada);
            TotalEntradas.push(nuevaEntrada);
        }
        for (; i < numero_entradas_normal + numero_entradas_super + numero_entradas_vip; i++) {
            address participante = address(0); // ninguna persona asignada aún
            uint fecha = _fecha; // la fecha actual del bloque
            uint butaca = i + 1; // número de butaca
            TipoEntrada tipoEntrada = TipoEntrada.VIP; // entrada super
            Entrada memory nuevaEntrada = Entrada(participante, i + 1, butaca, fecha, false, tipoEntrada);
            TotalEntradas.push(nuevaEntrada);
        }

        for (; i < numero_entradas_total; i++) {
            address participante = address(0); // ninguna persona asignada aún
            uint fecha = _fecha; // la fecha actual del bloque
            uint butaca = i + 1; // número de butaca
            TipoEntrada tipoEntrada = TipoEntrada.Owner; // entrada super
            Entrada memory nuevaEntrada = Entrada(participante, i + 1, butaca, fecha, false, tipoEntrada);
            TotalEntradas.push(nuevaEntrada);
        }

}

function numeroTotalEntradas() public view returns (uint) {
    return numero_entradas_total;
}


 //Función usada para crear un número de entradas

function comprarEntrada(uint _indice, address _nuevoParticipante) public {
    require(_indice < TotalEntradas.length, "Entrada no encontrada.");
    require(_nuevoParticipante != address(0), "La direccion del participante no puede ser cero.");
    require(TotalEntradas[_indice].estado == false, "La entrada ya tiene un comprador asignado.");

    TotalEntradas[_indice].participante = _nuevoParticipante;
    TotalEntradas[_indice].estado = true;
}

//Funcion usada para modificar el participante de una entrada (Reventa)
    function modificarEntrada(uint _indice, address _nuevoParticipante) public {
        require(_indice < TotalEntradas.length, "Entrada no encontrada.");
        require(_nuevoParticipante != address(0), "La direccion del participante no puede ser cero.");
        require(TotalEntradas[_indice].estado != false, "Aun no ha sido comprada");
        TotalEntradas[_indice].participante = _nuevoParticipante;
    }

    
    //Eliminar el contrato
    function eliminarContratoDespuesFecha() public onlyAfter() {
    require(msg.sender == creador, "Solo el owner puede llamar a esta funcion.");
    selfdestruct(payable(creador));

}


    //Comprobar que ha finalizado el evento (Damos un día de margen
    modifier onlyAfter() {
        //block.timestamp -> Da la fecha actual en timestamp
    require(block.timestamp > (fecha_evento + 86400), "Aun no ha pasado al menos un dia desde el evento");
    _;
}


    /**
     * No se permite la recepcion de dinero.
     */
    receive() external payable {
        revert("No se permite la recepcion de dinero.");
    }
 }