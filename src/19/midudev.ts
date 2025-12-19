function revealSantaRoute(routes: string[][]): string[] {
  const graph: Record<string, string> = {}

  routes.forEach(route => {
    const [origin, destiny] = route

    graph[origin] = destiny
  })

  const start = routes[0][0]

  let nextPoint = graph[start]

  const fullRoute: string[] = [start]
  while (nextPoint) {
    fullRoute.push(nextPoint)
    nextPoint = graph[nextPoint]
  }

  return fullRoute
}

revealSantaRoute([
  ['MEX', 'CAN'],
  ['UK', 'GER'],
  ['CAN', 'UK']
])