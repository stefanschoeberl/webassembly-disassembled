async function main() {
    const imports = {
        js: {
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
