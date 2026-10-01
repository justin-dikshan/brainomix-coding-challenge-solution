import { computeMinMax } from './computeMinMax.js'

describe('computeMinMax', () => {
  test('returns the correct bounds for a single series', () => {
    // Arrange
    const items = [
      {
        color: 'red',
        points: [
          { x: 0, y: 10 },
          { x: 5, y: 30 },
          { x: 10, y: 20 },
        ],
      },
    ]

    // Act
    const result = computeMinMax(items)

    // Assert
    expect(result).toEqual({ minX: 0, maxX: 10, minY: 10, maxY: 30 })
  })

  test('spans the bounds across multiple series', () => {
    const items = [
      { color: 'red', points: [{ x: 0, y: 10 }] },
      { color: 'blue', points: [{ x: 100, y: 5 }] },
      { color: 'green', points: [{ x: 50, y: 200 }] },
    ]

    // min/max should come from whichever series holds the extreme
    expect(computeMinMax(items)).toEqual({
      minX: 0,
      maxX: 100,
      minY: 5,
      maxY: 200,
    })
  })

  test('handles negative values', () => {
    const items = [
      {
        color: 'red',
        points: [
          { x: -50, y: -20 },
          { x: 50, y: 20 },
        ],
      },
    ]
    expect(computeMinMax(items)).toEqual({ minX: -50, maxX: 50, minY: -20, maxY: 20 })
  })

  test('returns min === max when a single point is supplied', () => {
    const items = [{ color: 'red', points: [{ x: 7, y: 42 }] }]
    expect(computeMinMax(items)).toEqual({ minX: 7, maxX: 7, minY: 42, maxY: 42 })
  })

  test('returns undefined for an empty array', () => {
    // callers use this to short-circuit before drawing
    expect(computeMinMax([])).toBeUndefined()
  })

  test('returns undefined when called with no argument', () => {
    // exercises the default parameter path
    expect(computeMinMax()).toBeUndefined()
  })

  test('returns undefined when every series has an empty points array', () => {
    // all-empty would otherwise collapse to ±Infinity bounds
    expect(computeMinMax([{ points: [] }, { points: [] }])).toBeUndefined()
  })

  test('tolerates items that are missing a points array', () => {
    // defensive — public util shouldn't crash on malformed input
    expect(computeMinMax([{ color: 'red' }])).toBeUndefined()
  })

  test('ignores items with no points field alongside valid ones', () => {
    const items = [
      { color: 'red' },                             // no points at all
      { color: 'blue', points: [{ x: 1, y: 2 }] },
    ]
    expect(computeMinMax(items)).toEqual({ minX: 1, maxX: 1, minY: 2, maxY: 2 })
  })
})
