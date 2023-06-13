export function computedMinCost (data) {
  return Object.values(data).reduce((min, item) => {
    const cost = parseInt(item.cost)
    if (!isNaN(cost) && (cost < min || min === null)) {
      return cost
    }
    return min
  }, null)
}
