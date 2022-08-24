async function main() {
    const data = [5, 30, 42, 2, 16];

    const arrayMemory = new WebAssembly.Memory({initial: 1});
    const array = new Uint8Array(arrayMemory.buffer);
    const arraySizeGlobal = new WebAssembly.Global(
        {value: 'i32'}, data.length);
    for (let i = 0; i < data.length; i++) {
        array[i] = data[i];
    }

    const imports = {
        js: {
            array: arrayMemory,
            length: arraySizeGlobal,
            println: (value) => {
                demoLog(value);
            }
        }
    };
    
    const module = await WebAssembly.instantiateStreaming(
        fetch('./main.wasm'), imports);
    const instance = module.instance;
    instance.exports.main();
}
