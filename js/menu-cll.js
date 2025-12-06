// ===============================================
// Seletores de Elementos
// ===============================================
const menu = document.querySelector(".menu-cll");
const links = document.querySelectorAll(".link-cll");

// É crucial ter o elemento que abre o menu (o hambúrguer no header)
const botaoAbrir = document.querySelector(".menu-hamburguer"); 
const botaoFechar = document.querySelector(".fechar"); 

// Elementos para o Menu Flutuante (Sticky)
const header = document.querySelector('header');
const menuFlutuante = document.querySelector('.menuflutuante');


// ===============================================
// Lógica do Menu Mobile (Menu-Cll)
// ===============================================

function definirEstadoInicial() {
    menu.style.transform = "translateX(100%)";
    menu.style.transition = "transform 0.4s ease-in-out"; 
    
    links.forEach(link => {
        link.style.transform = "translateX(100%)";
    });
}
definirEstadoInicial(); 

function abrirMenu() {
    menu.style.transform = "translateX(0)";
    
    links.forEach((link, index) => {
        const delay = index * 0.05; 
        link.style.transition = `transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.27) ${delay}s`;
        link.style.transform = "translateX(0)";
    });
}

function fecharMenu() {
    links.forEach((link, index) => {
        const delay = index * 0.05; 
        link.style.transition = `transform 0.3s ease-in ${delay}s`;
        link.style.transform = "translateX(100%)";
    });
    
    setTimeout(() => {
        menu.style.transform = "translateX(100%)";
    }, 200); 
}


// ===============================================
// Lógica do Intersection Observer (Menu Flutuante)
// ===============================================

// 1. Configura as opções do observador
const observerOptions = {
    root: null, 
    threshold: 0.0 // 0% de visibilidade para disparar a função
};

// 2. Define a função de callback
const headerObserverCallback = (entries, observer) => {
    entries.forEach(entry => {
        // Se isIntersecting for false, o <header> saiu completamente da tela
        if (entry.isIntersecting === false) {
            console.log('❌ Header saiu da tela. Ativando menu flutuante.');
            
            // Ativa o menu flutuante (display: flex)
            menuFlutuante.style.display = 'flex';
            
            setTimeout(() => {
                menuFlutuante.style.transform = 'scale(1)';
            }, 50); 
            // Inicia a transição (scale(1)) após o display ser aplicado
            
        } else {
            // O <header> entrou ou está na tela
            console.log('✅ Header está visível. Desativando menu flutuante.');
            
            // Inicia a transição (scale(0.1))
            menuFlutuante.style.transform = 'scale(0.1)';
            
            // Esconde o elemento (display: none) após o tempo da transição no CSS (.2s)
            setTimeout(() => {
                menuFlutuante.style.display = 'none';
            }, 200); 
        }
    });
};

// 3. Cria e Inicia o Observador
const headerObserver = new IntersectionObserver(headerObserverCallback, observerOptions);
headerObserver.observe(header);


// ===============================================
// Event Listeners
// ===============================================

// O botão abrir/fechar do menu principal deve estar linkado ao header e ao flutuante
if (botaoAbrir) {
    botaoAbrir.addEventListener('click', abrirMenu);
}
if (botaoFechar) {
    botaoFechar.addEventListener('click', fecharMenu);
}
// Adiciona o listener para o menu flutuante também abrir o menu principal
if (menuFlutuante) {
    menuFlutuante.addEventListener('click', abrirMenu);
}

links.forEach(link => {
    link.addEventListener('click', fecharMenu);
});