function multiDimensionalArray(r, c) {
    var myArray = new Array(5);
    for (var i = 0; i < 5; i++) {
        myArray[i] = new Array(5).fill(false);
    }
    return myArray;
}

export { multiDimensionalArray };