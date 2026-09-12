import sharp from "sharp";
import path from "path";

const dir = process.argv[2];
async function run() {
  for (let i = 1; i <= 8; i++) {
    const input = path.join(dir, `${i}.png`);
    const output = path.join(dir, `${i}.webp`);
    const info = await sharp(input)
      .resize({ width: 700, withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(output);
    console.log(`${i}.png -> ${i}.webp  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)}KB`);
  }
}
run();
