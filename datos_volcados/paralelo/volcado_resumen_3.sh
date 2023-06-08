#!/bin/bash

# Obtener el nombre del archivo de texto como argumento
archivo=$1

# Obtener el nombre del archivo CSV a partir del nombre del archivo de texto
filename="${archivo%.*}_resumen3.csv"

# Crear un archivo CSV vacío
echo "" > $filename

# Escribir las cabeceras del archivo CSV
echo "Antes,Despues,Duración,Transacciones,Coste Total" >> $filename

# Bandera que indica si se están procesando las líneas entre "--1--" y "--2--"
procesando=false

# Variables para almacenar los valores de las transacciones
antes=""
despues=""
coste_total=0
transacciones=0

# Itera por cada línea del archivo de texto
while IFS= read -r linea
do
  # Si la línea es "--3--", se activa la bandera para empezar a procesar líneas
  if [[ $linea == "--3--" ]]
  then
    procesando=true
  # Si la línea es "--------------------------------------------------------------------------", se desactiva la bandera para dejar de procesar líneas
  elif [[ $linea == "--------------------------------------------------------------------------" ]]
  then
    procesando=false
    # Escribir los valores de la transacción actual en una línea del archivo CSV
    duracion=$(($despues-$antes))
    echo "$antes,$despues,$duracion,$transacciones,$coste_total" >> $filename
    # Reiniciar los valores de las transacciones para la siguiente transacción
    antes=""
    despues=""
    coste_total=0.0 # reinicia la variable con un número decimal
    transacciones=0
  # Si la bandera está activa, se procesa la línea
  elif [[ $procesando == true ]]
  then
    # Si la línea contiene la palabra "Antes", es la línea que indica el tiempo antes de la transacción
    if [[ $linea == *Antes:* ]]
    then
      antes=$(echo "$linea" | cut -d " " -f 2)
    # Si la línea contiene la palabra "Después", es la línea que indica el tiempo después de la transacción
    elif [[ $linea == *Posterior:* ]]
    then
      despues=$(echo "$linea" | cut -d " " -f 2)
    # Si la línea contiene la palabra "Coste", es la línea que indica el costo de la transacción en wei
    elif [[ $linea == *Coste* ]]
    then
      coste=$(echo "$linea" | awk '{print $4}')
      coste_total=$(echo "$coste_total+$coste" | bc) # usa bc para operaciones con números decimales
      transacciones=$(($transacciones+1))
    fi
  fi
done < "$archivo"

