export function renderTasks(tasks, container) {
  container.innerHTML = tasks
    .map(
      (task) => `
        <article class="rounded-lg border p-4">
          <h3 class="font-semibold">${task.title}</h3>
          <p class="text-sm text-gray-600">${task.description}</p>
          <span class="text-xs">${task.status} · ${task.estimatedTime}h</span>
        </article>`
    )
    .join("");
}