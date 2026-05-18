const DEG_TO_RAD = Math.PI / 180
const RAD_TO_DEG = 180 / Math.PI

export function normalizeAngle(degrees) {
  let value = degrees

  while (value > 180) value -= 360
  while (value < -180) value += 360

  return value
}

export function vectorFromPoints(pointA, pointB) {
  return {
    x: pointB.x - pointA.x,
    y: pointB.y - pointA.y,
  }
}

export function vectorFromYaw(yawDegrees) {
  const radians = yawDegrees * DEG_TO_RAD

  return {
    x: Math.sin(radians),
    y: Math.cos(radians),
  }
}

export function dot2D(vectorA, vectorB) {
  return vectorA.x * vectorB.x + vectorA.y * vectorB.y
}

export function cross2D(vectorA, vectorB) {
  return vectorA.x * vectorB.y - vectorA.y * vectorB.x
}

export function signedAngleBetweenVectors(vectorA, vectorB) {
  const angleRadians = Math.atan2(cross2D(vectorA, vectorB), dot2D(vectorA, vectorB))

  return angleRadians * RAD_TO_DEG
}

export function getTurnInstruction(currentYaw, targetYaw, toleranceDegrees = 8) {
  const currentVector = vectorFromYaw(currentYaw)
  const targetVector = vectorFromYaw(targetYaw)
  const signedAngle = signedAngleBetweenVectors(currentVector, targetVector)
  const absoluteAngle = Math.abs(signedAngle)

  if (absoluteAngle <= toleranceDegrees) {
    return {
      absoluteAngle,
      signedAngle,
      turnDirection: null,
      isAligned: true,
    }
  }

  return {
    absoluteAngle,
    signedAngle,
    turnDirection: signedAngle > 0 ? 'putar ke kanan' : 'putar ke kiri',
    isAligned: false,
  }
}