function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText === "") return;

    const taskList = document.getElementById("taskList");
    const newTask = document.createElement("li");

    newTask.textContent = taskText;
    
    // Agregar botón para marcar como completada
    const completeBtn = document.createElement("button");
    completeBtn.textContent = "✓";
    completeBtn.style.marginLeft = "10px";
    completeBtn.style.cursor = "pointer";
    completeBtn.onclick = () => newTask.classList.toggle("completed");

    newTask.appendChild(completeBtn);
    taskList.appendChild(newTask);
    taskInput.value = "";
}

function removeCompletedTasks() {
    const taskList = document.getElementById("taskList");
    const completedTasks = document.querySelectorAll(".completed");

    completedTasks.forEach(task => task.remove());
}
