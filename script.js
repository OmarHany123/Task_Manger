document.addEventListener("DOMContentLoaded", function () {
    loadTasks();
});

let tasks = [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    renderTasks();
}

function renderTasks() {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.innerHTML = `${task.text} - Start: ${task.startTime}, Duration: ${task.duration} mins`;
        if (task.completed) {
            li.classList.add("done");
            li.style.textDecoration = "line-through";
        }

        let finishButton = createFinishButton(li, index);
        li.appendChild(finishButton);

        li.onclick = function () {
            selectTask(li);
        };

        taskList.appendChild(li);
    });
}

function createFinishButton(li, index) {
    let finishButton = document.createElement("button");
    finishButton.textContent = tasks[index].completed ? "Uncheck Task" : "Finish Task";
    finishButton.classList.add("finish-btn");
    finishButton.onclick = function (event) {
        event.stopPropagation();
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    };
    return finishButton;
}

function addTask() {
    let taskInput = document.getElementById("taskInput").value;
    let taskStartTime = document.getElementById("taskStartTime").value;
    let taskDuration = document.getElementById("taskDuration").value;

    if (taskInput === "" || taskStartTime === "" || taskDuration === "") {
        alert("Please enter all task details");
        return;
    }

    tasks.push({
        text: taskInput,
        startTime: taskStartTime,
        duration: taskDuration,
        completed: false
    });
    saveTasks();
    renderTasks();

    document.getElementById("taskInput").value = "";
    document.getElementById("taskStartTime").value = "";
    document.getElementById("taskDuration").value = "";
}

function selectTask(taskItem) {
    let selected = document.querySelector(".selected");
    if (selected) {
        selected.classList.remove("selected");
    }
    taskItem.classList.add("selected");
}

function updateTask() {
    let selectedTask = document.querySelector(".selected");
    if (!selectedTask) {
        alert("Please select a task to update");
        return;
    }

    let index = Array.from(document.getElementById("taskList").children).indexOf(selectedTask);
    if (index === -1) return;

    let newTaskText = prompt("Update your task:", tasks[index].text);
    let newStartTime = prompt("Update start time:", tasks[index].startTime);
    let newDuration = prompt("Update duration:", tasks[index].duration);

    if (newTaskText && newStartTime && newDuration) {
        tasks[index].text = newTaskText;
        tasks[index].startTime = newStartTime;
        tasks[index].duration = newDuration;
        saveTasks();
        renderTasks();
    }
}

function removeTask() {
    let selectedTask = document.querySelector(".selected");
    if (selectedTask) {
        let index = Array.from(document.getElementById("taskList").children).indexOf(selectedTask);
        if (index > -1) {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        }
    } else {
        alert("Please select a task to remove");
    }
}

function removeAllTasks() {
    tasks = [];
    saveTasks();
    renderTasks();
}