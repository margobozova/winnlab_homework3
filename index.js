const fs = require('fs');

const THE_FILE = `${process.env.PWD}/files/files`;

const writePromise = new Promise((resolve, reject) => {
  resolve((THE_FILE, str) =>  fs.writeFile(THE_FILE, str, (err) => {
    reject(err);
  }));
});

const copyPromise = new  Promise((resolve, reject) => {

  resolve((fromFile, destFile) => {
    const fr = fs.createReadStream(fromFile);
    const to = fs.createWriteStream(destFile);

    return fr.pipe(to)
      .on('finish', () => console.log('done'))
  });

  reject('Oooops! we have a problem');
});

const readPromise = new Promise((resolve, reject) => {
  resolve((THE_FILE) => fs.readFile(THE_FILE, 'utf-8', (err, data) => {
    console.log(data);
    resolve(err);
  }));
});

async function writeCopyRead() {
  await writePromise.then(result => result(THE_FILE, "Hellooo!"), error => console.log(`Error: ${error}`));
  await fs.open(THE_FILE, 'r', async (err) => {
    if (err) {
      console.log('OPEN ERR:', err);
      return;
    }

    await copyPromise.then(result => result('files/files', 'files/NEW_FILE'));

    const NEW_FILE = `${process.env.PWD}/files/NEW_FILE`;

    await readPromise.then(result => result(NEW_FILE), err => console.log(err, "Error read"));
  });
}

writeCopyRead();
