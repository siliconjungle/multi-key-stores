import TwoWayStore from './two-way-store.js'

describe('Create empty key store', () => {
  const store = new TwoWayStore()

  it('A should have empty keys', () => {
    expect(store.getKeysA()).toEqual([])
  })

  it('B should have empty values', () => {
    expect(store.getKeysB()).toEqual([])
  })

  it('It should have empty entries', () => {
    expect(store.getEntries()).toEqual([])
  })
})

describe('Create store with two way keys', () => {
  const store = new TwoWayStore([
    ['user-id', 'shelf-key', { react: 'like' }],
    ['user-id2', 'shelf-key', { react: 'love' }],
    ['user-id3', 'shelf-key', { react: 'care' }],
  ])

  it('Has correct keysA', () => {
    expect(store.getKeysA()).toEqual(['user-id', 'user-id2', 'user-id3'])
  })

  it('Has correct keysB', () => {
    expect(store.getKeysB()).toEqual(['shelf-key'])
  })

  it('Has correct entries', () => {
    expect(store.getEntries()).toEqual([['user-id', 'shelf-key', { react: 'like' }], ['user-id2', 'shelf-key', { react: 'love' }], ['user-id3', 'shelf-key', { react: 'care' }]])
  })

  it('Got correct element by keyA', () => {
    const keysB = store.getKeysBByKeyA('user-id')
    const value = store.getValue('user-id', keysB[0])
    expect(value).toEqual({ react: 'like' })
  })

  it('Got correct element by keyB', () => {
    const keysA = store.getKeysAByKeyB('shelf-key')
    const value = store.getValue(keysA[0], 'shelf-key')
    expect(value).toEqual({ react: 'like' })
  })
})
