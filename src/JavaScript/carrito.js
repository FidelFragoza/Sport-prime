document.addEventListener('DOMContentLoaded', function() {
    const carritoContainer = document.getElementById('carrito-container');
    const totalSinIvaElement = document.getElementById('total-sin-iva');
    const totalConIvaElement = document.getElementById('total-con-iva');

    let productosSeleccionados = JSON.parse(localStorage.getItem('productosSeleccionados')) || [];

    function eliminarProducto(nombre) {
        productosSeleccionados = productosSeleccionados.filter(producto => producto.nombre !== nombre);
        localStorage.setItem('productosSeleccionados', JSON.stringify(productosSeleccionados));
        mostrarProductosEnCarrito();
    }

    function cambiarCantidad(nombre, nuevaCantidad) {
        productosSeleccionados.forEach(producto => {
            if (producto.nombre === nombre) {
                producto.cantidad = nuevaCantidad;
            }
        });
        localStorage.setItem('productosSeleccionados', JSON.stringify(productosSeleccionados));
        mostrarProductosEnCarrito();
    }

    function mostrarProductosEnCarrito() {
        if (carritoContainer) {
            carritoContainer.innerHTML = '';
            productosSeleccionados.forEach(producto => {
                const productoDiv = document.createElement('div');
                productoDiv.classList.add('producto-carrito');
                productoDiv.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <div class="producto-info">
                    <h3>${producto.nombre}</h3>
                    <p>Precio: $${producto.precio}</p>
                </div>
                <p>Cantidad: 
                    <select class="cantidad-producto" data-nombre="${producto.nombre}">
                        <option value="1" ${producto.cantidad === 1 ? 'selected' : ''}>1</option>
                        <option value="2" ${producto.cantidad === 2 ? 'selected' : ''}>2</option>
                        <option value="3" ${producto.cantidad === 3 ? 'selected' : ''}>3</option>
                    </select>
                </p>
                <button class="eliminar-producto" data-nombre="${producto.nombre}">X</button>
            `;

                const selectCantidad = productoDiv.querySelector('.cantidad-producto');
                selectCantidad.addEventListener('change', () => {
                    const nuevaCantidad = parseInt(selectCantidad.value);
                    cambiarCantidad(producto.nombre, nuevaCantidad);
                });

                const botonEliminar = productoDiv.querySelector('.eliminar-producto');
                botonEliminar.addEventListener('click', () => {
                    const nombreProducto = botonEliminar.getAttribute('data-nombre');
                    eliminarProducto(nombreProducto);
                });
                carritoContainer.appendChild(productoDiv);
            });

            // Calcular totales
            calcularTotales();
        }
    }

    function calcularTotales() {
        const totalSinIva = productosSeleccionados.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);
        const totalConIva = totalSinIva * 1.16; // Suponiendo un IVA del 16%

        if (totalSinIvaElement) {
            totalSinIvaElement.textContent = `$${totalSinIva.toFixed(2)}`;
        }
        if (totalConIvaElement) {
            totalConIvaElement.textContent = `$${totalConIva.toFixed(2)}`;
        }
    }

    mostrarProductosEnCarrito();

    // Event listener para el botón que redirige al carrito
    const verCarritoButton = document.querySelector('#carrito');
    if (verCarritoButton) {
        verCarritoButton.addEventListener('click', function () {
            window.location.href = '../html/carrito.html';
        });
    }

    // Event listener para el botón que redirige al carrito
    const volverInicioButton = document.querySelector('#volver');
    if (volverInicioButton) {
        volverInicioButton.addEventListener('click', function () {
            window.location.href = '../html/inicio.html';
        });
    }
});
