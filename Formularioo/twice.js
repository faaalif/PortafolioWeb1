document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('registroForm').addEventListener('submit', function(e) {
        e.preventDefault(); // Evita el envío normal del formulario
        
        // Limpiar errores anteriores
        document.querySelectorAll('.error').forEach(el => el.textContent = '');
        
        // Obtener valores del formulario
        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const fechaNacimiento = document.getElementById('fechaNacimiento').value;
        const genero = document.getElementById('genero').value;
        const terminos = document.getElementById('terminos').checked;
        
        // Validaciones básicas
        let isValid = true;
        
        if (nombre === '') {
            document.getElementById('nombreError').textContent = 'El nombre es requerido';
            isValid = false;
        }
        
        if (email === '') {
            document.getElementById('emailError').textContent = 'El email es requerido';
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            document.getElementById('emailError').textContent = 'Ingrese un email válido';
            isValid = false;
        }
        
        if (password.length < 6) {
            document.getElementById('passwordError').textContent = 'La contraseña debe tener al menos 6 caracteres';
            isValid = false;
        }
        
        if (!fechaNacimiento) {
            document.getElementById('fechaError').textContent = 'La fecha de nacimiento es requerida';
            isValid = false;
        }
        
        if (!terminos) {
            document.getElementById('terminosError').textContent = 'Debe aceptar los términos y condiciones';
            isValid = false;
        }
        
        if (!isValid) {
            return;
        }
        
        // Mostrar resultados
        const resultadoDiv = document.getElementById('resultado');
        resultadoDiv.innerHTML = `
            <h2>Datos registrados:</h2>
            <p><strong>Nombre:</strong> ${nombre}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Fecha de nacimiento:</strong> ${formatFecha(fechaNacimiento)}</p>
            <p><strong>Género:</strong> ${genero || 'No especificado'}</p>
        `;
    });
    
    function formatFecha(fechaStr) {
        if (!fechaStr) return 'No especificada';
        const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(fechaStr).toLocaleDateString('es-ES', opciones);
    }
});