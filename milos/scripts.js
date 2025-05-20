const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");
const chatbox = document.getElementById("chatbox");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const userMessage = input.value.trim();
  if (!userMessage) return;

  addMessage("user", userMessage);
  respondTo(userMessage.toLowerCase());
  input.value = "";
});

function addMessage(sender, text) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.textContent = text;
  chatbox.appendChild(msg);
  chatbox.scrollTop = chatbox.scrollHeight;
}

function respondTo(message) {
  let response = "Lo siento, no entendí eso. ¿Puedes repetirlo?";

  if (message.includes("hola") || message.includes("buenos dias")) {
    response = "¡Hola! Bienvenido/a ¿Buscas alguna fragancia en particular?";
  } else if (message.includes("perfumes") || message.includes("fragancias")) {
    response = "Tenemos perfumes para dama, caballero y unisex. ¿Te gustaría ver nuestras promociones?";
  } else if (message.includes("horario")) {
    response = "Nuestro horario es de lunes a sábado de 10:00 a.m. a 7:00 p.m.";
  } else if (message.includes("contacto") || message.includes("whatsapp")) {
    response = "Puedes contactarnos por WhatsApp al 4443135348 o en nuestras redes sociales.";
  } else if (message.includes("precio") || message.includes("cuesta")) {
    response = "Los precios varían según la marca y presentación. ¿Hay alguno que te interese?";
  }

  setTimeout(() => addMessage("bot", response), 500);
}
