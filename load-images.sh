#!/bin/bash

for dir in public/{concepts,illustrations}; do
  if [ -d "$dir" ]; then
    echo "Loading images from directory: $dir"
    # first count how many images that aleady fit pattern /[0-9]*.png/
    # this is the count that the new images will iterate on
    IMAGE_COUNT=$(find "$dir" -type f -regex ".*/[0-9]*\.png" | wc -l)
    echo "Current image count in $dir: $IMAGE_COUNT"
    for img in "$dir"/*.{jpg,jpeg,png,gif}; do
      if [ -f "$img" ]; then
        echo "Processing image: $img"
        # if the image is not already in the pattern /[0-9]*.png/, then convert it to that pattern
        if [[ ! "$img" =~ [0-9]+\.png$ ]]; then
          # increment the image count
          IMAGE_COUNT=$((IMAGE_COUNT + 1))
          # convert the image to png and rename it to the pattern /[0-9]*.png/
          new_img="$dir/$IMAGE_COUNT.png"
          echo "Converting $img to $new_img"
          cp "$img" "$new_img"
          # remove the original image
          rm "$img"
        else
          echo "Image $img already fits the pattern, skipping."
        fi
      fi
    done
  else
    echo "Directory not found: $dir" echo "Directory not found: $dir"
  fi
done
