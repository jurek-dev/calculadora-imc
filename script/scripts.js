// IMC DATA
const data = [
    {
        min: 0,
        max: 16.9,
        classification: "Abaixo de 17",
        info: "Muito abaixo do peso",
        text: "Seu IMC indica que você está muito abaixo do peso. Aconselhamos procurar por um médico especializado.",
        obesity: 0,
    },
    {
        min: 17,
        max: 18.4,
        classification: "Entre 17 e 18,49",
        info: "Abaixo do peso",
        text: "Seu IMC indica que você está abaixo do peso ideal para sua altura. Você pode ser aconselhado a ganhar um pouco de peso.",
        obesity: "0",
    },
    {
        min: 18.5,
        max: 24.9,
        classification: "Entre 18,5 e 24,9",
        info: "Peso normal",
        text: "Seu IMC indica que você está com um peso saudável para sua altura. Ao manter um peso saudável, você diminui o risco de desenvolver sérios problemas de saúde.",
        obesity: "0",
    },
    {
        min: 25,
        max: 29.9,
        classification: "Entre 25 e 29,9",
        info: "Acima do peso",
        text: "Um IMC entre 25-29.9 indica que você está um pouco acima do peso. Por motivos de saúde você pode ser aconselhado a perder peso. Recomenda-se que fale com seu médico ou nutricionista para aconselhamento.",
        obesity: "0",
    },
    {
        min: 30,
        max: 34.9,
        classification: "Entre 30 e 34,9",
        info: "Obesidade I",
        text: "Um IMC acima de 30 indica que você está muito acima do peso. Sua saúde pode estar sendo prejudicada. Aconselhamos que procure por um médico nutricionista para realização de exames e acompanhamento.",
        obesity: "I",
    },
    {
        min: 35,
        max: 39.9,
        classification: "Entre 35 e 39,9",
        info: "Obesidade II",
        text: "Um IMC acima de 35 indica que você está muito acima do peso. Aconselhamos que procure por um médico nutricionista para realização de exames e acompanhamento.",
        obesity: "II",
    },
    {
        min: 40,
        max: 99,
        classification: "Acima de 40",
        info: "Obesidade III",
        text: "Um IMC acima de 40 indica que você tem obesidade mórbida. Aconselhamos que procure por um médico nutricionista com urgência para melhores esclarecimentos.",
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
const imcText = document.querySelector('#imc-text span');

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
    imcText.classList = "";
    document.body.classList = "";
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

    let text

    data.forEach((item) => {
        if(imc >= item.min && imc <= item.max) {
            text = item.text;
        }
    });

    if(!info) return;

    imcNumber.innerText = imc;
    imcInfo.innerText = info;
    imcText.innerText = text;

    switch(info) {
        case "Muito abaixo do peso":
            document.body.classList.add("level-1");
            imcNumber.classList.add("category-1");
            break;
        case "Abaixo do peso":
            document.body.classList.add("level-2");
            imcNumber.classList.add("category-2");
            break;
        case "Peso normal":
            document.body.classList.add("level-3");
            imcNumber.classList.add("category-3");
            break;
        case "Acima do peso":
            document.body.classList.add("level-4");
            imcNumber.classList.add("category-4");
            break;
        case "Obesidade I":
            document.body.classList.add("level-5");
            imcNumber.classList.add("category-5");
            break;
        case "Obesidade II":
            document.body.classList.add("level-6");
            imcNumber.classList.add("category-6");
            break;
        case "Obesidade III":
            document.body.classList.add("level-7");
            imcNumber.classList.add("category-7");
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