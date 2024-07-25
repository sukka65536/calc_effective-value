window.onload = function () {
    const btns = document.querySelectorAll('.btn');
    const mbrs = document.querySelectorAll('.ms');

    btns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            const btnNum = Number(this.value);
            const elem = document.getElementById('m' + (btnNum % 5));
            const val = Number(elem.value);

            if (btnNum < 5){
                elem.value = incrementValue(val);
                if (elem.value >= 160) this.disabled = true;
                document.getElementById('b' + (btnNum + 5)).disabled = false;
            } else {
                elem.value = decrementValue(val);
                if (elem.value <= 10) this.disabled = true;
                document.getElementById('b' + (btnNum - 5)).disabled = false;
            }
            const result = calcValues();
            displayResult(result);
        });
    });

    mbrs.forEach(function (mbr) {
        mbr.addEventListener('input', function () {
            const val = this.value;
            const mbrNum = Number(this.name);
            document.getElementById('b' + mbrNum).disabled = (val >= 160);
            document.getElementById('b' + (mbrNum + 5)).disabled = (val <= 10);
            const result = calcValues();
            displayResult(result);
        });
    });

    document.addEventListener("dblclick", function(e){ e.preventDefault();}, { passive: false });
}

function incrementValue(value) {
    const res = Math.floor(value / 5) * 5 + 5;
    return res;
}

function decrementValue(value) {
    const res = Math.ceil(value / 5) * 5 - 5;
    return res;
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
        const res = Math.floor((calcEffectiveValue() / 100 + 1) * 1000) / 1000;
        return res;
    }
}

function displayResult(result) {
    document.getElementById('leader-value').innerText = result.leaderValue;
    document.getElementById('internal-value').innerText = result.internalValue;
    document.getElementById('effective-value').innerText = result.effectiveValue;
    document.getElementById('ratio').innerText = result.ratio;
}