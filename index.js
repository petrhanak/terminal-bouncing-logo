const fs = require('fs')

const logo = fs.readFileSync('./logo.txt').toString()

cF = 2
rF = 1

const lArr = logo.split('\n').map(line => line.split(''))

const lHeight = 5
const lWidth = 15

let cDiff = cF
let rDiff = rF

let cPos = 0
let rPos = 0

console.log(process.stdout.columns);
setInterval(() => {
  const columns = process.stdout.columns - lWidth
  const rows = process.stdout.rows - lHeight

  // process.stdout.write('\x1b[2J\x1b[0f');
  for (let r = 0; r < rows - 1 + lHeight; r++) {
  let line = "";
  for (let c = 0; c < columns + lWidth; c++) {
    if (r >= rPos && r < rPos + lHeight && c >= cPos && c <= cPos + lWidth) {
      const lR = r - rPos
      const lC = c - cPos
      line += lArr[lR][lC]
    } else {
      line += " "
    }
  }
  console.log(line)
}

cPos = Math.min(cPos, columns - 1)
rPos = Math.min(rPos, rows - 1)

cPos = Math.max(0, cPos)
rPos = Math.max(0, rPos)

if (cPos === 0)
  cDiff = cF
if (cPos === columns - 1)
  cDiff = -cF
if (rPos === 0)
  rDiff = rF
if (rPos === rows - 1)
  rDiff = -rF

cPos += cDiff
rPos += rDiff
}, 100)
