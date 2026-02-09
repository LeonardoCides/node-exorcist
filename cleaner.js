const fs = require("fs");
const path = require("path");

//CONFIGURACOES
const PASTA_ALVO = '/logs'; //a pasta que sera limpa
const DIAS_LIMITE = 0; //arquivos mais velhos que isso seram deletados

async function LimparArquivos() {
    const agora = Date.now();
    const msPorDia = 24 * 60 * 60 * 1000;
    const limiteEmMs = DIAS_LIMITE * msPorDia;

    console.log(`Iniciando a faxina na pasta : ${PASTA_ALVO}`);
    try {
        const arquivos = fs.readdirSync(PASTA_ALVO);
        arquivos.forEach(arquivo => {
            const caminhoCompleto = path.join(PASTA_ALVO, arquivo);
            const stats = fs.statSync(caminhoCompleto);

            const idadeDoArquivo = agora - stats.mtimeMs;

            if (idadeDoArquivo > limiteEmMs){
                fs.unlink(caminhoCompleto); //Deleta arquivo
                 console.log(`Removido: ${arquivo} (mais de ${DIAS_LIMITE} dias)`);
            }
        });
        console.log("Faxina concluida!");
        
    } catch (error) {
        console.log("Erro ao acessar a pasta", error.message);
        
    }
}
LimparArquivos()
