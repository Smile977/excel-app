export class Emitter {
  constructor() {
    this.listeners = {}
  }

  // Уведомляем слушателей если они есть
  // table.emit('table:select', {a:1})
  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false
    }
    this.listeners[event].forEach(listener => {
      listener(...args)
    })
    return true
  }

  // подписываемся на уведомления
  // добвыляем нового слушателя
  // formula.subscribe('table-select', () => {})
  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(fn)
    return () => {
      this.listeners[event] = this.listeners[event].filter(listener => listener !== fn)
    }
  }
}


// Example
// const emitter = new Emitter()
// const unsub = emit.subscribe('Andrey', data => console.log('Sub:', data))
//
// emit.emit('Andrey', 42)
//
// setTimeout(() => {
//   emitter.emit('Andrey', 'After 2 second')
// }, 2000)
//
// setTimeout(() => {
//   unsub()
// }, 3000)
//
// setTimeout(() => {
//   emitter.emit('Andrey', 'After 4 second')
// }, 4000)