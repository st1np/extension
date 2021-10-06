const DOM = {
    createNewElements: (element) => {
        const elements = {}
    }
}

var cargaHoraria = () => {
    let horas
    let minutos
    let totalHoras = 0
    let totalMinutos = 0 
    let i = 0
    let tempos = document.querySelectorAll('.MuiChip-label')
    for(tempo of tempos) {
        if(i == 0) {
        } else {
            horas = parseFloat(tempo.textContent.substr(0,2))
            totalHoras += horas
            minutos = parseFloat(tempo.textContent.substr(3,5))
            totalMinutos += minutos
        }
        i++
    }
    const total = (totalMinutos / 60 + totalHoras).toFixed(2)
    console.log(`\nHoras: ${Math.trunc(totalMinutos / 60 + totalHoras)}\nMinutos: ${total.substr(-2) * 60 / 100}\nCarga horária total: ${total}\n`)
    document.querySelectorAll('ul.MuiList-root')[1].innerHTML += DOM.createNewElement(DOM.newElements([0], total))
}

var urlKultivi = '/dashboard/course/'

function loadVerify() {
    window.addEventListener("load", () => {
    if (window.location.pathname.indexOf(urlKultivi) != -1) {
        verify()
    } else {
        console.log('Site diferente')
    }
})
}

loadVerify()

function verify() {
    if(document.querySelector("#root > div > main > div.MuiBox-root.jss65 > div > div > div.MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12.MuiGrid-grid-md-8.MuiGrid-grid-lg-6 > div > span.MuiSkeleton-root.MuiSkeleton-rect.MuiSkeleton-wave") == null) {
        cargaHoraria()
    } else {
        setTimeout(verify, 500)
    }
}

let lastUrl = location.href; 
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    onUrlChange();
    if (window.location.pathname.indexOf(urlKultivi) != -1) {
        window.onload = setTimeout(verify, 500)
    }
  }
}).observe(document, {subtree: true, childList: true});
 
 
function onUrlChange() {
  alert('URL changed!', location.href);
}