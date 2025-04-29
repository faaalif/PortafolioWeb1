function sumar() {
  var n1 = document.getElementById("num1").value;
  var n2 = document.getElementById("num2").value;
  var res = parseFloat(n1) + parseFloat(n2);
  document.getElementById("resultado").innerHTML = res;
}

function restar() {
  var n1 = document.getElementById("num1").value;
  var n2 = document.getElementById("num2").value;
  var res = parseFloat(n1) - parseFloat(n2);
  document.getElementById("resultado").innerHTML = res;
}

function multiplicar() {
  var n1 = document.getElementById("num1").value;
  var n2 = document.getElementById("num2").value;
  var res = parseFloat(n1) * parseFloat(n2);
  document.getElementById("resultado").innerHTML = res;
}

function dividir() {
  var n1 = document.getElementById("num1").value;
  var n2 = document.getElementById("num2").value;
  var res = parseFloat(n1) / parseFloat(n2);
  document.getElementById("resultado").innerHTML = res;
}
