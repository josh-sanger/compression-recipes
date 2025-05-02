# Compression Recipies
*TLDR; [ffmpeg](https://ffmpeg.org/) is the GOAT.*

## Table of Contents

- [Audio Compression](#audio-compression)
  - [Mild Compression](#mild-compression)
  - [Aggressive Compression](#agressive-compression)
  - [Very Aggressive Compression](#very-agression-compression)
- [Image Compression](#image-compression)
  - [Batch Compression](#batch-compression)
  - [Single Compression](#single-compression)
  - [Controlling Quality](#controlling-quality)
- [GLB Compression (WebP)](#glb-compression-webp)
  - [How to Use](#how-to-use)
 
<hr />

## Audio compression

The right compression depends on what is happening in the audio. Try out these recipies and find the one that has the smallest file size with the least quality loss.

Tests were ran with a [sample size audio](https://cdn.shopify.com/s/files/1/0711/3431/4719/files/Heartstrings-and-Bargain-Dreams.mp3?v=1744725103) of `4.2mb`.

### Mild compression

(output size `3mb` or `~28.5%` savings). [Audio here](https://cdn.shopify.com/s/files/1/0711/3431/4719/files/compressed.mp3?v=1744725179)

```bash
ffmpeg -i input.mp3 -codec:a libmp3lame -q:a 4 output.mp3
```

### Agressive compression

(output size `2.5mb` or `~40.5%` savings) [Audio here](https://cdn.shopify.com/s/files/1/0711/3431/4719/files/more-agressive.mp3?v=1744725178)

```bash
ffmpeg -i input.mp3 -codec:a libmp3lame -q:a 5 output.mp3
```

### Very Agression compression

(output size `1.4mb` or `~66.6%` savings) [Audio here](https://cdn.shopify.com/s/files/1/0711/3431/4719/files/very-agressive.mp3?v=1744725178)

```bash
ffmpeg -i input.mp3 -codec:a libmp3lame -ar 22050 -b:a 64k output.mp3
```
<hr />

## Image compression

Converting to WEBP is the way to go here now that all browsers support it.

### Batch compression
Test ran with one of the album back covers from All Editions. [Original image](https://github.com/user-attachments/assets/90c793d2-b2d0-47d2-b462-f022468c4ade) was `1.3mb` and [webp version](https://cdn.shopify.com/s/files/1/0711/3431/4719/files/Connect.webp?v=1744711306) ended up being `118kb`!! 

Put your images in the a folder, navigate to the folder and run the following (replace `.jpg` with file extension):

```bash
for i in *.jpg; do ffmpeg -i "$i" -c:v libwebp "${i%.jpg}.webp"; done;
```

### Single compression

(Replace `.jpg` with the file extension)

```bash
ffmpeg -i input.jpg -c:v libwebp output.webp
```

### Controlling quality

You can control the quality of the output as well (Replace `.jpg` with the file extension and replace `100` with what % of quality you wish to maintain)

```bash
ffmpeg -i input.jpg -c:v libwebp -q:v 100 output.webp
```
<hr />

## GLB compression (WebP)
This was especially useful for baked in textures. The wall glb from All Editions went from `1.6mb` down to `160kb`!!!

### How to use

1. Navigate to the compress-glb directory:

```bash
cd src/compress-glb
```

2. Install dependencies:

```bash
npm install
```

3. Place your input GLB file in the directory or update the input path in the script.

4. Run the compression script:

```bash
node compress-webp.js
```

You can customize the compression by editing `compress-webp.js`:

- Change the input/output file paths
- Adjust WebP quality (0-100)
- Set target texture size with `resize` option
- Target specific texture slots with the `slots` option

See [compress-glb source code](src/compress-glb/compress-webp.js) for the implementation.
