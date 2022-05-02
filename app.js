// Variables

const $input = document.getElementById("input")
const $btn = document.getElementById("btn")
const $btnSortear = document.getElementById("sortear")
const $cantPlayer = document.getElementById("cant-player")
const $pantalla = document.getElementById("pantalla")
const $ul = document.querySelector(".lista-player")
const $ganadores = document.querySelector(".ganadores")
let nombres = []
let contador = 0
let ganadores = [];


// AddEventListeners

$btn.addEventListener("click", e => {
    e.preventDefault()
    agregar()

})
document.addEventListener("DOMContentLoaded", () => {
    nombres = JSON.parse(localStorage.getItem("arreglo")) || []
    imprimirHtml(nombres)
})

$btnSortear.addEventListener("click", e => {
    e.preventDefault()
    let ganador;
    setTimeout(() => {
        for (let i = 0; i < $cantPlayer.value; i++) {
            ganador = ObtenerGanador(nombres)
            if (ganador != undefined) {
                contador++
                imprimirHtmlGanador(ganador)
                ganadores.push(ganador);
            }
        }
        // imprimirHtmlGanadores(ganadores)

        $cantPlayer.value = ""
    }, 500);
    $ul.textContent = ""
})


// Desordenar el array.

function desordenar(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const x = Math.floor(Math.random() * (i + 1))
        const temporal = array[i]

        array[i] = array[x]
        array[x] = temporal
    }
    return array
}


// Obtenemos al ganador 

function ObtenerGanador(obj) {
    let newArr = desordenar(obj)
    let ganador;
    if (newArr.length !== 0) {
        ganador = newArr.pop()
    } else {
        console.log("No existen mas participantes")
    }
    localStorage.clear()
    return ganador;


}


// Vamos agregando partipantes al array
const agregar = () => {
    let name = $input.value.toUpperCase()
    nombres.push(name)
    $input.value = ""
    imprimirHtml(nombres)
    sincronizarLocalStorage(nombres)
    console.log(nombres)
}


// Imprimos en HTML apartir de un array.
const imprimirHtml = (arr) => {
    limpiarHtml()
    if (arr.length > 0) {
        arr.forEach(ele => {
            let $li = document.createElement("li")

            $li.innerHTML = ele
            $ul.appendChild($li)
        })
    }


}

// Se limpia el HTML en caso de que haya algun elemento innecesario
function limpiarHtml() {
    while ($ul.firstChild) {
        $ul.removeChild($ul.firstChild)
    }
}


// Sincronizar con el localStorage
const sincronizarLocalStorage = (obj) => {
    localStorage.setItem("arreglo", JSON.stringify(obj))
}


// Imprimir Ganadores en html

function imprimirHtmlGanadores(arr) {
    arr.forEach(ele => {
        let p = document.createElement("p")
        p.textContent = `El ganador ${contador} es : ${ele}`
        $ganadores.appendChild(p)
    })

}

function imprimirHtmlGanador(win) {
    let p = document.createElement("p")
    p.style.display = "inline-block"
    p.innerHTML = `El ganador ${contador} es <strong>${win}</strong> </br>`
    $ganadores.appendChild(p)

}
