document.addEventListener('DOMContentLoaded', function() {
    // Respuestas correctas
    const correctAnswers = {
        q1: 'b',
        q2: 'b',
        q3: 'b',
        q4: 'c',
        q5: 'b'
    };
    
    // Texto de retroalimentación para cada pregunta
    const feedbackText = {
        q1: {
            correct: "Correcto: HTML significa Hyper Text Markup Language.",
            incorrect: "Incorrecto: La respuesta correcta es 'Hyper Text Markup Language'."
        },
        q2: {
            correct: "Correcto: La propiedad correcta es 'background-color'.",
            incorrect: "Incorrecto: La propiedad correcta es 'background-color'."
        },
        q3: {
            correct: "Correcto: En JavaScript se usa 'var' para declarar variables.",
            incorrect: "Incorrecto: La forma correcta es 'var x;'."
        },
        q4: {
            correct: "Correcto: La etiqueta &lt;link&gt; se usa para enlazar CSS.",
            incorrect: "Incorrecto: La etiqueta correcta es &lt;link&gt;."
        },
        q5: {
            correct: "Correcto: El método correcto es getElementById().",
            incorrect: "Incorrecto: El método correcto es getElementById()."
        }
    };
    
    const submitBtn = document.getElementById('submitBtn');
    const generatePdfBtn = document.getElementById('generatePdfBtn');
    const resultsDiv = document.getElementById('results');
    const scoreDiv = document.getElementById('score');
    const feedbackDiv = document.getElementById('feedback');
    const form = document.getElementById('diagnosticForm');
    let resultsChart = null;
    
    submitBtn.addEventListener('click', evaluateAnswers);
    generatePdfBtn.addEventListener('click', generatePDF);
    
    function evaluateAnswers() {
        let score = 0;
        const userAnswers = {};
        let feedbackHTML = '<h3>Detalle por pregunta:</h3><ul>';
        
        // Verificar cada pregunta
        for (let i = 1; i <= 5; i++) {
            const questionName = 'q' + i;
            const selectedOption = form.elements[questionName].value;
            userAnswers[questionName] = selectedOption;
            
            if (selectedOption === correctAnswers[questionName]) {
                score++;
                feedbackHTML += `<li class="correct">${feedbackText[questionName].correct}</li>`;
            } else {
                feedbackHTML += `<li class="incorrect">${feedbackText[questionName].incorrect}</li>`;
            }
        }
        
        feedbackHTML += '</ul>';
        feedbackDiv.innerHTML = feedbackHTML;
        
        // Calcular porcentaje
        const percentage = (score / 5) * 100;
        scoreDiv.textContent = `Puntuación: ${score}/5 (${percentage}%)`;
        
        // Mostrar resultados
        resultsDiv.style.display = 'block';
        
        // Generar gráfico
        createChart(score, 5 - score);
    }
    
    function createChart(correct, incorrect) {
        const ctx = document.getElementById('resultsChart').getContext('2d');
        
        // Destruir gráfico anterior si existe
        if (resultsChart) {
            resultsChart.destroy();
        }
        
        resultsChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Correctas', 'Incorrectas'],
                datasets: [{
                    label: 'Resultados',
                    data: [correct, incorrect],
                    backgroundColor: [
                        'rgba(46, 204, 113, 0.7)',
                        'rgba(231, 76, 60, 0.7)'
                    ],
                    borderColor: [
                        'rgba(46, 204, 113, 1)',
                        'rgba(231, 76, 60, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 5,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
    }
    
    function generatePDF() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Título
        doc.setFontSize(20);
        doc.setTextColor(44, 62, 80);
        doc.text('Resultados del Diagnóstico', 105, 20, null, null, 'center');
        
        // Puntuación
        doc.setFontSize(16);
        doc.setTextColor(39, 174, 96);
        doc.text(scoreDiv.textContent, 105, 40, null, null, 'center');
        
        // Gráfico (convertir canvas a imagen)
        const canvas = document.getElementById('resultsChart');
        const chartImage = canvas.toDataURL('image/png');
        doc.addImage(chartImage, 'PNG', 50, 60, 110, 80);
        
        // Retroalimentación
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        
        const feedbackItems = feedbackDiv.querySelectorAll('li');
        let yPosition = 150;
        
        feedbackItems.forEach((item, index) => {
            if (yPosition > 270) {
                doc.addPage();
                yPosition = 20;
            }
            
            const text = item.textContent;
            const color = item.classList.contains('correct') ? 
                [46, 204, 113] : [231, 76, 60];
            
            doc.setTextColor(...color);
            doc.text(`${index + 1}. ${text}`, 15, yPosition);
            yPosition += 10;
        });
        
        // Guardar PDF
        doc.save('diagnostico_programacion_web.pdf');
    }
});