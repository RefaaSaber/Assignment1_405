let tasks = JSON.parse(localStorage.getItem('rs_tasks') || '[]');

function save() {
    localStorage.setItem('rs_tasks', JSON.stringify(tasks));
}

function render() {
    const list = document.getElementById('taskList');
    list.innerHTML = '';

    if (tasks.length === 0) {
        list.innerHTML = '<p class="empty-msg">No tasks yet. Add one above!</p>';
    } else {
        tasks.forEach((task, i) => {
            const li = document.createElement('li');
            li.className = 'task-item' + (task.done ? ' done' : '');
            li.innerHTML = `
                <input type="checkbox" ${task.done ? 'checked' : ''} onchange="toggle(${i})"/>
                <span class="task-text">${escHtml(task.text)}</span>
                <button class="btn-delete" onclick="del(${i})" title="Delete">✕</button>
            `;
            list.appendChild(li);
        });
    }

    const done = tasks.filter(t => t.done).length;
    document.getElementById('taskCount').textContent =
        tasks.length === 0 ? '0 tasks' : `${done} of ${tasks.length} completed`;
}

function addTask() {
    const input = document.getElementById('taskInput');
    const text = input.value.trim();
    if (!text) return;
    tasks.unshift({ text, done: false });
    save(); render();
    input.value = '';
    input.focus();
}

function toggle(i) { tasks[i].done = !tasks[i].done; save(); render(); }
function del(i)    { tasks.splice(i, 1); save(); render(); }
function clearCompleted() { tasks = tasks.filter(t => !t.done); save(); render(); }

function escHtml(s) {
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('taskInput').addEventListener('keydown', e => {
        if (e.key === 'Enter') addTask();
    });
    render();
});