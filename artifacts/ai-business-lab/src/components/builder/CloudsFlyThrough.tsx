import { Canvas, useFrame } from "@react-three/fiber"
import { Clouds, Cloud } from "@react-three/drei"
import * as THREE from "three"
import { useMemo, useRef } from "react"

const FLY_DURATION_S = 4.0
const START_Z = 0
const END_Z = -90
const CLOUD_COUNT = 14

interface Placement {
  pos: [number, number, number]
  bounds: [number, number, number]
  volume: number
  rot: number
  seed: number
  opacity: number
}

function FlyingCamera() {
  const t0 = useRef(performance.now())
  useFrame(({ camera }) => {
    const elapsed = (performance.now() - t0.current) / 1000
    const k = Math.min(elapsed / FLY_DURATION_S, 1)
    const eased = 1 - Math.pow(1 - k, 2.2)
    camera.position.set(0, eased * 6, START_Z + (END_Z - START_Z) * eased)
    camera.lookAt(0, eased * 6 + 2, camera.position.z - 10)
  })
  return null
}

function seededPlacements(): Placement[] {
  const rng = mulberry32(42)
  return Array.from({ length: CLOUD_COUNT }, (_, i): Placement => {
    const z = START_Z - 6 - (i / CLOUD_COUNT) * 90 - rng() * 6
    const lateral = (rng() - 0.5) * 28
    const vertical = (rng() - 0.5) * 14
    const size = 5 + rng() * 5
    return {
      pos: [lateral, vertical, z],
      bounds: [size, size * 0.55, size * 0.7],
      volume: 5 + rng() * 4,
      rot: rng() * Math.PI,
      seed: i + 1,
      opacity: 0.78 + rng() * 0.18,
    }
  })
}

function mulberry32(seed: number) {
  let t = seed
  return function () {
    t = (t + 0x6d2b79f5) | 0
    let r = Math.imul(t ^ (t >>> 15), 1 | t)
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}

export default function CloudsFlyThrough() {
  const placements = useMemo(seededPlacements, [])

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background:
          "linear-gradient(180deg, #aac9ff 0%, #cfe0ff 45%, #eaf2ff 100%)",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, START_Z], fov: 75, near: 0.1, far: 200 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
        style={{ position: "absolute", inset: 0 }}
      >
        <ambientLight intensity={1.4} />
        <directionalLight position={[8, 12, 4]} intensity={1.6} color="#fff7e6" />
        <hemisphereLight args={["#cfe0ff", "#7ea6e0", 0.8]} />
        <Clouds material={THREE.MeshLambertMaterial} limit={400} range={120}>
          {placements.map((p) => (
            <Cloud
              key={p.seed}
              seed={p.seed}
              position={p.pos}
              rotation={[0, p.rot, 0]}
              segments={42}
              bounds={p.bounds}
              volume={p.volume}
              color="#ffffff"
              opacity={p.opacity}
              speed={0.18}
              growth={4}
              fade={20}
            />
          ))}
        </Clouds>
        <FlyingCamera />
        <fog attach="fog" args={["#dfeaff", 30, 130]} />
      </Canvas>
    </div>
  )
}
