const domino = document.getElementById("domino");
const dominoTopsContainer = domino.querySelector(".domino-tops");
const dominoBottomsContainer = domino.querySelector(".domino-bottoms");
const dominoResultContainer = domino.querySelector(".domino-result");

const generateElement = domino.querySelector('.control-panel button[name="generate"]');

function createRandomArray(length = 6, max = 5) {
    return Array.apply(null, Array(length)).map(function() {
        return Math.round(Math.random() * max + 1);
    });
};

let tops;
let bottoms;

generateElement.addEventListener("click", () => {
    tops = createRandomArray();
    bottoms = createRandomArray();

    const originTops = [...tops];
    const originBottoms = [...bottoms];

    dominoTopsContainer.textContent = tops;
    dominoBottomsContainer.textContent = bottoms;

    //Number, which we will have in a row
    let completedNumber = null;

    const allNumbers = [...tops, ...bottoms];

    const result = allNumbers.reduce((result, number) => {
        result[number] = result[number] ? result[number] + 1 : 1;
        return result;
    }, {});

    const maxCountNumbers = Math.max.apply(null, Object.values(result));

    //Minimal count of numbers we need to complete the row with the same numbers;
    let needCountNumbers = 6;
    let foundNumber;

    for (let key in result) {
        if (result[key] === maxCountNumbers) {
            foundNumber = +key;
        }
    };

    for (let i = 0; i < 6; i++) {
        if (tops[i] === bottoms[i]) {
            needCountNumbers++;
        }
    };

    if (maxCountNumbers === needCountNumbers) {
        topsCount = tops.filter(value => value === foundNumber).length;
        bottomsCount = bottoms.filter(value => value === foundNumber).length;

        completedNumber = topsCount + bottomsCount === maxCountNumbers ? foundNumber : null;
    }

    if (completedNumber !== null ) {
        let minCount = 0;

        if (bottomsCount > topsCount) {
            for (let i = 0; i < 6; i++) {
                if (tops[i] === completedNumber && tops[i] !== bottoms[i]) {
                    tops[i] = bottoms[i];
                    bottoms[i] = completedNumber;

                    minCount++;
                }
            }

            alert(`${JSON.stringify(originTops)} \n ${JSON.stringify(originBottoms)} \n\n\n ${JSON.stringify(tops)} \n ${JSON.stringify(bottoms)} \n\n\n You did it! You need - ${minCount} times`);

            dominoResultContainer.textContent = `You did it! :) ${minCount}`;
            return;
        }

        for (let i = 0; i < 6; i++) {
            if (bottoms[i] === completedNumber && bottoms[i] !== tops[i]) {
                bottoms[i] = tops[i];
                tops[i] = completedNumber;

                minCount++;
            }
        }

        alert(`${JSON.stringify(originTops)} \n ${JSON.stringify(originBottoms)} \n\n\n ${JSON.stringify(tops)} \n ${JSON.stringify(bottoms)} \n\n\n You did it! You need - ${minCount} times`);

        dominoResultContainer.textContent = `You did it! :) ${minCount}`;
    } else {
        dominoResultContainer.textContent = "You lose. Try again! :("
    }
});
