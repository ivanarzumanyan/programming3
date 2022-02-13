function generator(matLen, gr, grEat, pr, mush, crPr) {
    let matrix = [];
    for (let i = 0; i < matLen; i++) {
        matrix[i] = [];
        for (let j = 0; j < matLen; j++) {
            matrix[i][j] = 0;
        }
    }
    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 1;
        }
    }
    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 2;
        }
    }
    for (let i = 0; i < pr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 3;
        }
    }
    for (let i = 0; i < mush; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 4;
        }
    }
    for (let i = 0; i < crPr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 5;
        }
    }
    return matrix;
}

let side = 10;

let matrix = generator(30, 45, 15, 20, 10, 15);
let creatpredatorArr = []
let mushroomArr = []
let grassArr = []
let grassEaterArr = []
let grassPredatorArr = []

function setup() {
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
    frameRate(3)
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                let gr = new Grass(x, y)
                grassArr.push(gr)
            } else if (matrix[y][x] == 2) {
                let grE = new GrassEater(x, y)
                grassEaterArr.push(grE)
            } else if (matrix[y][x] == 3) {
                let grP = new Predator(x, y)
                grassPredatorArr.push(grP)

            }
            else if (matrix[y][x] == 4) {
                let msh = new Mushroom(x, y)
                mushroomArr.push(msh)

            }
            else if (matrix[y][x] == 5) {
                let cr = new CreatPredator(x, y)
                creatpredatorArr.push(cr)

            }
        }
    }
}

function draw() {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill('green')
            } else if (matrix[y][x] == 0) {
                fill('#acacac')
            } else if (matrix[y][x] == 2) {
                fill('yellow')
            } else if (matrix[y][x] == 3) {
                fill('red')
            }
            else if (matrix[y][x] == 4) {
                fill('orange')
            }
            else if (matrix[y][x] == 5) {
                fill('#E3DBDB')
            }
            rect(x * side, y * side, side, side)
        }
    }

    for (let i in grassArr) {
        grassArr[i].mul()
    }
    for (let i in grassEaterArr) {
        grassEaterArr[i].mul()
        grassEaterArr[i].eat()
    }
    for (let i in grassPredatorArr) {
        grassPredatorArr[i].mul()
        grassPredatorArr[i].eat()
    }
    for (let i in mushroomArr) {
        mushroomArr[i].mul()
    }
    for (let i in creatpredatorArr) {
        if (grassPredatorArr.length < 5) {
            creatpredatorArr[i].mul(2)
        }
        if (grassArr.length < 10) {
            creatpredatorArr[i].mulGrass()
        }
    }
}
