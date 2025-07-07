const FACTOR_MULTIPLICACION = 9 / 5;
const FACTOR_RESTA = 32;

function convertir(gradosAConvertir, tipoConversion) {
  switch (tipoConversion) {
    case "1":
      alert(
        gradosAConvertir +
          " grados Celsius equivalen a " +
          (gradosAConvertir * FACTOR_MULTIPLICACION + FACTOR_RESTA) +
          " grados Fahrenheit"
      );
      principal();
      break;
    case "2":
      alert(
        gradosAConvertir +
          " grados Fahrenheit equivalen a " +
          (gradosAConvertir - FACTOR_RESTA) * FACTOR_MULTIPLICACION +
          " grados Celsius"
      );
      principal();
      break;
    default:
      principal();
  }
}

function seleccioneConversion() {
  let gradosAConvertir;
  let tipoConversion = prompt(`OPERACIÓN:

    1 - Celsius a Fahrenheit
    2 - Fahrenheit a Celsius`);

  if (tipoConversion != 1 && tipoConversion != 2 && tipoConversion != null)
    principal();

  switch (tipoConversion) {
    case "1":
      gradosAConvertir = prompt(`Cuantos grados Celsius querés convertir?`);
      break;
    case "2":
      gradosAConvertir = prompt(`Cuantos grados Fahrenheit querés convertir?`);
      break;
    case null:
      return;
    default:
      principal();
  }

  convertir(gradosAConvertir, tipoConversion);
}

function principal() {
  seleccioneConversion();
}

principal();
