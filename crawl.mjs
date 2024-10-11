import { get } from 'https';
import { createWriteStream, readFileSync } from 'fs';
import { join } from 'path'

async function g(url, dst) {
  get(url, (response) => {
    const file = createWriteStream(dst);
    response.pipe(file);

    file.on('finish', () => {
      file.close();
      console.log('Download completed!');
    });
  }).on('error', (err) => {
    console.error('Error downloading image:', err.message);
  });
}

const j = JSON.parse(readFileSync('udon2.json'))
for (const [name, url] of Object.entries(j)) {
  console.log(`downloading ${name} from ${url}...`)
  g(url, join('web', 'img', 'udon', name + '.png'))
}
