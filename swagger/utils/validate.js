module.exports = validNameAndPosition = (body) => {
  // !req.body.name || typeof req.body.name !== 'string' ||foundIndex === -1 
  const noName = !body.name
  const notStringName = body.name && typeof body.name !== 'string'
  const notValidPosiiton = body.position && (
    ['C', 'PF', 'SF', 'PG', 'SG'].findIndex(position => (
      position === body.position
    ))) === -1

    return noName || notStringName || notValidPosiiton
}