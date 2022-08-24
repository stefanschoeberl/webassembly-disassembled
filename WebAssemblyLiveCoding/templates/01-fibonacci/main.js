async function main() {
    const imports = {};
    
    const module = await WebAssembly.instantiateStreaming(
        fetch('./main.wasm'), imports);
    const instance = module.instance;
    // TODO
}
