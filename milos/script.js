document.getElementById('include-phone').addEventListener('change', function() {
    const phoneField = document.querySelector('.phone-field');
    if (this.checked) {
        phoneField.style.display = 'block';
        phoneField.querySelector('input').focus();
    } else {
        phoneField.style.display = 'none';
        phoneField.querySelector('input').value = ''; // limpiar input al ocultar
    }
});

const ratingOptions = document.querySelectorAll('.rating-option');
let selectedRating = null;

ratingOptions.forEach(option => {
    option.addEventListener('click', function () {
        ratingOptions.forEach(opt => {
            opt.classList.remove('selected');
            opt.querySelector('.rating-emoji').classList.remove('selected');
        });
        this.classList.add('selected');
        this.querySelector('.rating-emoji').classList.add('selected');
        selectedRating = this.getAttribute('data-value');
        this.querySelector('input[type="radio"]').checked = true;
        this.style.transform = 'scale(1.1)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });

    option.addEventListener('mouseenter', function () {
        if (!this.classList.contains('selected')) {
            const emoji = this.querySelector('.rating-emoji');
            const value = this.getAttribute('data-value');
            emoji.style.color = getColorForValue(value);
            emoji.style.textShadow = `0 0 10px ${getColorForValue(value)}40`;
        }
    });

    option.addEventListener('mouseleave', function () {
        if (!this.classList.contains('selected')) {
            const emoji = this.querySelector('.rating-emoji');
            emoji.style.color = '';
            emoji.style.textShadow = '';
        }
    });
});

function getColorForValue(value) {
    const colors = {
        '1': '#e74c3c',
        '2': '#f39c12',
        '3': '#f1c40f',
        '4': '#2ecc71',
        '5': '#27ae60'
    };
    return colors[value] || '#95a5a6';
}

const expectationOptions = document.querySelectorAll('.expectation-option');
const otherInput = document.querySelector('.other-input');

expectationOptions.forEach(option => {
    option.addEventListener('click', function () {
        expectationOptions.forEach(opt => opt.classList.remove('selected'));
        this.classList.add('selected');
        this.querySelector('input[type="radio"]').checked = true;

        if (this.getAttribute('data-value') === 'otro') {
            otherInput.style.display = 'block';
            setTimeout(() => {
                otherInput.querySelector('input').focus();
            }, 100);
        } else {
            otherInput.style.display = 'none';
            otherInput.querySelector('input').value = ''; // limpiar input si no es otro
        }

        this.style.transform = 'scale(1.02)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });
});

document.getElementById('feedbackForm').addEventListener('submit', function (e) {
    e.preventDefault();

    if (!document.querySelector('.rating-option.selected')) {
        alert('Por favor selecciona tu nivel de satisfacción');
        return;
    }

    if (!document.querySelector('.expectation-option.selected')) {
        alert('Por favor indica si el producto cumplió con tus expectativas');
        return;
    }

    // Si se eligió "otro", validar que el campo no esté vacío
    if (document.querySelector('.expectation-option.selected').getAttribute('data-value') === 'otro') {
        const otherText = otherInput.querySelector('input').value.trim();
        if (otherText === '') {
            alert('Por favor describe tu expectativa en el campo "Otro"');
            otherInput.querySelector('input').focus();
            return;
        }
    }

    alert('¡Gracias por tus comentarios!');
    this.reset();
    resetFormUI();
});

function resetFormUI() {
    ratingOptions.forEach(opt => {
        opt.classList.remove('selected');
        opt.querySelector('.rating-emoji').classList.remove('selected');
    });

    expectationOptions.forEach(opt => {
        opt.classList.remove('selected');
    });

    otherInput.style.display = 'none';
    otherInput.querySelector('input').value = '';

    const phoneField = document.querySelector('.phone-field');
    phoneField.style.display = 'none';
    phoneField.querySelector('input').value = '';

    document.getElementById('include-phone').checked = false;
    selectedRating = null;
}

// Animación inicial para los emojis de rating
setTimeout(() => {
    ratingOptions.forEach((opt, index) => {
        setTimeout(() => {
            opt.style.transform = 'scale(1.1)';
            setTimeout(() => {
                opt.style.transform = 'scale(1)';
            }, 300);
        }, index * 100);
    });
}, 500);

document.getElementById('downloadPDF').addEventListener('click', () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Agrega un título
    doc.setFontSize(16);
    doc.text("Resumen de tu feedback:", 10, 15);

    // Agrega la calificación seleccionada
    if (selectedRating) {
        doc.setFontSize(12);
        doc.text(`Nivel de satisfacción: ${selectedRating}`, 10, 30);
    } else {
        doc.text('Nivel de satisfacción: No seleccionada', 10, 30);
    }

    // Agrega la expectativa seleccionada
    const selectedExpectation = document.querySelector('.expectation-option.selected');
    if (selectedExpectation) {
        let val = selectedExpectation.getAttribute('data-value');
        if (val === 'otro') {
            val = otherInput.querySelector('input').value.trim() || 'No especificado';
        }
        doc.text(`Expectativa: ${val}`, 10, 40);
    } else {
        doc.text('Expectativa: No seleccionada', 10, 40);
    }

    // Agrega el teléfono si está incluido
    if (document.getElementById('include-phone').checked) {
        const phoneValue = document.querySelector('.phone-field input').value.trim() || 'No especificado';
        doc.text(`Teléfono: ${phoneValue}`, 10, 50);
    }

    // Descarga el PDF
    doc.save('feedback.pdf');
});

