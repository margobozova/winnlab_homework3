const fs = require('fs');

const THE_FILE = `${process.env.PWD}/files/files`;

const writePromise = (THE_FILE, str) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(THE_FILE, str, (err) => {
      if (err) {
        reject(err);
      } else resolve('Hello, i am new file');
    });
  });
};

const copyPromise = (fromFile, destFile) => {
  return new  Promise((resolve, reject) => {
    const fr = fs.createReadStream(fromFile);
    const to = fs.createWriteStream(destFile);

    resolve(fr.pipe(to)
      .on('finish', () => console.log('done')));

      reject('Oooops! we have a problem');
    });
};

const readPromise = (THE_FILE) => {
  return new Promise((resolve, reject) => {
    fs.readFile(THE_FILE, 'utf-8', (err, data) => {
      resolve(data);
      reject(err);
    })});
};

async function writeCopyRead() {
  await writePromise(THE_FILE, "Hellooo!").then(result => console.log(result));
  await fs.open(THE_FILE, 'r', async (err) => {
    if (err) {
      console.log('OPEN ERR:', err);
      return;
    }

    await copyPromise('files/files', 'files/NEW_FILE').then(result => console.log(result));

    const NEW_FILE = `${process.env.PWD}/files/NEW_FILE`;

    await readPromise(NEW_FILE).then(result => console.log(result));
  });
}

writeCopyRead();
