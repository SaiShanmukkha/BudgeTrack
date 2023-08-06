export default class CyborgMap extends Map {
    constructor() {
      super()
      
      this.constructor.prototype.increment = function (key, value) {
        this.has(key) && this.set(key, this.get(key) + value)
      }
      
    }
  }
 