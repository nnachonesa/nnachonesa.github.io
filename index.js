const username = "nnachonesa";
const gridElement = document.getElementById("project-grid");
const statusElement = document.getElementById("status");
const cacheKey = "reposCache";

const fallbackRepos = [
    {
        name: "Akagi",
        description: "Este es un proyecto en cual se reconoce la voz por medio de una libreria de python luego esta se traduce a texto, la ia lo interpreta y lo devuelve por medio de voz.",
        tags: ["python", "speechrecognition", "ai", "openai"],
        html_url: "https://github.com/nnachonesa/Akagi"
    },
    {
        name: "Vestal",
        description: "Bot de discord con variedad de comandos, usando sapphire como tecnologia de base para el bot.",
        tags: ["typescript", "sapphire", "discord", "bot"],
        html_url: "https://github.com/nnachonesa/Vestal"
    },
    {
        name: "Template Products",
        description: "Una template basica para que cualquiera pueda usar que se trata de productos que se pueden dar a vender o distinto.",
        tags: ["typescript", "ejs", "express"],
        html_url: "https://github.com/nnachonesa/template-products",
        live_url: "https://nnachonesa.github.io/projects/template-products.html"
    },
    {
        name: "Ascii Generator",
        description: "Una pagina web que subiendo una imagen te la devuelve pero en caracteres ascii, ademas de poder variar parametros",
        tags: ["ascii"],
        html_url: "https://github.com/nnachonesa/nnachonesa.github.io/blob/master/projects/ascii.html",
        live_url: "https://nnachonesa.github.io/projects/ascii.html"
    },
    {
        name: "cat",
        description: "Bot de discord que sirve para la moderacion como Yuudachi.",
        tags: ["typescript", "sapphire", "discord", "bot"],
        html_url: "https://github.com/nnachonesa/cat"
    },
    {
        name: "Yask",
        description: "Una cache flexible, no escalable que esta especificamente diseñada para la programacion que tenga mucho manejo de informacion y se pueda usar en cualquier contexto.",
        tags: ["typescript", "cache"],
        html_url: "https://github.com/nnachonesa/yask"
    },
    {
        name: "Snowflake",
        description: "Constructor y desconstructor de snowflakes. (id de 64 unica)",
        tags: ["rust", "binary"],
        html_url: "https://github.com/nnachonesa/snowflake"
    },
    {
        name: "Murasaki",
        description: "Un bot de whatsapp simple que envia memes sacados de reddit",
        tags: ["typescript", "whatsapp", "bot"],
        html_url: "https://github.com/nnachonesa/Murasaki"
    },
    {
        name: "EcoMongo",
        description: "Una libreria para ts/js que ayuda a crear una economia simple",
        tags: ["typescript", "mongodb"],
        html_url: "https://github.com/nnachonesa/EcoMongo"
    },
    {
        name: "TempTasks",
        description: "Esta aplicación fue creada con la sencilla razón de guardar tareas temporales, su diseño es tan sencillo como rápido y fácil de aprender.",
        tags: ["typescript", "app", "electron", "pkg"],
        html_url: "https://github.com/nnachonesa/TempTasks"
    },
    {
        name: "handino",
        description: "El codigo fuente de una mano robotica que hice para el proyecto del cole.",
        tags: ["arduino"],
        html_url: "https://github.com/nnachonesa/handino"
    },
    {
        name: "niko-openai",
        description: "Un bot de discord que usa gpt (davinci) para responder",
        tags: ["javascript", "ai", "discord", "bot"],
        html_url: "https://github.com/nnachonesa/niko-openai"
    }
];

function createProjectCard(repo) {
    const tagSpans = repo.tags.map(tag => `
<span class="inline-flex cursor-default items-center space-x-2 rounded-md border border-neutral-300 
bg-neutral-200/50 px-2 py-1 font-mono text-xs font-medium text-neutral-700 dark:border-neutral-800 
dark:bg-neutral-800/60 dark:text-neutral-300">${tag}</span>
`).join("");

    const liveDemoLink = repo.live_url || repo.homepage || "";
    const liveDemoHTML = liveDemoLink
        ? `<a target="_blank" rel="noopener noreferrer" class="text-sm font-medium text-indigo-600 hover:text-indigo-500" aria-label="Live Demo" href="${liveDemoLink}">Ver en linea</a>`
        : "";

    return `
<div class="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden transition-colors duration-300">
  <div class="px-4 py-5 sm:p-6">
    <h2 class="text-lg leading-6 font-medium text-gray-900 dark:text-white">${repo.name}</h2>
    <p class="mt-1 text-sm text-gray-600 dark:text-gray-300">${repo.description}</p>
    <ul class="mt-4 flex flex-wrap gap-2">
      ${tagSpans}
    </ul>
  </div>
  <div class="px-4 py-4 sm:px-6 flex justify-between">
    <a target="_blank" rel="noopener noreferrer" class="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300" aria-label="GitHub Repository" href="${repo.html_url}">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-900 dark:text-white">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
        <path d="M9 18c-4.51 2-5-2-7-2"></path>
      </svg>
      <span class="sr-only">GitHub Repository</span>
    </a>
    ${liveDemoHTML}
  </div>
</div>
`;
}

function renderProjects(repos) {
    gridElement.innerHTML = repos.map(createProjectCard).join("");
}

function fetchAndCacheRepos() {
    fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
        headers: { "Accept": "application/vnd.github.mercy-preview+json" }
    })
        .then(response => {
            if (response.status === 403 && response.headers.get("X-RateLimit-Remaining") === "0") {
                console.warn("Rate limit alcanzado.");
                throw new Error("API rate limit");
            }
            if (!response.ok) throw new Error("Error al obtener repos de GitHub.");
            return response.json();
        })
        .then(data => {
            const repos = data.map(repo => ({
                name: repo.name,
                description: repo.description || "Sin descripción.",
                tags: (repo.topics && repo.topics.length > 0) ? repo.topics : (repo.language ? [repo.language.toLowerCase()] : []),
                html_url: repo.html_url,
                homepage: repo.homepage || ""
            }));
            localStorage.setItem(cacheKey, JSON.stringify(repos));
            renderProjects(repos);
        })
        .catch(error => {
            console.error("Error en API:", error.message);
            const cache = localStorage.getItem(cacheKey);
            if (cache) {
                renderProjects(JSON.parse(cache));
            } else {
                renderProjects(fallbackRepos);
            }
        });
}

const cachedRepos = localStorage.getItem(cacheKey);
if (cachedRepos) {
    renderProjects(JSON.parse(cachedRepos));
} else {
    renderProjects(fallbackRepos);
}

fetchAndCacheRepos();
const toggleBtn = document.getElementById("theme-toggle");
  const html = document.documentElement;

  // coso oscuro y claro

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    html.classList.add("dark");
    toggleBtn.textContent = "☀️";
  }

  toggleBtn.addEventListener("click", () => {
    html.classList.toggle("dark");

    if (html.classList.contains("dark")) {
      toggleBtn.textContent = "☀️";
      localStorage.setItem("theme", "dark");
    } else {
      toggleBtn.textContent = "🌙";
      localStorage.setItem("theme", "light");
    }
  });