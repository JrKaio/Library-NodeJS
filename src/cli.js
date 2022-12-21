import chalk from 'chalk';
import pegaArquivo from './index.js';

const caminho = process.argv;
 async function processaTexto(caminho){
    //Manda para a tela do terminal as informações que está recebendo
    const resultado = await pegaArquivo(caminho[2]);
    console.log(chalk.yellow('Lista de links'), resultado)
} 
processaTexto(caminho);