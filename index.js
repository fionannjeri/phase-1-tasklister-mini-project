document.getElementById('addTaskButton').addEventListener('click', addTask);
document.getElementById('sortAsc').addEventListener('click', () => sortTasks('asc'));
document.getElementById('sortDesc').addEventListener('click', () => sortTasks('desc'));

let tasks = [];

function addTask() {
    const taskInput = document.getElementById('taskInput').value;
    const userInput = document.getElementById('userInput').value;
    const durationInput = document.getElementById('durationInput').value;
    const dateInput = document.getElementById('dateInput').value;
    const priorityInput = document.getElementById('prioritySelect').value;

    if (taskInput) {
        const task = {
            id: Date.now(),
            task: taskInput,
            user: userInput,
            duration: durationInput,
            dueDate: dateInput,
            priority: priorityInput
        };
        tasks.push(task);
        displayTasks();
        clearInputs();
    }
}

function displayTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    
    tasks.forEach(task => {
        const taskDiv = document.createElement('div');
        taskDiv.className = `task ${task.priority}`;
        taskDiv.innerHTML = `
            <span>${task.task} - ${task.user} - ${task.duration} - ${task.dueDate}</span>
            <button onclick="editTask(${task.id})">Edit</button>
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;
        taskList.appendChild(taskDiv);
    });
}

function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    displayTasks();
}

function editTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        document.getElementById('taskInput').value = task.task;
        document.getElementById('userInput').value = task.user;
        document.getElementById('durationInput').value = task.duration;
        document.getElementById('dateInput').value = task.dueDate;
        document.getElementById('prioritySelect').value = task.priority;

        deleteTask(taskId);
    }
}

function sortTasks(order) {
    tasks.sort((a, b) => {
        const priorityOrder = { 'low': 1, 'medium': 2, 'high': 3 };
        return order === 'asc' ? priorityOrder[a.priority] - priorityOrder[b.priority] : priorityOrder[b.priority] - priorityOrder[a.priority];
    });
    displayTasks();
}

function clearInputs() {
    document.getElementById('taskInput').value = '';
    document.getElementById('userInput').value = '';
    document.getElementById('durationInput').value = '';
    document.getElementById('dateInput').value = '';
}

