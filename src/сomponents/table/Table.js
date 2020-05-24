import {ExcelComponent} from "../../core/ExcelComponent"
import {$} from "@core/dom"
import {createTable} from "./table.template"
import {resizeHandler} from "@/сomponents/table/table.resize"
import {isCell, matrix, shouldResize} from "@/сomponents/table/table.functions"
import {TableSelection} from "@/сomponents/table/TableSelection"

export class Table extends ExcelComponent {
  static className = 'excel__table'


  constructor($root) {
    super($root, {
      listeners: ['mousedown']
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

    const $cell = this.$root.find('[data-id="0:0"]')
    this.selection.select($cell)
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
      } else { // select one cell
        this.selection.select($target)
      }
    }
  }
}

