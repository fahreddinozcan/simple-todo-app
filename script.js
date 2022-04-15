const tasksWindow = document.querySelector(".tasks");
const inputArea = document.querySelector(".input-text");
const addButton = document.querySelector(".btn-main");
const iconDivs = document.querySelectorAll(".icon-div");
const slideIconDown = document.querySelector(".down-icon");
const slideIconUp = document.querySelector(".up-icon");
const addListeners = function () {
  const iconDivs = document.querySelectorAll(".icon-div");
  iconDivs.forEach((element) => {
    element.addEventListener("click", function (e) {
      e.stopPropagation();

      if (e.currentTarget.classList.contains("icon-div")) {
        const parents = e.currentTarget.parentNode;
        if (
          parents.classList.contains("task") &&
          parents.contains(e.currentTarget)
        ) {
          parents.style.transform = "translateX(100px)";
          parents.style.opacity = "0";
          setTimeout(function () {
            tasksWindow.removeChild(parents);
            tasksWindow.lastElementChild?.classList.add("last");
          }, 300);
          if (tasksWindow.children.length < 13) {
            slideIconDown.style.opacity = 0;
            slideIconUp.style.opacity = 0;
          }
        }
      }
    });
  });
};
addListeners();
const addTask = function (text) {
  let html = `        
    <div class="task">
        <p class="task-text">${text}</p>
        <div class="icon-div">
            <i class="ph-x close-icon"></i>
        </div>
    </div>`;

  tasksWindow.insertAdjacentHTML("beforeend", html);
};
const addCall = function () {
  tasksWindow.lastElementChild?.classList.remove("last");
  let newTaskText = inputArea.value;
  addTask(newTaskText);
  inputArea.value = "";
  tasksWindow.lastElementChild?.classList.add("last");
  addListeners();
  console.log(tasksWindow.children.length);
  if (tasksWindow.children.length > 11) {
    slideIconDown.style.opacity = 100;
  }
};
document.addEventListener("keydown", function (e) {
  if (e.key == "Enter" && inputArea.value.trim() != "") {
    addCall();
  }
});

addButton.addEventListener("click", function (e) {
  if (inputArea.value.trim() != "") addCall();
});

if (tasksWindow.children.length > 9) {
  console.log("a");
  slideIconDown.style.opacity = 100;
}

setInterval(() => {
  slideIconDown.classList.toggle("move-down");
  slideIconUp.classList.toggle("move-up");
}, 200);

tasksWindow.addEventListener("scroll", () => {
  if (tasksWindow.children.length > 11) {
    if (
      tasksWindow.offsetHeight + tasksWindow.scrollTop >=
      tasksWindow.scrollHeight
    ) {
      slideIconDown.style.opacity = 0;
      slideIconUp.style.opacity = 100;
    } else {
      slideIconDown.style.opacity = 100;
      slideIconUp.style.opacity = 0;
    }
  }
});
