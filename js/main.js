function convertirTemperatura() {
  const input = document.querySelector("#tempInput").value;
  const unidad = document.querySelector("#unitSelect").value;
  const campoResultado = document.querySelector("#result");

  if (!input || !unidad) return;

  const temp = parseFloat(input);
  let resultado = 0;

  if (unidad === "toF") {
    resultado = (temp * 9) / 5 + 32;
  } else if (unidad === "toC") {
    resultado = ((temp - 32) * 5) / 9;
  }

  campoResultado.value = resultado.toFixed(2);

  const nuevoRegistro = {
    input: temp,
    result: resultado.toFixed(2),
    unidad,
  };

  const historial =
    JSON.parse(localStorage.getItem("historialTemperatura")) || [];
  historial.push(nuevoRegistro);
  localStorage.setItem("historialTemperatura", JSON.stringify(historial));

  dibujarHistorial();
}

function dibujarHistorial() {
  const listaRegistros = document.querySelector("#historyList");
  listaRegistros.innerHTML = "";

  const historial =
    JSON.parse(localStorage.getItem("historialTemperatura")) || [];

  historial.map((entry, index) => {
    const li = document.createElement("li");
    const label = `${entry.input}° ${entry.unidad === "toF" ? "C" : "F"} → ${
      entry.result
    }° ${entry.unidad === "toF" ? "F" : "C"}`;

    li.innerHTML = `
      <span>${label}</span>
      <button onclick="eliminarRegistro(${index})">X</button>
    `;
    listaRegistros.appendChild(li);
  });
}

function eliminarRegistro(index) {
  const historial =
    JSON.parse(localStorage.getItem("historialTemperatura")) || [];
  const nuevoHistorial = historial.filter((_, i) => i !== index);
  localStorage.setItem("historialTemperatura", JSON.stringify(nuevoHistorial));
  dibujarHistorial();
}

dibujarHistorial();
