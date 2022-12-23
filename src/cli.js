import chalk from 'chalk';
import fs from 'fs';
import pegaArquivo from './index.js';
import listaValidada from './http-valida.js';

const caminho = process.argv;
async function imprimeLista(valida, resultado, identificador = '') {
    if (valida) {
        console.log(
         chalk.yellow('lista validada'),
         chalk.black.bgGreen('identificador'),
         await listaValidada(resultado));
   
     } else {
       console.log(
         chalk.yellow('lista de links'),
         chalk.black.bgGreen(identificador),
         resultado);
     }
}
 async function processaTexto(argumentos){
    //Manda para a tela do terminal as informações que está recebendo
    const valida = argumentos[3] == '--valida';
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
    imprimeLista(valida, resultado);

} 
    else if (fs.lstatSync(caminho).isDirectory()){

    const arquivos =  await fs.promises.readdir(caminho)
     arquivos.forEach (async (nomedeArquivo)=>{
        const lista = await pegaArquivo(`${caminho}/${nomedeArquivo}`)
        imprimeLista(valida, lista, nomedeArquivo);
    })
    console.log(arquivos)

}}
processaTexto(caminho);