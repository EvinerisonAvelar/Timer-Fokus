const html = document.querySelector ('html')
const focoBt = document.querySelector ('.app__card-button--foco')
const curtoBt = document.querySelector ('.app__card-button--curto')
const longoBt = document.querySelector ('.app__card-button--longo')
const startPauseBt = document.querySelector('#start-pause')
const botaoIniciar = document.querySelector ('.app__card-primary-button')
const botoes = document.querySelectorAll ('.app__card-button')
const musicaFocoInput = document.querySelector ('#alternar-musica')
const comecarEPausarBt = document.querySelector ('#start-pause span')
const imagemPlayPause = document.querySelector ('.app__card-primary-butto-icon')
const localDoTempo = document.querySelector('#timer')

const musica = new Audio('/sons/luna-rise-part-one.mp3')
musica.loop = true
const audioPlay = new Audio('/sons/play.wav')
const audioPause = new Audio('/sons/pause.mp3')
const audioTempoFinalizado = new Audio('/sons/beep.mp3')


const displayTempo = document.querySelector ('.app__card-timer')
const banner = document.querySelector ('.app__image')
const titulo = document.querySelector ('.app__title')

let tempoDecoridoEmSegundos = 1500
let intervaloId = null


musicaFocoInput.addEventListener('change', () =>{

    if (musica.paused) {
        musica.play()
    } else {
        musica.pause() 
    }
})


focoBt.addEventListener('click', () => {
    tempoDecoridoEmSegundos = 1500
    AlterarContexto('foco')
    focoBt.classList.add('active')
    

})

curtoBt.addEventListener('click', () => {
    tempoDecoridoEmSegundos = 300
    AlterarContexto('descanso-curto')
    curtoBt.classList.add('active')
    
    
})

longoBt.addEventListener('click', () => {
    tempoDecoridoEmSegundos = 900
    AlterarContexto('descanso-longo')
    longoBt.classList.add('active')
    
})


function AlterarContexto (contexto){
    mostrarNaTela()
    botoes.forEach( function(contexto){
        contexto.classList.remove('active')
    });

    html.setAttribute('data-contexto',contexto)
    banner.setAttribute('src',`/imagens/${contexto}.png`)

   
    switch (contexto) {
        case 'foco': 
        titulo.innerHTML = 
                `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;  

        case 'descanso-curto': 
        titulo.innerHTML = 
                `Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break;   
            
        case 'descanso-longo': 
        titulo.innerHTML = 
                `Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>`
        break;      
    
        default:
            break;
    }
}

const contagemRegressiva= () => {
    tempoDecoridoEmSegundos -= 1
    mostrarNaTela()
    if(tempoDecoridoEmSegundos <= 0){
        alert('O tempo acabou')
        audioTempoFinalizado.volume = 0.1
        audioTempoFinalizado.play()
        Parar()
        return
    }
    
    
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar () {
    if(intervaloId){
        audioPause.volume = 0.3
        audioPause.play()
        Parar()
        return
    }else{
        audioPlay.volume = 0.3
        audioPlay.play()
    }
    
    intervaloId = setInterval(contagemRegressiva,1000)
    comecarEPausarBt.textContent = 'Pausar'
    imagemPlayPause.setAttribute('src', `/imagens/pause.png`)
   
}

function Parar () {
    clearInterval(intervaloId)
    comecarEPausarBt.textContent = 'Começar'
    imagemPlayPause.setAttribute ('src', `/imagens/play_arrow.png`)
    intervaloId = null
}

function mostrarNaTela (){
    const tempo = new Date(tempoDecoridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute:'2-digit', second: '2-digit'})
    localDoTempo.innerHTML = `${tempoFormatado}`
} 
    
mostrarNaTela()


    





/*
1) Alterando textos e ícones dinamicamente
A tarefa consiste em utilizar JavaScript para implementar uma lógica que altere o texto e o ícone inserido no botão que inicia e pausa o temporizador do projeto Fokus. Inicialmente ele tem escrito “Começar” com ícone de play, implemente uma lógica que altere o texto para “Pausar” com ícone de pause, sempre que o temporizador for iniciado.

2) Mostrando temporizador na tela
Até esta etapa do projeto Fokus, é possível mostrar o tempo no console do navegador. Sua próxima missão é mostrar o temporizador na tela, na div com o ID #timer. Logo, utilize o método innerHTML para inserir elementos na tela e o objeto do JavaScript new Date.

3) Formatando minuto/segundo com JavaScript
Já é possível mostrar o temporizador na tela, entretanto, o formato de minutos e segundos precisa ser configurado. Sua missão nessa etapa é configurar o formato para “00:00”, onde os minutos aparecem no lado esquerdo e os segundos no lado direito.

4) Alterando o cronômetro do temporizador
Você está na última etapa de desenvolvimento do projeto Fokus. O próximo passo é implementar o contexto de temporizador para cada cronômetro para cada formato:

Ao clicar no botão “Focus” o temporizador deve ser em 1500 segundos;
Ao clicar no botão “Descanso curto” o temporizador deve ser em 300 segundos;
Ao clicar no botão “Descanso longo” o temporizador deve ser em 900 segundos.
Bom trabalho!
*/