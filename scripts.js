const form = document.getElementById("converterForm");
const amount = document.getElementById("amount");
const fromCurrency = document.getElementById("fromCurrency");
const convertedAmount = document.getElementById("convertedAmount");
const toCurrency = document.getElementById("toCurrency");
const loading = document.querySelector(".loading");
const result = document.querySelector(".result");
const error = document.querySelector(".error");

const API_URL = "https://api.exchangerate-api.com/v4/latest/";

async function convertMoney() {
  loading.style.display = "block";
  error.style.display = "none";
  result.style.display = "none";

  try {
    const response = await fetch(API_URL + fromCurrency.value);
    const data = await response.json();

    const rate = data.rates[toCurrency.value];
    const convertedValue = (amount.value * rate).toFixed(2);

    convertedAmount.value = convertedValue;
    result.style.display = "block";

    result.innerHTML = `
      <div style="font-size: 1rem;">
        ${amount.value} ${fromCurrency.value} = ${convertedValue} ${toCurrency.value}
      </div>
      <div style="font-size: 0.8rem; opacity: 0.8;">
        Taxa: 1 ${fromCurrency.value} = ${rate} ${toCurrency.value}
      </div>
    `;
  } catch (err) {
    console.error(err);
    error.style.display = "block";
    error.innerHTML = '❌ Falha ao converter moeda. Tente novamente mais tarde.';
  }

  loading.style.display = "none";
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  convertMoney();
});
