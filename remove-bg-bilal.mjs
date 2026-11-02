import { AutoModel, AutoProcessor, RawImage, env } from '@xenova/transformers';
import { PNG } from 'pngjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

env.allowLocalModels = false;

async function main() {
  console.log('Loading AI background removal model (briaai/RMBG-1.4)...');
  const model_id = 'briaai/RMBG-1.4';
  const model = await AutoModel.from_pretrained(model_id);
  const processor = await AutoProcessor.from_pretrained(model_id);

  console.log('Reading input image: assets/bilal-photo.jpg...');
  const inputPath = path.join(__dirname, 'assets', 'bilal-photo.jpg');
  const image = await RawImage.read(inputPath);

  console.log(`Image loaded: ${image.width}x${image.height}, channels: ${image.channels}`);
  console.log('Processing segmentation mask...');
  const { pixel_values } = await processor(image);
  const { output } = await model({ input: pixel_values });

  console.log('Generating high-resolution alpha mask...');
  const mask = await RawImage.fromTensor(output[0].mul(255).to('uint8')).resize(image.width, image.height);

  console.log('Creating PNG with alpha channel...');
  const totalPixels = image.width * image.height;
  const png = new PNG({ width: image.width, height: image.height });

  const channels = image.channels; // 3 or 4
  for (let i = 0; i < totalPixels; i++) {
    const srcIdx = i * channels;
    const dstIdx = i * 4;
    png.data[dstIdx] = image.data[srcIdx];         // R
    png.data[dstIdx + 1] = image.data[srcIdx + 1]; // G
    png.data[dstIdx + 2] = image.data[srcIdx + 2]; // B
    png.data[dstIdx + 3] = mask.data[i];          // Alpha from mask
  }

  const outputPath = path.join(__dirname, 'assets', 'bilal-portrait.png');
  const outStream = fs.createWriteStream(outputPath);
  
  await new Promise((resolve, reject) => {
    png.pack().pipe(outStream)
      .on('finish', resolve)
      .on('error', reject);
  });

  console.log('SUCCESS! Cutout saved to:', outputPath);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
