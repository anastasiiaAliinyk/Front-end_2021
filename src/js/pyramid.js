function Pyramid (appContainer) {
  let pyramidNumberElement;
  let pyramidErrorElement;

  this.init = () => {
      bindEvents();
  }

  function create(number) {
      if (!number) {
          return;
      }

      let sum = 0;
      let count = 0;
      const pyramidOutputElement = appContainer.querySelector(".pyramid-output");
      const pyramidCountElement = appContainer.querySelector(".pyramid-count");
      
      let result = "";
      for (let i = 1; i <= number; i++) {
          sum += i;
          if (sum > number) {
              result += " * ".repeat(number - (sum - i));
              break;
          }

          result += " * ".repeat(i);

          count++;
          result += "<br>";
      }

      pyramidOutputElement.innerHTML = result;
      pyramidCountElement.textContent = `We have comleted ${count} rows!`;
  }

  function showPyramidError(error) {
      pyramidErrorElement = pyramidErrorElement || appContainer.querySelector(".control-panel .error");
      pyramidErrorElement.textContent = error;
  }
  
  function clearError() {
      showPyramidError("");
  }

  function validateNumber(number) {
      const minAllowedNumber = +pyramidNumberElement.min;
      const maxAllowedNumber = +pyramidNumberElement.max;
  
      clearError();
  
      if (!number || number <= minAllowedNumber || number > maxAllowedNumber) {
        showPyramidError(`Please input a number > ${minAllowedNumber} and <= ${maxAllowedNumber}`);
        return false;
      }

      if (!Number.isInteger(number)) {
          showPyramidError("Please input only integer");
          return false;
      }

      return true;
    }

  function bindEvents () {
      let pyramidNumber;
      let pyramidNumberValidationError = false;
  
      pyramidNumberElement = appContainer.querySelector('.control-panel input[name="number-1"]');

      pyramidNumberElement.addEventListener("change", (e) => {
          pyramidNumber = pyramidNumberValidationError ? null : +e.target.value;
      });
      pyramidNumberElement.addEventListener("keyup", (e) => {
          pyramidNumberValidationError = !validateNumber(+e.target.value);
      });
  
      const createEl = appContainer.querySelector('.control-panel button[name="create"]');
      createEl.addEventListener("click", () => {
        create(pyramidNumber);
      });
  }
};

(function () {
  const pyramid = document.getElementById("pyramid");

  (new Pyramid(pyramid)).init()
})();
