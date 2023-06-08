#!/bin/bash

# Obtener el nombre del archivo de texto como argumento
archivo=$1

# Obtener el nombre del archivo CSV a partir del nombre del archivo de texto
filename="${archivo%.*}_resumen3.csv"

# Crear una carpeta con el nombre del archivo sin extensión
carpeta="${archivo%.*}"
mkdir $carpeta


# Escribir las cabeceras del archivo CSV
echo "Transacción,Gas utilizado,Coste en wei,Duración" > $filename


# Variables para almacenar los valores de las transacciones
antes=""
despues=""
transaccion=""
gas=""
coste=""
duracion=""
transacciones=0


# Leer el archivo de texto línea por línea
while read linea
do
  # Si la línea contiene la palabra "Antes", es la línea que indica el tiempo antes de la transacción
  if [[ $linea == *Antes:* ]]
  then
    antes=$(echo "$linea" | cut -d " " -f 2)
  # Si la línea contiene la palabra "Después", es la línea que indica el tiempo después de la transacción
  elif [[ $linea == *Posterior:* ]]
  then
    despues=$(echo "$linea" | cut -d " " -f 2)
    
    # Si las variables antes y después tienen valores, calcular la duración y escribir los valores de la transacción en el archivo CSV
    if [[ $antes != "" && $despues != "" ]]
    then
      duracion=$((despues - antes))
      echo "$transaccion,$gas,$coste,$duracion" >> $filename
      
      # Reiniciar los valores de las variables para la siguiente transacción
      antes=""
      despues=""
      transaccion=""
      gas=""
      coste=""
      duracion=""
      
      # Aumentar el contador de transacciones
      transacciones=$((transacciones + 1))
    fi
    
  # Si la línea contiene la palabra "Transacción", es la línea de información de la transacción
  elif [[ $linea == *Transacción* ]]
  then
    transaccion=$(echo "$linea" | cut -d " " -f 2)
  # Si la línea contiene la palabra "Gas utilizado", es la línea que indica el gas utilizado por la transacción
  elif [[ $linea == *Gas* ]]
  then
    gas=$(echo "$linea" | awk '{print $3}')
  # Si la línea contiene la palabra "Coste en wei", es la línea que indica el coste en wei de la transacción
  elif [[ $linea == *Coste* ]]
  then
    coste=$(echo "$linea" | awk '{print $4}')
  fi

done < "$archivo"


# Copiar el archivo de texto y el archivo CSV a la carpeta
cp $archivo $carpeta 2>/dev/null
cp $filename $carpeta 2>/dev/null

# Eliminar el archivo de texto y el archivo CSV originales
rm $archivo
rm $filename
