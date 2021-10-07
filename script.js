function setElement(title = 'Insira um título', text = 'Insira um texto') {
    let elementTitle = title
    let elementText = text
    let element = 
        `<li class="MuiListItem-root MuiListItem-gutters"><div class="MuiListItemAvatar-root"><div class="MuiAvatar-root MuiAvatar-circular MuiAvatar-colorDefault"><svg class="MuiSvgIcon-root" focusable="false" viewBox="0 0 172 172" aria-hidden="true"></path><g fill="#fff"><path d="M20.64,3.44v13.76c0,5.65719 4.66281,10.32 10.32,10.32h6.88v23.1125c0,10.34688 5.14656,20.06219 13.76,25.8l14.405,9.5675l-14.405,9.5675c-8.61344,5.73781 -13.76,15.45313 -13.76,25.8v23.1125h-6.88c-5.65719,0 -10.32,4.66281 -10.32,10.32v13.76h130.72v-13.76c0,-5.65719 -4.66281,-10.32 -10.32,-10.32h-6.88v-23.1125c0,-10.34687 -5.14656,-20.06219 -13.76,-25.8l-14.405,-9.5675l14.405,-9.5675c8.61344,-5.73781 13.76,-15.45312 13.76,-25.8v-23.1125h6.88c5.65719,0 10.32,-4.66281 10.32,-10.32v-13.76zM27.52,10.32h116.96v6.88c0,1.94844 -1.49156,3.44 -3.44,3.44h-110.08c-1.94844,0 -3.44,-1.49156 -3.44,-3.44zM44.72,27.52h82.56v23.1125c0,8.04906 -4.04469,15.53375 -10.75,19.995l-18.705,12.47l-4.3,2.9025l4.3,2.9025l18.705,12.47c6.70531,4.47469 10.75,11.94594 10.75,19.995v23.1125h-10.535c-2.41875,-24.95344 -30.745,-34.4 -30.745,-34.4c0,0 -28.24562,9.98406 -30.745,34.4h-10.535v-23.1125c0,-8.04906 4.04469,-15.52031 10.75,-19.995l18.705,-12.47l4.3,-2.9025l-4.3,-2.9025l-18.705,-12.47c-6.70531,-4.46125 -10.75,-11.94594 -10.75,-19.995zM58.48,51.6c0,17.50906 27.52,24.08 27.52,24.08c0,0 27.52,-6.93375 27.52,-24.08zM30.96,151.36h110.08c1.94844,0 3.44,1.49156 3.44,3.44v6.88h-116.96v-6.88c0,-1.94844 1.49156,-3.44 3.44,-3.44z"></path></g></g></svg></div></div><div class="MuiListItemText-root MuiListItemText-multiline"><span class="MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock">${elementTitle} </span><p class="MuiTypography-root MuiListItemText-secondary MuiTypography-body2 MuiTypography-colorTextSecondary MuiTypography-displayBlock">${elementText}</p></div></li>`
    document.querySelectorAll('ul.MuiList-root')[1].innerHTML += element
}

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
    console.log(`${total}`)
    setElement(undefined, total)
}

function loadVerify() {
    window.addEventListener("load", () => {
    if (window.location.pathname.indexOf(urlKultivi) != -1) {
        verify()
    } else {
        console.log('Site diferente')
    }
})
}

function verify() {
    if(document.querySelector("#root > div > main > div.MuiBox-root.jss65 > div > div > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12.MuiGrid-grid-md-8.MuiGrid-grid-lg-6 > div > span.MuiSkeleton-root.MuiSkeleton-rect.MuiSkeleton-wave") == null) {
        totalWorkload()
    } else {
        setTimeout(verify, 500)
    }
}

let lastUrl = location.href; 
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    if (window.location.hostname == 'app.kultivi.com' && window.location.pathname.indexOf('/dashboard/course/') != -1) {
        window.onload = setTimeout(verify, 500)
    }
  }
}).observe(document, {subtree: true, childList: true});