import { NodeIO } from "@gltf-transform/core";
import { textureCompress } from "@gltf-transform/functions";
import sharp from "sharp";

// Load the GLB/glTF file
const io = new NodeIO();
const document = await io.read("input.glb"); // Replace with your input file

// Apply WebP compression
await document.transform(
  textureCompress({
    encoder: sharp,
    targetFormat: "webp", // Options: 'webp', 'jpeg', 'png'
    quality: 100, // WebP quality (0-100)
    // slots: ["baseColor"], // Optional: Target specific textures
    resize: [1024, 1024], // Optional: Resize textures (e.g., 1024x1024)
  })
);

// Save the compressed GLB
await io.write("output.glb", document); // Replace with your output path
