async function asyncFilter(arr, predicate) {
    const included = await Promise.all(arr.map(predicate));
    return arr.filter((_v, index) => included[index]);
} 

async function main() {
    const promisify = require('util').promisify;
    const fs = {
        readdir: promisify(require('fs').readdir),
        readFile: promisify(require('fs').readFile),
        stat: promisify(require('fs').stat),
    };
    
    const express = require('express');
    const wabt = await require('wabt')();

    const app = express();
    const port = 3000;
    const examplesFolder = process.argv[2];

    app.set('view engine', 'ejs');

    app.use('/css', express.static('node_modules/bootstrap/dist/css'));
    app.use('/js', express.static('node_modules/bootstrap/dist/js'));
    app.use('/icons', express.static('node_modules/bootstrap-icons/font'));

    app.use('/examples', express.static(examplesFolder));

    app.get('/', async (req, res) => {
        const files = await fs.readdir(examplesFolder);
        const directories = await asyncFilter(files, async (file) => {
            return (await fs.stat(examplesFolder + '/' + file)).isDirectory();
        });
        const demos = directories.map((file) => {
            return {link: `/examples/${file}`, title: file};
        });
        res.render('index', {demos});
    });

    app.get('/examples/:example', (req, res) => {
        res.render('example', {title: req.params.example});
    });

    app.get('/examples/:example/:module.wasm', async (req, res) => {
        try {
            const example = req.params.example;
            const module = req.params.module;
            const watFile = examplesFolder + '/' + example + '/' + module + '.wat';
            const fileContents = await fs.readFile(watFile);
            const wasmModule = wabt.parseWat(watFile, fileContents);
            const result = wasmModule.toBinary({});
            console.log('Converted wat to wasm');
            if (result.log !== '') {
                console.log(result.log);
            }
            res.writeHeader(200, {'Content-Type': 'application/wasm'});
            res.write(result.buffer);
            res.end();
        } catch (err) {
            console.error(err);
            res.sendStatus(404);
        }
    });
    
    app.listen(port, () => {
        console.log(`Devserver listening on port ${port}`);
        console.log(`Examples folder: ${examplesFolder}`);
    })
}

main();