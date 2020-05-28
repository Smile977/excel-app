import {$} from '@core/dom'
import {Emitter} from '@core/Emitter'

// main component includes [Header, Toolbar, Formula, Table]
export class Excel {
  constructor(selector, options) {
    this.$el = $(selector) // wrap dom element
    this.components = options.components || [] // [Header, Toolbar, Formula, Table]
    this.store = options.store
    this.emitter = new Emitter()
  }

  getRoot() {
    // create root - main component
    const $root = $.create('div', 'excel')

    const componentOptions = {
      emitter: this.emitter,
      store: this.store
    }

    // create and add components children for root
    this.components = this.components.map(Component => {
      const $el = $.create('div', Component.className)
      const component = new Component($el, componentOptions)
      $el.html(component.toHTML())
      $root.append($el)
      return component
    })

    return $root
  }

  render() {
    this.$el.append(this.getRoot())

    this.components.forEach(component => component.init())
  }

  destroy() {
    this.components.forEach(component => component.destroy())
  }
}
