const minVal = 10; maxVal = 160;

window.onload = function () {
    const btns = document.querySelectorAll('.btn');
    const mbrs = document.querySelectorAll('.ms');

    btns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            const btnNum = Number(this.value);
            const elem = document.getElementById('m' + (btnNum % 5));
            const val = Number(elem.value);
            
            elem.value = (btnNum < 5) ? incrementValue(val) : decrementValue(val);
            checkValue(elem.value, btnNum);
            const result = calcValues();
            displayResult(result);
        });
    });

    mbrs.forEach(function (mbr) {
        mbr.addEventListener('input', function () {
            const val = this.value;
            const mbrNum = Number(this.name);
            checkValue(val, mbrNum);
            const result = calcValues();
            displayResult(result);
        });
    });

    document.addEventListener("dblclick", function(e){ e.preventDefault(); }, { passive: false });
}

function incrementValue(value) {
    if (value < minVal - 5) value = minVal - 5;
    const res = Math.floor(value / 5) * 5 + 5;
    return res;
}

function decrementValue(value) {
    if (value > maxVal + 5) value = maxVal + 5;
    const res = Math.ceil(value / 5) * 5 - 5;
    return res;
}

function checkValue(value, num) {
    if (num >= 5) num -= 5;
    document.getElementById('b' + num).disabled = (value >= maxVal);
    document.getElementById('b' + (num + 5)).disabled = (value <= minVal);
}

function calcValues() {
    let values = [];
    const mbrs = document.querySelectorAll('.ms');
    mbrs.forEach(function (mbr) {
        values.push(Number(mbr.value));
    });

    const res = {
        leaderValue: getLeaderValue(),
        internalValue: calcInternalValue(),
        effectiveValue: calcEffectiveValue(),
        ratio: calcRatio()
    };
    return res;

    function getLeaderValue() {
        const res = values[0];
        return res;
    }
    function calcInternalValue() {
        let res = 0;
        values.forEach(function (value) { res += value; });
        return res;
    }
    function calcEffectiveValue() {
        const res = (calcInternalValue() - getLeaderValue()) / 5 + getLeaderValue();
        return res;
    }
    function calcRatio() {
        const res = Math.round((calcEffectiveValue() / 100 + 1) * 1000) / 1000;
        return res;
    }
}

function displayResult(result) {
    document.getElementById('leader-value').innerText = result.leaderValue;
    document.getElementById('internal-value').innerText = result.internalValue;
    document.getElementById('effective-value').innerText = result.effectiveValue;
    document.getElementById('ratio').innerText = result.ratio;
}