import MultiKeyStore from './multi-key-store.js'

describe('Create empty key store', () => {
  const store = new MultiKeyStore()

  it('It should have empty keys', () => {
    expect(store.getKeys()).toEqual([])
  })

  it('It should have empty values', () => {
    expect(store.getValues()).toEqual([])
  })

  it('It should have empty entries', () => {
    expect(store.getEntries()).toEqual([])
  })
})

describe('Create store with multi keys', () => {
  const store = new MultiKeyStore([
    [['apple', 'orange'], 'fruit'],
    [['user-id', 'user-id2'], 'room-id'],
    [['slug', 'slug2', 'slug3'], 'data-id'],
  ])

  it('Has correct keys', () => {
    expect(store.getKeys()).toEqual([['apple', 'orange'], ['user-id', 'user-id2'], ['slug', 'slug2', 'slug3']])
  })

  it('Has correct values', () => {
    expect(store.getValues()).toEqual(['fruit', 'room-id', 'data-id'])
  })

  it('Has correct entries', () => {
    expect(store.getEntries()).toEqual([[['apple', 'orange'], 'fruit'], [['user-id', 'user-id2'], 'room-id'], [['slug', 'slug2', 'slug3'], 'data-id']])
  })
})
