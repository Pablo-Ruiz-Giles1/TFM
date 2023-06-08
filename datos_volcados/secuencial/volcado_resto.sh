#!/bin/bash

# Obtener el nombre del archivo de texto como argumento
archivo=$1

# Obtener el nombre del archivo CSV a partir del nombre del archivo de texto
filename="${archivo%.*}_total.csv"

# Crear un archivo CSV vacío
echo "" > $filename

# Escribir las cabeceras del archivo CSV
echo "Creadas,Coste en gas (wei),Coste en ether,Empezar,Acabar,Duracion" >> $filename

# Inicializar las variables
evaluaciones=""
tiempo_antes=""
tiempo_despues=""
bloques=""
coste_gas=""
coste_ether=""

# Iterar por cada línea del archivo de texto
while IFS= read -r linea
do
  # Si la línea contiene "Tiempo antes:"
  if [[ $linea == Tiempo\ antes:* ]]
  then
    tiempo_antes=$(echo "$linea" | cut -d " " -f 3)
  # Si la línea contiene "Tiempo después:"
  elif [[ $linea == Tiempo\ después:* ]]
  then
    tiempo_despues=$(echo "$linea" | cut -d " " -f 3)
    duracion=$(expr $tiempo_despues - $tiempo_antes)
  # Si la línea contiene "Creadas:"
  elif [[ $linea == Creadas:* ]]
  then
    # Extraer el número de evaluaciones utilizando una expresión regular
    evaluaciones=$(echo "$linea" | grep -oP '(?<=Creadas: )\d+')
  # Si la línea contiene "Coste total en gas (en wei):"
  elif [[ $linea == Coste\ total\ en\ gas* ]]
  then
    coste_gas=$(echo "$linea" | grep -oP ':\s*\K[\d]+')
  # Si la línea contiene "Coste total en ether:"
  elif [[ $linea == Coste\ total\ en\ ether:* ]]
  then
    coste_ether=$(echo "$linea" | grep -oP ':\s*\K[\d.]+')
  # Si la línea contiene "Número de bloques creados:"
  elif [[ $linea == Número\ de\ bloques\ creados:* ]]
  then
    bloques=$(echo "$linea" | cut -d " " -f 5)
  fi

  # Si todas las variables están definidas, escribimos los valores en una línea del archivo CSV
  if [[ $evaluaciones != "" && $tiempo_antes != "" && $tiempo_despues != "" && $bloques != "" && $coste_gas != "" && $coste_ether != "" ]]
  then
    duracion=$(expr $tiempo_despues - $tiempo_antes)
    echo "$evaluaciones,$coste_gas,$coste_ether,$tiempo_antes,$tiempo_despues,$duracion" >> $filename

    # Restablecer las variables para la siguiente iteración
    evaluaciones=""
    tiempo_antes=""
    tiempo_despues=""
    bloques=""
    coste_gas=""
    coste_ether=""
  fi
done < "$archivo"
