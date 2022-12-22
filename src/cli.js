import chalk from 'chalk';
import fs from 'fs';
import pegaArquivo from './index.js';

const caminho = process.argv;
function imprimeLista(resultado, identificador = '') {
    console.log(
        chalk.yellow('lista de links'),
        chalk.black.bgGreen(identificador),
        resultado);
}
 async function processaTexto(argumentos){
    //Manda para a tela do terminal as informações que está recebendo
    const caminho = argumentos[2];
    try {
        fs.lstatSync(caminho);
    } catch (erro) {
        if (erro.code === 'ENOENT') {
            console.log('arquivo ou diretório não existe');
            return
}} 

    if(fs.lstatSync(caminho).isFile()) {
    // se recebe arquivo retorna true, ao contrário retorna falso
    const resultado = await pegaArquivo(argumentos[2]);
    imprimeLista(resultado);

} 
    else if (fs.lstatSync(caminho).isDirectory()){

    const arquivos =  await fs.promises.readdir(caminho)
     arquivos.forEach (async (nomedeArquivo)=>{
        const lista = await pegaArquivo(`${caminho}/${nomedeArquivo}`)
        imprimeLista(lista, nomedeArquivo);
    })
    console.log(arquivos)

}}
processaTexto(caminho);