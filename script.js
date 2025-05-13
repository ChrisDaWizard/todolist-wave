/// global elements
//recordar documentar cada funcion y sus partes
const askBtn = document.querySelector(".ask-btn")
const wisdomCloseBtn = document.querySelector(".wisdom-btn")
const bookMsg = document.querySelector(".book-msg")
const wisdomWindow = document.querySelector(".wizdom-msg")

const inputTask = document.querySelector(".input-task")
const addBtn = document.querySelector(".add")
const taskList = document.querySelector(".to-do-panel > ul")
const taskCounter = document.querySelector(".title-task")
const clearAllBtn = document.querySelector(".cleanAll")
const changeBackgroundBtn = document.querySelector(".changeBack")

const volumeContent = document.querySelector(".volume-container")


const phrases = [
  "I WANNA KNOW WHAT LOVE IS!!",
  "Don't play fool on me, go make your bed",
  "Is that a glass on your desktop? go wash it",
  "This was supposed to be just an exercise project",
  "WORK HARD, PLAY HARD",
  "Everyday it gets easier..",
  "It's Okey to rest",
  "We must fail in order to succeed!!",
  "If you want it, then you have to take it"
]

// wizdom function
function randomMsg() {
  let randomIndex = Math.floor(Math.random() * phrases.length)
  wisdomWindow.textContent = phrases[randomIndex]
}

function showMsg() {
  bookMsg.classList.toggle("mostrar")
}

function showVolume() {
  volumeContent.classList.toggle("mostrar")
}

function showAndGenerate() { // fusionamos la funcion 
  if (bookMsg.classList.toggle("mostrar")) {
    randomMsg();
  }
}

//wizdom event
askBtn.addEventListener("click", showAndGenerate)
wisdomCloseBtn.addEventListener("click", showMsg)


// function to do 
function updateTaskCounter() {
  const taskCount = taskList.children.length
  taskCounter.textContent = `${taskCount} Task(s)`
}

function addTask() {
  const taskText = inputTask.value.trim() //quitamos el espacio del principio y final con trim()
  if (taskText !== "") {//si taskText es diferente a nada, se ejecuta
    const task = document.createElement("li")
    task.innerHTML = `
      <div class="task-window">
        <div class="tab-task">
          <p>Task ${taskList.children.length + 1}</p>
        </div>
        <div class="content-task">
          <p>${taskText}</p>
          <button class="task-btn">Ok</button>
        </div>
      </div>`

    // Evento para botón Ok (borrar tarea)
    const okBtn = task.querySelector(".task-btn")
    okBtn.addEventListener("click", () => {
      task.remove()
      updateTaskCounter()
    })

    taskList.appendChild(task)
    inputTask.value = ""
    inputTask.focus()
    updateTaskCounter()

    saveTasksToLocalStorage() //function para guardar en localStorage al agregar task
  }
}

function saveTasksToLocalStorage() { //function para guardar en localStorage
  const tasks = []
  taskList.querySelectorAll("li").forEach(task => {
    tasks.push(task.querySelector(".content-task p").textContent)
  })
  localStorage.setItem("tasks", JSON.stringify(tasks)) //guardar como JSON
}

function loadTasksFromLocalStorage() {
  const storedTasks = JSON.parse(localStorage.getItem("tasks")) || []
  storedTasks.forEach(taskText => {
    const task = document.createElement("li")
    task.innerHTML = `
      <div class="task-window">
        <div class="tab-task">
          <p>Task ${taskList.children.length + 1}</p>
        </div>
        <div class="content-task">
          <p>${taskText}</p>
          <button class="task-btn">Ok</button>
        </div>
      </div>`

    // ok carga task
    const okBtn = task.querySelector(".task-btn")
    okBtn.addEventListener("click", () => {
      task.remove()
      updateTaskCounter()
      saveTasksToLocalStorage()
    })

    taskList.appendChild(task)
  })
  updateTaskCounter() // Actualizar el contador
}

function clearAllTasks() {
  taskList.innerHTML = ""
  updateTaskCounter()
  saveTasksToLocalStorage()
}

