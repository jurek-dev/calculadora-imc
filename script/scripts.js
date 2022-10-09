// IMC DATA
const data = [
    {
        min: 0,
        max: 16.9,
        classification: "Abaixo de 17",
        info: "Muito abaixo do peso",
        obesity: 0,
    },
    {
        min: 17,
        max: 18.4,
        classification: "Entre 17 e 18,49",
        info: "Abaixo do peso",
        obesity: "0",
    },
    {
        min: 18.5,
        max: 24.9,
        classification: "Entre 18,5 e 24,9",
        info: "Peso normal",
        obesity: "0",
    },
    {
        min: 25,
        max: 29.9,
        classification: "Entre 25 e 29,9",
        info: "Acima do peso",
        obesity: "0",
    },
    {
        min: 30,
        max: 34.9,
        classification: "Entre 30 e 34,9",
        info: "Obesidade I",
        obesity: "I",
    },
    {
        min: 35,
        max: 39.9,
        classification: "Entre 35 e 39,9",
        info: "Obesidade II",
        obesity: "II",
    },
    {
        min: 40,
        max: 99,
        classification: "Acima de 40",
        info: "Obesidade III",
        obesity: "III",
    },
];

// Seleção de elementos
const imcTable = document.querySelector("#imc-table");

const heightInput = document.querySelector("#height");
const weightInput = document.querySelector("#weight");
const calcBtn = document.querySelector("#calc-btn");
const clearBtn = document.querySelector("#clear-btn");

const calcContainer = document.querySelector("#calc-container");
const resultContainer = document.querySelector("#result-container");

const imcNumber = document.querySelector("#imc-number span");
const imcInfo = document.querySelector("#imc-info span");

const backBtn = document.querySelector("#back-btn");

// Funções
function createTable(data) {
    data.forEach(item => {
        
        const div = document.createElement("div");
        div.classList.add("table-data");

        const classification = document.createElement("p");
        classification.innerText = item.classification;

        const info = document.createElement("p");
        info.innerText = item.info;

        const obesity = document.createElement("p");
        obesity.innerText = item.obesity;

        div.appendChild(classification);
        div.appendChild(info);
        div.appendChild(obesity);

        imcTable.appendChild(div);
    });
}

function cleanInputs() {
    heightInput.value = "";
    weightInput.value = "";
    imcNumber.classList = "";
    imcInfo.classList = "";
}

function validDigits(text) {
    return text.replace(/[^0-9,]/g, "");
}

function calcImc(weight, height) {
    const imc = (weight / (height * height)).toFixed(1);
    return imc;
}

function showOrHideResults() {
    calcContainer.classList.toggle("hide");
    resultContainer.classList.toggle("hide");
}

// Inicialização
createTable(data);

// Eventos
[heightInput, weightInput].forEach((el) => {
    el.addEventListener("input", (e) => {
        const updatedValue = validDigits(e.target.value);

        e.target.value = updatedValue;
    });
});

calcBtn.addEventListener("click", (e) => {
    e.preventDefault();
    
    const height = +heightInput.value.replace(",", ".");
    const weight = +weightInput.value.replace(",", ".");

    if(!height || !weight) return;

    const imc = calcImc(weight, height);

    console.log(imc);

    let info

    data.forEach((item) => {
        if(imc >= item.min && imc <= item.max) {
            info = item.info;
        }
    });

    if(!info) return;

    imcNumber.innerText = imc;
    imcInfo.innerText = info;

    switch(info) {
        case "Muito abaixo do peso":
            imcNumber.classList.add("level-1");
            imcInfo.classList.add("level-1");
            break;
        case "Abaixo do peso":
            imcNumber.classList.add("level-2");
            imcInfo.classList.add("level-2");
            break;
        case "Peso normal":
            imcNumber.classList.add("level-3");
            imcInfo.classList.add("level-3");
            break;
        case "Acima do peso":
            imcNumber.classList.add("level-4");
            imcInfo.classList.add("level-4");
            break;
        case "Obesidade I":
            imcNumber.classList.add("level-5");
            imcInfo.classList.add("level-5");
            break;
        case "Obesidade II":
            imcNumber.classList.add("level-6");
            imcInfo.classList.add("level-6");
            break;
        case "Obesidade III":
            imcNumber.classList.add("level-7");
            imcInfo.classList.add("level-7");
            break;
    }

    showOrHideResults();
});

clearBtn.addEventListener("click", (e) => {
    e.preventDefault();
    cleanInputs();
});

backBtn.addEventListener("click", () => {
    cleanInputs();
    showOrHideResults();
})