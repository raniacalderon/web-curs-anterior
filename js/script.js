document.addEventListener('DOMContentLoaded', () => {
    
    // MODAL DE BIENVENIDA
    if (!localStorage.getItem('visitado')) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.style.display = 'flex';
        modal.innerHTML = `<div class="modal-content">
                            <h2>¡Bienvenido a Mare Nostrum!</h2>
                            <p>Gracias por visitarnos</p>
                            <button onclick="this.parentElement.parentElement.style.display='none'">Cerrar</button>
                           </div>`;
        document.body.appendChild(modal);
        localStorage.setItem('visitado', 'true');
    }

  // VALIDACIÓN DE FORMULARIOS
    const contactoForm = document.querySelector('form');

    if (contactoForm) {
        contactoForm.addEventListener('submit', (e) => {
            const emailField = document.getElementById('email-reg');
            const passField = document.getElementById('pass'); // ID de la contraseña
            const passConfField = document.getElementById('pass-conf'); // ID de confirmación

            // Limpiamos errores previos
            if (emailField) emailField.classList.remove('input-error');
            if (passConfField) passConfField.classList.remove('input-error');

            let tieneError = false;
            let mensajeError = "";

            // 1. Validación Email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailField && !emailRegex.test(emailField.value)) {
                emailField.classList.add('input-error');
                tieneError = true;
                mensajeError = "Por favor, introduce un correo electrónico válido.";
            }

            // Validación Contraseñas (solo si existen los campos en esta página)
            if (passField && passConfField) {
                if (passField.value !== passConfField.value) {
                    passConfField.classList.add('input-error');
                    tieneError = true;
                    mensajeError = "Las contraseñas no coinciden.";
                } else if (passField.value.length < 6) {
                    passField.classList.add('input-error');
                    tieneError = true;
                    mensajeError = "La contraseña debe tener al menos 6 caracteres.";
                }
            }

            // Si hay algún error, detenemos el envío
            if (tieneError) {
                e.preventDefault();
                alert(mensajeError);
            }
        });
    }

    // MENÚ HAMBURGUESA 
    const btnMenu = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('nav-menu');
    
    if (btnMenu && menu) {
        btnMenu.addEventListener('click', () => {
            // Usamos toggle para mayor limpieza
            menu.classList.toggle('active');
        });
    }

    // LIGHTBOX DE GALERÍA 
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.querySelector('.close-lightbox');
    const galleryImages = document.querySelectorAll('.grid-item img');

    if (lightbox && lightboxImg && closeLightbox) {
        // Al clicar una imagen
        galleryImages.forEach(img => {
            img.addEventListener('click', () => {
                lightbox.style.display = 'flex';
                lightboxImg.src = img.src;
            });
        });

        // Cerrar con la X
        closeLightbox.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });

        // Cerrar al clicar fuera de la imagen
        lightbox.addEventListener('click', (e) => {
            if (e.target !== lightboxImg) {
                lightbox.style.display = 'none';
            }
        });
    }
});