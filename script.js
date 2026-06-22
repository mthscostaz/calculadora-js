const result = document.getElementById("result");

function addValue(value) {
  const currentValue = result.value;
  const operators = ["+", "-", "*", "/", "%"];
  const lastCharacter = currentValue.slice(-1);

  if (currentValue === "0" || currentValue === "Erro") {
    if (value === ".") {
      result.value = "0.";
      return;
    }

    if (operators.includes(value) && value !== "-") {
      return;
    }

    result.value = value;
    return;
  }

  if (operators.includes(lastCharacter) && operators.includes(value)) {
    result.value = currentValue.slice(0, -1) + value;
    return;
  }

  result.value += value;
}

function clearDisplay() {
  result.value = "0";
}

function deleteLast() {
  if (result.value.length === 1 || result.value === "Erro") {
    result.value = "0";
    return;
  }

  result.value = result.value.slice(0, -1);
}

function calculate() {
  try {
    const expression = result.value;

    const isValidExpression = /^[0-9+\-*/%.() ]+$/.test(expression);

    if (!isValidExpression) {
      result.value = "Erro";
      return;
    }

    const calculation = Function(`"use strict"; return (${expression})`)();

    if (!Number.isFinite(calculation)) {
      result.value = "Erro";
      return;
    }

    result.value = Number.isInteger(calculation)
      ? calculation
      : Number(calculation.toFixed(8));
  } catch {
    result.value = "Erro";
  }
}
