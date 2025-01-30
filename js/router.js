export class Router {
    constructor() {
      this.routes = {};
      this.cache = {}; // Cache para páginas carregadas
    }
  
    // Adicionar uma rota ao sistema
    add(routeName, page) {
      this.routes[routeName] = page;
    }
  
    // Navegar entre páginas
    route(event) {
      event = event || window.event;
      event.preventDefault();
  
      const href = event.target.closest("a").getAttribute("href");
      if (!this.routes[href]) {
        console.warn("Rota não encontrada:", href);
        return;
      }
  
      window.history.pushState({}, "", href); // Atualiza o histórico
      this.handle(); // Atualiza a página
    }
  
    // Carregar o conteúdo da rota
    handle() {
        const { pathname } = window.location; // Rota atual
        const route = this.routes[pathname] || this.routes["/404"]; // Rota ou 404
      
        fetch(route) // Carrega o HTML da página correspondente
          .then((data) => data.text())
          .then((html) => {
            document.querySelector("#app").innerHTML = html; // Substitui o conteúdo
          })
          .catch(() => {
            document.querySelector("#app").innerHTML =
              "<h1>Erro ao carregar a página</h1>";
          });
      }
      
  }
  
  
