const generateButton = document.querySelector('.generate_button')
const addPalette = document.querySelector('.add_palette')
const colorPalette = document.querySelector('.color_palette')
const removePalette = document.querySelector('.remove_palette')
let div
let divLength
let para

const hexObject = {
    0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9,
    10: 'A', 11: 'B', 12: 'C', 13: 'D', 14: 'E', 15: 'F'
}

const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`

let hexCodeGenerator = () => {
    let hexaNumber = "#"
    for (let i = 0; i < 6; i++) {
        let randomNumber = Math.floor(Math.random() * 16)
        hexaNumber += hexObject[randomNumber]
    }
    return hexaNumber
}


let ColorPaletteGenerator = () => {
    for (let i = 0; i < document.querySelectorAll('div').length; i++) {
        let hexacode = hexCodeGenerator()
        document.querySelectorAll('div')[i].style.backgroundColor = hexacode
        document.querySelectorAll('p')[i].innerText = hexacode
    }
}




let copyContent = () => {
    for (let i = 0; i < document.querySelectorAll('div > p').length; i++) {
        document.querySelectorAll('div')[i].addEventListener('click', () => {
            let copyText = rgb2hex(document.querySelectorAll('div')[i].style.backgroundColor).toUpperCase()
            navigator.clipboard.writeText(copyText)
            document.querySelectorAll('div > p')[i].textContent = "Copied"
            setTimeout(() => {
                document.querySelectorAll('p')[i].textContent = copyText
            }, 500);


        })
    }

}





let paletteAdder = () => {

    let hexaCode = hexCodeGenerator()
    div = document.createElement('div')
    para = document.createElement('p')
    colorPalette.append(div)
    divLength = document.querySelectorAll('div').length
    document.querySelectorAll('div')[divLength - 1].append(para)
    document.querySelectorAll('div')[divLength - 1].style.backgroundColor = hexaCode
    document.querySelectorAll('div > p')[divLength - 1].innerText = hexaCode
    copyContent()

}

let paletteRemover = () => {
    div = document.createElement('div')
    divLength = document.querySelectorAll('div').length
    document.querySelectorAll('div')[divLength - 1].remove()
}

let eventActions = (event) => {
    switch (event.key) {
        case "Enter":
            ColorPaletteGenerator()
            break
        case "+":
            paletteAdder()
            break
        case "-":
            paletteRemover()
            break
        default:
            break

    }

}


ColorPaletteGenerator()
copyContent()
generateButton.addEventListener('click', ColorPaletteGenerator)
addPalette.addEventListener('click', paletteAdder)
removePalette.addEventListener('click', paletteRemover)
document.addEventListener('keypress', eventActions)

