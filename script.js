/////////////
// Cria e seta um elemento com mensagem personalizada na página, seguindo o padrão de design do site.
function setElement(title = 'Insira um título', text = 'Insira um texto') {
    let elementTitle = title
    let elementText = text
    let element = 
        `<li class="MuiListItem-root MuiListItem-gutters"><div class="MuiListItemAvatar-root"><div class="MuiAvatar-root MuiAvatar-circular MuiAvatar-colorDefault"><svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 172 172" aria-hidden="true"></path><g fill="#fff"><path d="M20.64,3.44v13.76c0,5.65719 4.66281,10.32 10.32,10.32h6.88v23.1125c0,10.34688 5.14656,20.06219 13.76,25.8l14.405,9.5675l-14.405,9.5675c-8.61344,5.73781 -13.76,15.45313 -13.76,25.8v23.1125h-6.88c-5.65719,0 -10.32,4.66281 -10.32,10.32v13.76h130.72v-13.76c0,-5.65719 -4.66281,-10.32 -10.32,-10.32h-6.88v-23.1125c0,-10.34687 -5.14656,-20.06219 -13.76,-25.8l-14.405,-9.5675l14.405,-9.5675c8.61344,-5.73781 13.76,-15.45312 13.76,-25.8v-23.1125h6.88c5.65719,0 10.32,-4.66281 10.32,-10.32v-13.76zM27.52,10.32h116.96v6.88c0,1.94844 -1.49156,3.44 -3.44,3.44h-110.08c-1.94844,0 -3.44,-1.49156 -3.44,-3.44zM44.72,27.52h82.56v23.1125c0,8.04906 -4.04469,15.53375 -10.75,19.995l-18.705,12.47l-4.3,2.9025l4.3,2.9025l18.705,12.47c6.70531,4.47469 10.75,11.94594 10.75,19.995v23.1125h-10.535c-2.41875,-24.95344 -30.745,-34.4 -30.745,-34.4c0,0 -28.24562,9.98406 -30.745,34.4h-10.535v-23.1125c0,-8.04906 4.04469,-15.52031 10.75,-19.995l18.705,-12.47l4.3,-2.9025l-4.3,-2.9025l-18.705,-12.47c-6.70531,-4.46125 -10.75,-11.94594 -10.75,-19.995zM58.48,51.6c0,17.50906 27.52,24.08 27.52,24.08c0,0 27.52,-6.93375 27.52,-24.08zM30.96,151.36h110.08c1.94844,0 3.44,1.49156 3.44,3.44v6.88h-116.96v-6.88c0,-1.94844 1.49156,-3.44 3.44,-3.44z"></path></g></g></svg></div></div><div class="MuiListItemText-root MuiListItemText-multiline"><span class="MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock">${elementTitle} </span><p class="MuiTypography-root MuiListItemText-secondary MuiTypography-body2 MuiTypography-colorTextSecondary MuiTypography-displayBlock">${elementText}</p></div></li>`
    document.querySelectorAll('ul.MuiList-root')[1].innerHTML += element
}

/////////////
// Pega as horas e minutos dentro da página e faz as contas, retornando setElement com o total de horas e a mensagem personalizado, para criação do elemento na página.
var totalWorkload = () => {
    let horas = 0,
    minutos = 0,
    i = 0,
    totalMinutos = 0
    let tempos = document.querySelectorAll('.MuiChip-label')
    for(tempo of tempos) {
        if(i == 0) {
        } else {
            horas += parseInt(tempo.textContent.substr(0,2))
            minutos += parseInt(tempo.textContent.substr(3,5))
        }
        i++
    }
    totalMinutos = minutos + horas * 60
    const total = `${Math.trunc(totalMinutos / 60)}:${totalMinutos % 60}`

    setElement(`${total} horas`, `De aulas prontas para serem assistidas.`)
}

/////////////
// Verifica algumas coisas para executar o script
function verify() {
    /////////////
    // Executa quando a página carregar.
    if (window.location.hostname == 'app.kultivi.com' && window.location.pathname.indexOf('/dashboard/course/') != -1) {
        if(document.querySelector("#root div main div div div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12.MuiGrid-grid-md-8.MuiGrid-grid-lg-6 div span.MuiSkeleton-root.MuiSkeleton-rect.MuiSkeleton-wave") == null && document.querySelector("#root div main div div div.MuiGrid-root.MuiGrid-container.MuiGrid-spacing-xs-3 div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12.MuiGrid-grid-md-4 div ul li:nth-child(1)") != null) {
            totalWorkload()
        /////////////
        // Loop verificando se a página carregou.
        } else {
            setTimeout(verify, 500)
        }
    }
}

window.onload = verify  // Verifica quando a página carrega pela primeira vez

/////////////
// Observa se há navegação dentro do mesmo domínio e chama o verify || TRECHO DE CÓDIGO COPIADO, EU NÃO ESTAVA ACHANDO UMA SOLUÇÃO
let lastUrl = location.href; 
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    verify()
  }
}).observe(document, {subtree: true, childList: true});