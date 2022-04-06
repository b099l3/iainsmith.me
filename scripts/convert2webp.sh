#!/usr/bin/zsh

search_dir=../public/static/images

convertImages () {
  for file in "$1"/*
  do

    filename="${file##*/}"
    filenameNoExtension="${filename%.*}"
    path="${file%/*}"
    extension="${file##*.}"

    if [ "$extension" = 'png' ] || [ "$extension" = 'jpeg' ] || [ "$extension" = 'jpg' ]
    then
      cwebp -q 100 "$file" -o "$path/$filenameNoExtension".webp
      echo "created $path/$filenameNoExtension.webp"
    elif [ "$extension" = 'gif' ] 
    then
      gif2webp -q 100 "$file" -o "$path/$filenameNoExtension".webp
      echo "created $path/$filenameNoExtension.webp"
    elif [ -d "${file}" ] 
    then
      convertImages $file
    else
      if [ "$extension" != 'webp' ] 
      then
        echo "$extension is NOT supported"
      # else
        # echo "$file skipping, already webp"
      fi
    fi
  done
}

convertImages ../public/static/images
