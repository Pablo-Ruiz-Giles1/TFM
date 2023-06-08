#!/bin/bash
#!/bin/bash

# Obtener el nombre del archivo de texto como argumento
archivo=$1

# Obtener el nombre del archivo CSV a partir del nombre del archivo de texto
filename="${archivo%.*}_datos.csv"

# Crear un archivo CSV vacío
echo "" > $filename



# Escribe las cabeceras del archivo CSV
echo "Transacción,Estado,Gas utilizado,Coste en wei,Bloque,Tiempo" >> $filename

# Itera por cada línea del archivo de texto
while IFS= read -r linea
do
  # Si la línea contiene la palabra "Transacción", es la línea de información de la transacción
  if [[ $linea == *Transacción* ]]
  then
    transaccion=$(echo "$linea" | cut -d " " -f 2)
  # Si la línea contiene la palabra "Estado", es la línea que indica el estado de la transacción
  elif [[ $linea == *Estado:* ]]
  then
    estado=$(echo "$linea" | cut -d " " -f 2)
  # Si la línea contiene la palabra "Gas utilizado", es la línea que indica el gas utilizado por la transacción
  elif [[ $linea == *Gas* ]]
  then
    gas=$(echo "$linea" | awk '{print $3}')
  # Si la línea contiene la palabra "Coste en wei", es la línea que indica el coste en wei de la transacción
  elif [[ $linea == *Coste* ]]
  then
    coste=$(echo "$linea" | awk '{print $4}')
  # Si la línea contiene la palabra "Bloque", es la línea que indica el número del bloque en el que se incluyó la transacción
  elif [[ $linea == *Bloque:* ]]
  then
    bloque=$(echo "$linea" | cut -d " " -f 2)
  # Si la línea contiene la palabra "Tiempo", es la línea que indica el tiempo que tardó en procesarse la transacción
  elif [[ $linea == *Tiempo:* ]]
  then
    tiempo=$(echo "$linea" | cut -d " " -f 2)
    # Escribimos los valores en una línea del archivo CSV
    echo "$transaccion,$estado,$gas,$coste,$bloque,$tiempo" >> $filename
  fi
done < "$archivo"
