async function main() {
    const data = [5, 30, 42, 2, 16];

    // TODO

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
