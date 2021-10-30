
function shuffle(arr) {
    let temp;
    let shuffleArr = arr.slice();
    for (let i = 0; i < shuffleArr.length; i++) {
        const rndNum = _getRndInt(0, arr.length);
        temp = shuffleArr[i];
        shuffleArr[i] = shuffleArr[rndNum];
        shuffleArr[rndNum] = temp;
    }
    return shuffleArr;
}

//Without the Max Value
function _getRndInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
  

let exportedObj = {
    shuffle
}

export default exportedObj;