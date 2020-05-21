
const CODES = {
  A: 65,
  Z: 90
}

function toSell() {
  return `
    <div class="cell" contenteditable></div>
  `
}

function toColumn(el) {
  return `<div class="column">${el}</div>`
}

function createRow(index, content) {
  return `
    <div class="row">
      <div class="row-info">${index ? index : ''}</div>
      <div class="row-data">${content}</div>
    </div> 
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 15) {

  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  // строка из букв A - Z
  const cols = new Array(colsCount)
    .fill('') // заполнение ячеек пустой строкой
    .map(toChar) // замена значения на букву от A до Z
    .map(toColumn) //.map(el => toColumn(el) // передача элементов для колонок
    .join('') // преобразование к строке



  rows.push(createRow(null, cols))

  for(let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount)
      .fill('')
      .map(toSell)
      .join('')
    rows.push(createRow(i + 1, cells))
  }

  return rows.join('')
}