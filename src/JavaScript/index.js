
// Event listener para el botón que redirige al carrito
const entrarButton = document.querySelector('#botonEntrar');
if (entrarButton) {
    entrarButton.addEventListener('click', function() {
        setTimeout(function() {
            window.location.href = "src/html/inicio.html";
        }, 2000); // 2000 milisegundos = 2 segundos
    });
}