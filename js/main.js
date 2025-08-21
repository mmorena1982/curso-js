let conversionesDisponibles = [];

const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const obtenerConversionesDesdeJson = async () => {
  mostrarToastCargando();

  await esperar(1000);

  try {
    const response = await fetch("./data/conversiones.json");
    const data = await response.json();
    conversionesDisponibles = data.conversiones;
    poblarSelectDeConversiones(conversionesDisponibles);
    mostrarToastExito();
  } catch (error) {
    Toastify({
      text: "Error al cargar las conversiones",
      duration: 3000,
      gravity: "top",
      position: "right",
      style: { background: "#e74c3c" },
    }).showToast();
    console.error("Error al cargar JSON:", error);
  }
};

const poblarSelectDeConversiones = (conversiones) => {
  const select = document.querySelector("#unidades");
  select.innerHTML = `<option disabled selected>Seleccioná el tipo de conversión</option>`;

  conversiones.forEach((conv) => {
    const option = document.createElement("option");
    option.value = conv.id;
    option.textContent = `${conv.origen} → ${conv.destino}`;
    select.appendChild(option);
  });
};

const mostrarDescripcionConversion = () => {
  const seleccion = document.querySelector("#unidades").value;
  const info = conversionesDisponibles.find((c) => c.id === seleccion);
  const desc = document.querySelector("#descripcionConversion");

  desc.textContent = info
    ? `${info.descripcion}. Fórmula: ${info.formula}`
    : "";
};

const convertirTemperatura = () => {
  const input = parseFloat(document.querySelector("#tempInput").value);
  const unidad = document.querySelector("#unidades").value;
  const resultInput = document.querySelector("#result");

  if (isNaN(input) || !unidad) return;

  let resultado = 0;
  if (unidad === "toF") {
    resultado = (input * 9) / 5 + 32;
  } else if (unidad === "toC") {
    resultado = ((input - 32) * 5) / 9;
  }

  resultInput.value = resultado.toFixed(2);

  const nuevoRegistro = {
    input,
    result: resultado.toFixed(2),
    unidad,
  };

  const historial = obtenerHistorial();
  historial.push(nuevoRegistro);
  guardarHistorial(historial);
  dibujarHistorial(historial);
};

const obtenerHistorial = () =>
  JSON.parse(localStorage.getItem("historialTemperatura")) || [];

const guardarHistorial = (data) =>
  localStorage.setItem("historialTemperatura", JSON.stringify(data));

const dibujarHistorial = (historial = obtenerHistorial()) => {
  const lista = document.querySelector("#historial");
  lista.innerHTML = "";

  historial.forEach((item, index) => {
    const origen = item.unidad === "toF" ? "C" : "F";
    const destino = item.unidad === "toF" ? "F" : "C";
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${item.input}° ${origen} → ${item.result}° ${destino}</span>
      <button onclick="eliminarRegistro(${index})">X</button>
    `;
    lista.appendChild(li);
  });
};

const eliminarRegistro = (index) => {
  const historial = obtenerHistorial();
  const nuevo = historial.filter((_, i) => i !== index);
  guardarHistorial(nuevo);
  dibujarHistorial(nuevo);
};

const mostrarToastCargando = () => {
  Toastify({
    text: "Cargando conversiones disponibles...",
    duration: 1000,
    gravity: "top",
    position: "right",
    style: {
      background: "#f39c12",
    },
  }).showToast();
};

const mostrarToastExito = () => {
  Toastify({
    text: "Conversiones disponibles cargadas con éxito",
    duration: 3000,
    gravity: "top",
    position: "right",
    style: {
      background: "#27ae60",
    },
  }).showToast();
};

window.onload = () => {
  obtenerConversionesDesdeJson();
  dibujarHistorial();
  document.querySelector("#unidades").onchange = mostrarDescripcionConversion;
};
