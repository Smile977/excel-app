import {ExcelComponent} from "../../core/ExcelComponent"
import {$} from "@core/dom"
import {createTable} from "./table.template"
import {resizeHandler} from "@/сomponents/table/table.resize"
import {isCell, matrix, nextSelector, shouldResize} from "@/сomponents/table/table.functions"
import {TableSelection} from "@/сomponents/table/TableSelection"

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    })
  }

  toHTML() {
    return createTable(20)
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()

    // Первая ячейка
    this.selectCell(this.$root.find('[data-id="0:0"]'))

    // подписываемся на событие
    this.$on('formula:input', text => {
      this.selection.current.text(text)
    })

    // по клику Enter смена фокуса на текущую ячейку
    this.$on('formula:done', () => {
      this.selection.current.focus()
    })
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
  }

  onMousedown(event) {
    if (shouldResize(event)) { // resize cols and rows
      resizeHandler(this.$root, event)
    } else if (isCell(event)) {
      const $target = $(event.target)
      if (event.shiftKey) { // select group cells
        const $cells = matrix($target, this.selection.current)
          .map(id => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($cells)
      } else {
        this.selection.select($target)
      }
    }
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowDown',
      'ArrowUp'
    ]

    const {key} = event

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()
      const id = this.selection.current.id(true)
      const $next = this.$root.find(nextSelector(key, id))
      this.selectCell($next)
    }
  }

  onInput(event) {
    this.$emit('table:input', $(event.target))
  }
}


