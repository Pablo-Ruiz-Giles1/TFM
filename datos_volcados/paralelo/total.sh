#!/bin/bash

# Comprobar si se ha pasado un nombre de carpeta como parámetro
if [ "$#" -ne 1 ]; then
  echo "Uso: $0 <nombre_carpeta>"
  exit 1
fi

carpeta=${1%.txt}

# Crear la carpeta si no existe
if [ ! -d "$carpeta" ]; then
  mkdir "$carpeta"
  echo "Carpeta $carpeta creada."
else
  echo "La carpeta $carpeta ya existe."
fi

# Ejecutar volcado.sh volcado_resumen y volcado_resto.sh
./volcado_1.sh "$carpeta.txt"
./volcado_2.sh "$carpeta.txt"
./volcado_3.sh "$carpeta.txt"
./volcado_resumen_1.sh "$carpeta.txt"
./volcado_resumen_2.sh "$carpeta.txt"
./volcado_resumen_3.sh "$carpeta.txt"
./volcado_resto.sh "$carpeta.txt"

sleep 3

# Mover los archivos .txt y .csv a la carpeta creada y eliminarlos de la carpeta actual
if [ -n "$(ls *.txt *.csv 2>/dev/null)" ]; then
  mv *.txt *.csv "$carpeta"/
 # rm *.txt *.csv
  echo "Archivos .txt y .csv movidos a la carpeta $carpeta y eliminados de la carpeta actual."
else
  echo "No hay archivos .txt o .csv para mover."
fi

exit 0
