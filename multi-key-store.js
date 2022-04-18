function MultiKeyStore (data = []) {
  this.seq = 0
  this.keys = {}
  this.store = {}
  this.references = {}
  this.seqPool = []

  data.forEach(([keys, value]) => {
    this.addNewValue(keys, value)
  })
}

MultiKeyStore.prototype.addNewValue = function (keys, value) {
  let seq
  if (this.seqPool.length > 0) {
    seq = this.seqPool.shift()
  } else {
    seq = this.seq
    this.seq++
  }
  this.store[seq] = value
  keys.forEach(key => {
    this.keys[key] = seq
  })
  this.references[seq] = [...keys]
}

MultiKeyStore.prototype.addKeyToValue = function (key, existingKey) {
  const seq = this.keys[existingKey]
  if (seq !== undefined) {
    if (this.keys[key] !== undefined) {
      this.removeKey(key)
    }
    this.keys[key] = seq
    this.references[seq].push(key)
  }
}

MultiKeyStore.prototype.addKeysToValue = function (keys, existingKey) {
  keys.forEach(key => {
    this.addKeyToValue(key, existingKey)
  })
}

MultiKeyStore.prototype.getValueByKey = function (key) {
  const seq = this.keys[key]
  return this.store[seq]
}

MultiKeyStore.prototype.removeKey = function (key) {
  const seq = this.keys[key]
  if (this.references[seq].length === 1) {
    delete this.references[seq]
    delete this.store[seq]
    this.seqPool.push(seq)
  }
  delete this.keys[key]
}

MultiKeyStore.prototype.deleteValueByKey = function (key) {
  const seq = this.keys[key]
  if (seq !== undefined) {
    this.references[seq].forEach(k => {
      this.removeKey(k)
    })
  }
}

// Groups keys together by the value they are associated with
MultiKeyStore.prototype.getKeys = function () {
  return Object.values(this.references)
}

MultiKeyStore.prototype.getValues = function () {
  return Object.values(this.store)
}

MultiKeyStore.prototype.getEntries = function () {
  const keys = this.getKeys()
  return keys.map(key => [key, this.getValueByKey(key[0])])
}

export default MultiKeyStore