// Background
let currentBg = 0
const backgrounds = ["display1.gif", "display2.gif", "display3.gif"]

// Guardar el fondo 
function changeBackground() {
  currentBg = (currentBg + 1) % backgrounds.length;
  document.querySelector(".gif").src = `images/${backgrounds[currentBg]}`;
  localStorage.setItem("currentBg", currentBg); //setItem guarda todo como string
}

// Cargar el fondo guardado 
const savedBg = localStorage.getItem("currentBg");
if (savedBg !== null) {
  currentBg = parseInt(savedBg); //parseInt convierte por ejemplo "2" en 2
  document.querySelector(".gif").src = `images/${backgrounds[currentBg]}`;
}

// enter to add task
addBtn.addEventListener("click", addTask)
inputTask.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask()
  }
})
clearAllBtn.addEventListener("click", clearAllTasks)
changeBackgroundBtn.addEventListener("click", changeBackground)

updateTaskCounter()


//delete even example task
document.querySelectorAll(".task-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      this.closest("li").remove()
      updateTaskCounter()
    })
  })


loadTasksFromLocalStorage() //carga las tasks al iniciar

//music player

const playBtn = document.querySelector(".music");
const rotateBtn = document.querySelector(".play-music")
const audio = document.getElementById("bg-music");

let isPlaying = false //iniciamos una variable en false, para la comparativa

playBtn.addEventListener("click", ()=> {
  if (!isPlaying){
    audio.play();
    isPlaying = true;
    rotateBtn.classList.toggle("playing")
    volumeContent.classList.toggle("mostrar")
  } else {
    audio.pause();
    isPlaying = false;
    rotateBtn.classList.toggle("playing")
    volumeContent.classList.toggle("mostrar")
  }
})

const slider = document.querySelector(".music-slider")

//inizializamos el audio con el slider
audio.volume = slider.value;

//movimiento del slider afecta el audio
slider.addEventListener("input",   () => {
  audio.volume = slider.value;
});

//drag system

//variables deco para function
const decoTab = document.querySelector(".tab-deco-1");
const handle = document.querySelectorAll(".tab-deco-tab"); // la "barra"

function makeDraggable(decoTab, handle) { //function de movimiento
  let isDraggeable = false;
  let offSetX = 0;
  let offSetY = 0;

  handle.addEventListener("mousedown", (e) => {
    isDraggeable = true;
    offSetX = e.clientX - decoTab.offsetLeft;
    offSetY = e.clientY - decoTab.offsetTop;
    decoTab.style.cursor = "grabbing";
    document.body.style.userSelect = "none";
  });

  document.addEventListener("mouseup", () => {
    isDraggeable = false;
    decoTab.style.cursor = "grab";
    document.body.style.userSelect = ""; 
  });

  document.addEventListener("mousemove", (e) => {
    if (isDraggeable) {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight; 
      const tabWidth = decoTab.offsetWidth;
      const tabHeight = decoTab.offsetHeight;

      let newLeft = e.clientX - offSetX;
      let newTop = e.clientY - offSetY;

      newLeft = Math.max(0, Math.min(newLeft, windowWidth - tabWidth));
      newTop = Math.max(0, Math.min(newTop, windowHeight - tabHeight));

      decoTab.style.left = newLeft + "px";
      decoTab.style.top = newTop + "px";
    }
  });
}

//ejecucion de function
//variables de ejecucion
const tab1 = document.querySelector(".tab-deco-1");
const handle1 = tab1.querySelector(".tab-deco-tab");

const tab2 = document.querySelector(".tab-deco-2");
const handle2 = tab2.querySelector(".tab-deco-tab");

const tab3 = document.querySelector(".tab-deco-3");
const handle3 = tab3.querySelector(".tab-deco-tab");

makeDraggable(tab1, handle1);
makeDraggable(tab2, handle2);
makeDraggable(tab3, handle3);


//toggles para btn clicked

const allBtn = document.querySelectorAll(".control-panel button");

allBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.classList.toggle("clicked");
    setTimeout(() => {
      btn.classList.remove("clicked");
    }, 100)
  });
});

//yup, i think in both english and spanish, very sabroso, very nice, hire me!! :D
