function ATM(appContainer) {
  let allowedBanknotes;
  // cached dom elements
  let withdrawAmountElement;
  let withdrawAmountErrorElement;
  let withdrawInfoElement;

  this.init = (banknotes) => {
    allowedBanknotes = {...banknotes};

    bindEvents();
    showAllowedBanknotesInfo();
  }

  function withdraw(amount) {
    if (!amount) {
      clearWithdrawInfo();
      return;
    }
    const tmpAllowedBanknotes = {...allowedBanknotes};

    let allowedMoney = 0;
    const withdrawnBanknotes = {};

    const sortedBanknotes = Object.keys(tmpAllowedBanknotes)
      .sort((a, b) => b - a);

    sortedBanknotes.forEach((banknote) => {
      if (!tmpAllowedBanknotes[banknote]) {
        return;
      }
      allowedMoney += banknote * tmpAllowedBanknotes[banknote];

      const c = amount / banknote;
      if (c >= 1) {
        let numberBanknotes = Math.floor(c);

        const leftBanknotes = tmpAllowedBanknotes[banknote] - numberBanknotes;
        if (leftBanknotes < 0) {
          // take all banknotes
          numberBanknotes = tmpAllowedBanknotes[banknote];
          tmpAllowedBanknotes[banknote] = 0;
        } else {
          tmpAllowedBanknotes[banknote] = leftBanknotes
        }
        withdrawnBanknotes[banknote] = numberBanknotes;
        amount -= numberBanknotes * banknote;
      }
    });
    if (amount) {
      let info = [
        "You can't withdraw that amount of money!"
      ];
      if (!allowedMoney) {
        info.push("ATM is empty.");
      }
      showWithdrawInfo(info);
      return;
    }
    allowedBanknotes = tmpAllowedBanknotes;

    showAllowedBanknotesInfo();
    showWithdrawInfo([
      "You have successfully withdrawn the money!",
      ...Object.keys(withdrawnBanknotes).map((banknote) => {
        return `${banknote} = x ${withdrawnBanknotes[banknote]}`
      })
    ]);
  }

  function showAllowedBanknotesInfo() {
    let allowedMoney = 0;
    const info = appContainer.querySelector(".banknotes-info");

    const infoElements = Object.keys(allowedBanknotes).map((banknote) => {
      allowedMoney += banknote * allowedBanknotes[banknote];

      return `<div class="${!allowedBanknotes[banknote] ? 'banknote-zero' : ''}">
        ${banknote} = x ${allowedBanknotes[banknote]}
      </div>`
    });
    const totalSumElement = `<div class="total-sum">Total: ${allowedMoney}</div>`
    infoElements.push(totalSumElement);

    info.innerHTML = infoElements.join("");
  }

  function showWithdrawInfo(info) {
    withdrawInfoElement = withdrawInfoElement || appContainer.querySelector(".withdraw-info");
    withdrawInfoElement.innerHTML = info.map((item) => `<div>${item}</div>`).join("");
  }

  function clearWithdrawInfo() {
    showWithdrawInfo([]);
  }

  function showWithdrawAmountError(error) {
    withdrawAmountErrorElement = withdrawAmountErrorElement || appContainer.querySelector(".control-panel .error");
    withdrawAmountErrorElement.textContent = error;
  }

  function clearError() {
    showWithdrawAmountError("");
  }

  function validateAmount(amount) {
    const minAllowedWithdrawAmount = +withdrawAmountElement.min;
    const maxAllowedWithdrawAmount = +withdrawAmountElement.max;

    clearError();

    if (!amount || amount <= minAllowedWithdrawAmount || amount > maxAllowedWithdrawAmount) {
      showWithdrawAmountError(`Please input an amount > ${minAllowedWithdrawAmount} and <= ${maxAllowedWithdrawAmount}`);
      return false;
    }
    return true;
  }

  function bindEvents () {
    let withdrawAmount;
    let withdrawAmountValidationError = false;

    withdrawAmountElement = appContainer.querySelector('.control-panel input[name="amount"]');
    withdrawAmountElement.addEventListener("change", (e) => {
      withdrawAmount = withdrawAmountValidationError ? null : +e.target.value;
    });
    withdrawAmountElement.addEventListener("keyup", (e) => {
      withdrawAmountValidationError = !validateAmount(+e.target.value);
    });

    const withdrawEl = appContainer.querySelector('.control-panel button[name="withdraw"]');
    withdrawEl.addEventListener("click", () => {
      withdraw(withdrawAmount);
    });
  }
}

(function () {
  const appContainer = document.getElementById("atm-1");

  const banknotes = {
    1: 5,
    2: 5,
    5: 10,
    10: 15,
    20: 10,
    50: 20,
    100: 20,
    200: 15,
    500: 10,
    1000: 5,
  };
  (new ATM(appContainer)).init(banknotes);
})();
