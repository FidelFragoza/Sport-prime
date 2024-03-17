document.addEventListener('DOMContentLoaded', function() {
    const productosContainer = document.getElementById('productos-container');
    let productosSeleccionados = JSON.parse(localStorage.getItem('productosSeleccionados')) || [];

    function agregarAlCarrito(producto) {
        const index = productosSeleccionados.findIndex(p => p.nombre === producto.nombre);
        if (index !== -1) {
            // Si el producto ya está en el carrito, aumentar la cantidad en lugar de agregarlo como nuevo
            productosSeleccionados[index].cantidad++;
        } else {
            productosSeleccionados.push(producto);
        }
        localStorage.setItem('productosSeleccionados', JSON.stringify(productosSeleccionados));
        actualizarCarrito();
    }

    function actualizarCarrito() {
        const carritoContainer = document.getElementById('carrito-container');
        if (carritoContainer) {
            carritoContainer.innerHTML = '';
            productosSeleccionados.forEach(producto => {
                const productoDiv = document.createElement('div');
                productoDiv.classList.add('producto-carrito');
                productoDiv.innerHTML = `
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                    <p>${producto.nombre}</p>
                    <p>Precio: $${producto.precio}</p>
                    <p>Cantidad: ${producto.cantidad}</p>
                `;
                carritoContainer.appendChild(productoDiv);
            });
        }
    }

    fetch('https://raw.githubusercontent.com/FidelFragoza/Sport-prime/main/src/json/productos.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(producto => {
                const productoDiv = document.createElement('div');
                productoDiv.classList.add('producto');
                productoDiv.innerHTML = `
                    <img src="${producto.image}" alt="${producto.name}">
                    <h3>${producto.name}</h3>
                    <p>${producto.description}</p>
                    <p>Precio: $${producto.price}</p>
                    <button class="agregar-carrito" data-nombre="${producto.name}" data-imagen="${producto.image}" data-precio="${producto.price}">Agregar al carrito</button>
                `;
                const botonAgregarCarrito = productoDiv.querySelector('.agregar-carrito');
                botonAgregarCarrito.addEventListener('click', () => {
                    const nombre = botonAgregarCarrito.getAttribute('data-nombre');
                    const imagen = botonAgregarCarrito.getAttribute('data-imagen');
                    const precio = parseFloat(botonAgregarCarrito.getAttribute('data-precio'));
                    const productoSeleccionado = { nombre, imagen, precio, cantidad: 1 };
                    agregarAlCarrito(productoSeleccionado);
                });
                productosContainer.appendChild(productoDiv);
            });
        });

    actualizarCarrito();
});
