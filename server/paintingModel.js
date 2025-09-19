class Painting {
  constructor({ title, shapes } = {}) {
    this.title = title ?? 'Untitled'
    this.shapes = Array.isArray(shapes) ? shapes : []
  }
  toJSON() {
    return { title: this.title, shapes: this.shapes }
  }
}
module.exports = { Painting }
