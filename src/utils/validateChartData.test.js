import { isValidChartData } from './validateChartData.js'

describe('isValidChartData', () => {
  const validPoint = { x: 1, y: 2 }

  test('accepts a well-formed payload', () => {
    const json = { items: [{ color: 'red', points: [validPoint, { x: 3, y: 4 }] }] }
    expect(isValidChartData(json)).toBe(true)
  })

  test('accepts an empty items array', () => {
    // empty is still structurally valid — callers decide what to do with no data
    expect(isValidChartData({ items: [] })).toBe(true)
  })

  test('accepts items whose points array is empty', () => {
    expect(isValidChartData({ items: [{ points: [] }] })).toBe(true)
  })

  test('rejects null or undefined', () => {
    expect(isValidChartData(null)).toBe(false)
    expect(isValidChartData(undefined)).toBe(false)
  })

  test('rejects when items is missing', () => {
    expect(isValidChartData({})).toBe(false)
  })

  test('rejects when items is not an array', () => {
    expect(isValidChartData({ items: 'nope' })).toBe(false)
  })

  test('rejects when any item is missing a points array', () => {
    expect(isValidChartData({ items: [{ color: 'red' }] })).toBe(false)
  })

  test('rejects when a point has non-numeric x', () => {
    const json = { items: [{ points: [{ x: 'a', y: 10 }] }] }
    expect(isValidChartData(json)).toBe(false)
  })

  test('rejects when a point has non-numeric y', () => {
    const json = { items: [{ points: [{ x: 10, y: null }] }] }
    expect(isValidChartData(json)).toBe(false)
  })

  test('rejects when a point is missing x or y entirely', () => {
    expect(isValidChartData({ items: [{ points: [{ x: 10 }] }] })).toBe(false)
    expect(isValidChartData({ items: [{ points: [{ y: 10 }] }] })).toBe(false)
  })

  test('rejects when a single bad point sits among valid ones', () => {
    const json = {
      items: [{ points: [validPoint, { x: 'bad', y: 2 }, validPoint] }],
    }
    expect(isValidChartData(json)).toBe(false)
  })
})
