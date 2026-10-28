
const formulario = document.getElementById("formulario-edad");
const campoFecha = document.getElementById("fecha-nacimiento");
const resultado = document.getElementById("resultado");

function obtenerFechaActual() {
    const ahora = new Date();

    return new Date(
        ahora.getFullYear(),
        ahora.getMonth(),
        ahora.getDate()
    );
}

const hoy = obtenerFechaActual();

const anioHoy = hoy.getFullYear();
const mesHoy = String(hoy.getMonth() + 1).padStart(2, "0");
const diaHoy = String(hoy.getDate()).padStart(2, "0");

campoFecha.max = `${anioHoy}-${mesHoy}-${diaHoy}`;

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const valor = campoFecha.value;

    if (!valor) {
        resultado.textContent =
            "Por favor, selecciona tu fecha de nacimiento.";
        return;
    }

    const partes = valor.split("-").map(Number);

    const anioNacimiento = partes[0];
    const mesNacimiento = partes[1];
    const diaNacimiento = partes[2];

    const nacimiento = new Date(
        anioNacimiento,
        mesNacimiento - 1,
        diaNacimiento
    );


    if (
        nacimiento.getFullYear() !== anioNacimiento ||
        nacimiento.getMonth() !== mesNacimiento - 1 ||
        nacimiento.getDate() !== diaNacimiento
    ) {
        resultado.textContent =
            "La fecha seleccionada no es válida.";
        return;
    }


    if (nacimiento > hoy) {
        resultado.textContent =
            "La fecha de nacimiento no puede ser futura.";
        return;
    }


    let anios = hoy.getFullYear() - anioNacimiento;


    let mesCumple = mesNacimiento - 1;
    let diaCumple = diaNacimiento;

    if (mesCumple === 1 && diaCumple === 29) {
        const ultimoDiaFebrero = new Date(
            hoy.getFullYear(), 2, 0
        ).getDate();

        diaCumple = Math.min(diaCumple, ultimoDiaFebrero);
    }

    const cumpleEsteAnio = new Date(
        hoy.getFullYear(),
        mesCumple,
        diaCumple
    );

    if (cumpleEsteAnio > hoy) {
        anios--;
    }

    let ultimoCumpleDia = diaNacimiento;

    if (mesNacimiento === 2 && diaNacimiento === 29) {
        const ultimoDiaFebrero = new Date(
            hoy.getFullYear(), 2, 0
        ).getDate();

        ultimoCumpleDia = Math.min(
            diaNacimiento,
            ultimoDiaFebrero
        );
    }

    const ultimoCumple = new Date(
        hoy.getFullYear() - (cumpleEsteAnio > hoy ? 1 : 0),
        mesNacimiento - 1,
        ultimoCumpleDia
    );

    let meses =
        (hoy.getFullYear() - ultimoCumple.getFullYear()) * 12 +
        hoy.getMonth() - ultimoCumple.getMonth();

    if (hoy.getDate() < ultimoCumple.getDate()) {
        meses--;
    }

    const fechaBase = new Date(
        ultimoCumple.getFullYear(),
        ultimoCumple.getMonth() + meses,
        ultimoCumple.getDate()
    );

    if (fechaBase.getDate() !== ultimoCumple.getDate()) {
        fechaBase.setDate(0);
    }


    const milisegundosPorDia = 1000 * 60 * 60 * 24;

    const dias = Math.round(
        (hoy - fechaBase) / milisegundosPorDia
    );


    resultado.replaceChildren();

    resultado.append("Tienes ");

    const textoEdad = document.createElement("strong");

    textoEdad.textContent =
        `${anios} años, ${meses} meses y ${dias} días`;

    resultado.append(textoEdad);
    resultado.append(" de edad.");
});