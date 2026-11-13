# PlanitAI

> Plan it before you build it.

PlanitAI is a web app that helps developers turn a project brief into a step-by-step development plan. You describe your project (name, duration, team size, technologies, difficulty, full brief) and the app organizes the work as a list of tasks with user stories, acceptance criteria, priorities, estimates and dependencies.

## Features

- **New project form** with real-time validation (Parsley.js): required fields, minimum duration, minimum number of developers.
- **Task dashboard**: tasks are rendered dynamically as cards (title, description, status, estimated time).
- **Demo mode**: loads a ready-made project from `data/project.json` so you can see the dashboard without an API key.
- **LocalStorage persistence**: the project survives a page refresh.
- **Gemini API key settings**: the key is entered in a modal and kept in `sessionStorage` only (cleared when the tab is closed).
- **Responsive layout** with a fixed sidebar on desktop (Dashboard, New project, AI settings).

## Tech stack

| Area | Tools |
|------|-------|
| Markup | HTML5 |
| Styling | Tailwind CSS v4 (browser build via CDN), custom theme (colors and fonts) |
| Fonts | Fraunces and Instrument Sans (Google Fonts) |
| Scripts | Vanilla JavaScript (ES modules), `fetch`, LocalStorage, sessionStorage |
| Validation | Parsley.js (with jQuery) |
| AI | Google Gemini API |
| Deployment | GitHub Pages / Vercel |

## Project structure

```
project/
├── index.html          # Dashboard: project name + task cards
├── newProject.html     # New project form
├── data/
│   └── project.json    # Demo project (7 tasks)
├── js/
│   ├── api.js          # fetch the project JSON, handle HTTP errors
│   ├── storage.js      # save / load the project in LocalStorage
│   ├── render.js       # build the task cards
│   └── main.js         # entry point, ties everything together
└── README.md
```

## Getting started

### Prerequisites

- A modern browser
- A local web server. ES modules and `fetch` do **not** work when you open the HTML file directly (`file://`).

### Run locally

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/<your-repo>.git
   cd <your-repo>
   ```
2. Start a local server, for example with the **Live Server** extension in VS Code (right-click `index.html` → *Open with Live Server*), or:
   ```bash
   npx serve
   ```
3. Open the address shown in the terminal (for example `http://localhost:5500`).

### Use the Gemini API key

1. Click **Parametres Ai** in the sidebar.
2. Paste your Gemini API key and click **enregistrer**.
3. The key is stored in `sessionStorage` under `geminiKey`. It is never written to a file or sent anywhere except the API.

> Never commit an API key to GitHub.

## How it works

1. On load, `main.js` checks LocalStorage for a saved project.
2. If none exists, `api.js` fetches `data/project.json` and `storage.js` saves it.
3. `render.js` displays the project name and one card per task.
4. On refresh, the data comes from LocalStorage instead of the file.

To reset the demo data, run `localStorage.clear()` in the browser console (or clear it in DevTools → Application → Local Storage), then reload.

## Data format

Each task in `data/project.json` follows this structure:

```json
{
  "id": "TASK-001",
  "title": "Set up repository and project structure",
  "description": "Create the GitHub repository, folders and base HTML files.",
  "userStories": ["As a developer, I want a clean structure so that the project is easy to maintain."],
  "acceptanceCriteria": ["Repository is public", "Folders css/js exist"],
  "priority": "High",
  "importance": "High",
  "size": "XS",
  "estimatedTime": 2,
  "deadline": "Day 1",
  "status": "To Do",
  "dependencies": []
}
```

| Field | Description |
|-------|-------------|
| `id` | Unique identifier (`TASK-001`, `TASK-002`, ...) |
| `priority` | `Critical`, `High` or `Medium` |
| `importance` | `High` or `Medium` |
| `size` | T-shirt size: `XS`, `S`, `M`, `L` |
| `estimatedTime` | Estimated hours |
| `deadline` | Day of the project (`Day 1`, `Day 2`, ...) |
| `status` | `To Do`, and later `In Progress` / `Done` |
| `dependencies` | List of task ids that must be done first |

The root object also contains `projectName` and `totalEstimatedHours`.

## Roadmap

- [ ] Generate the plan from the form with the Gemini API
- [ ] Change a task's status from its card and save it
- [ ] Progress bar based on `totalEstimatedHours`
- [ ] Filter and sort tasks by priority and deadline
- [ ] Export the plan (JSON / PDF)

## Deployment

The site is static, so it can be deployed as is:

- **GitHub Pages**: Settings → Pages → deploy from the `main` branch.
- **Vercel**: import the repository, no build step needed.

## Author

Made by **<your name>** as a front-end learning project.

## License

Add a license of your choice (for example MIT) or remove this section.
