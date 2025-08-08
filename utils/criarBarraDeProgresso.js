  const formatTime = require("./formatTime");

  function criarBarraDeProgresso(currentTrack, currentTime) {
    const comprimentoDaBarra = 15; // Comprimento total da barra em caracteres
    let playbackDuration = currentTime
    const durationInSec = currentTrack.duration / 1000;
    if (playbackDuration === 0){
        playbackDuration = 1;
    }
    
    let barraDeProgresso;

    const proporcaoTocada = playbackDuration / (durationInSec * 1000);
    let quantidadeIndicadores = Math.round(comprimentoDaBarra * proporcaoTocada);

    if (quantidadeIndicadores === 0) {
    quantidadeIndicadores = 1;
    }

    const indicadorTocado = '🔘';
    const indicadorVazio = '▬';

    barraDeProgresso = `(${formatTime(playbackDuration)}) ` + indicadorVazio.repeat(quantidadeIndicadores - 1) + indicadorTocado + indicadorVazio.repeat(comprimentoDaBarra - quantidadeIndicadores) + ` (${formatTime(durationInSec * 1000)})`;

  
    return barraDeProgresso;
  }

  module.exports = criarBarraDeProgresso;