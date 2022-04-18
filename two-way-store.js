function TwoWayStore (values = []) {
  this.keysA = {}
  this.keysB = {}
  this.seq = 0
  this.store = {}
  this.seqPool = []
  this.references = {}

  values.forEach(([keyA, keyB, value]) => {
    this.setValue(keyA, keyB, value)
  })
}

TwoWayStore.prototype.setValue = function (keyA, keyB, value) {
  let seq
  if (this.seqPool.length > 0) {
    seq = this.seqPool.shift()
  } else {
    seq = this.seq
    this.seq++
  }
  this.keysA[keyA] = this.keysA[keyA] || {}
  this.keysA[keyA][keyB] = seq
  this.keysB[keyB] = this.keysB[keyB] || {}
  this.keysB[keyB][keyA] = seq
  this.references[seq] = [keyA, keyB]
  this.store[seq] = value
}

TwoWayStore.prototype.removeValue = function (keyA, keyB) {
  const seq = this.keysA[keyA][keyB]

  delete this.keysA[keyA][keyB]
  if (Object.keys(this.keysA[keyA]).length === 0) {
    delete this.keysA[keyA]
  }

  delete this.keysB[keyB][keyA]
  if (Object.keys(this.keysB[keyB]).length === 0) {
    delete this.keysB[keyB]
  }

  delete this.store[seq]
  delete this.references[seq]
  this.seqPool.push(seq)
}

TwoWayStore.prototype.getValue = function (keyA, keyB) {
  const seq = this.keysA[keyA][keyB]
  return this.store[seq]
}

TwoWayStore.prototype.getKeysA = function () {
  return Object.keys(this.keysA)
}

TwoWayStore.prototype.getKeysB = function () {
  return Object.keys(this.keysB)
}

TwoWayStore.prototype.getEntries = function () {
  return Object.keys(this.store).map(seq => [...this.references[seq], this.store[seq]])
}

TwoWayStore.prototype.getKeysAByKeyB = function (keyB) {
  return Object.keys(this.keysB[keyB])
}

TwoWayStore.prototype.getKeysBByKeyA = function (keyA) {
  return Object.keys(this.keysA[keyA])
}

export default TwoWayStore
