import { data } from "./draw"
import { SketchPad } from "./sketchPad"

const sketchPadContainer = document.getElementById("sketchPadContainer")!
const undoAction = document.querySelector(".actions > button")! as HTMLButtonElement
const nextButton = document.querySelector(".actions > button:last-child")! as HTMLButtonElement
const actionsContainer = document.querySelector(".actions")! as HTMLDivElement
const backButton = document.querySelector(".actions #back")! as HTMLButtonElement
const detailsContainer = document.querySelector("#details") as HTMLElement
const startDataCollection = document.querySelector("#startCollection")! as HTMLButtonElement
const objectsToDraw = ["car", 'circle', 'square', 'mobile'];
const nameInp = document.querySelector("#details > input")! as HTMLInputElement
const sketchPad = new SketchPad(sketchPadContainer, undoAction, objectsToDraw)
const currentObject = document.querySelector("#currentObject")! as HTMLSpanElement
const thanksContainer = document.querySelector(".thanks") as HTMLDivElement
backButton.disabled = true
nextButton.disabled = true
thanksContainer.style.visibility = "hidden"

nextButton.addEventListener("click", () => {
    backButton.disabled = false
    const hasNext = sketchPad.next()
    if (!hasNext) {
        nextButton.disabled = true
        actionsContainer.style.display = "none"
        currentObject.style.display = "none"
        sketchPadContainer.style.display = "none";
        thanksContainer.style.visibility = "visible";
        download(data)
        return
    }
    sketchPad.reset()
    currentObject.innerText = objectsToDraw[sketchPad.index];
})
/**
 * Downloads the provided data object as a JSON file with the student's name as the filename.
 *
 * @param {any} data - The data object to be downloaded as JSON.
 * @return {void} 
 */
function download(data: any): void {
    const down = document.createElement("a")
    down.setAttribute("href", `data:text/plain;charset=utf-8,${encodeURIComponent(JSON.stringify(data))}`)
    down.setAttribute("download", `${data.student}.json`)
    down.style.display = "none"
    document.body.appendChild(down)
    down.click()
    document.body.removeChild(down)
}
backButton.addEventListener("click", () => {
    const hasPrev = sketchPad.prev()
    sketchPad.reset()
    currentObject.innerText = objectsToDraw[sketchPad.index];
    if (!hasPrev) {
        backButton.disabled = true
        return
    }
})
startDataCollection.addEventListener("click", () => {
    if (nameInp.value === '') {
        alert("Enter your name")
        return
    }
    data.student = nameInp.value
    nextButton.disabled = false
    currentObject.innerText = objectsToDraw[sketchPad.index];
    detailsContainer.style.display = "none";
    sketchPadContainer.style.display = "block";
})