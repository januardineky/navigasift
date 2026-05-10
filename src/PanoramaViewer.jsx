import { useEffect, useMemo, useRef, useState } from 'react'
import 'pannellum/build/pannellum.css'
import 'pannellum/build/pannellum.js'
import { getTurnInstruction, normalizeAngle } from './utils/navigationVector'

const PANORAMA_SCENES = {
  'scene-a': {
    id: 'scene-a',
    panorama: '/panoramas/lt1/lobi1.jpg',
    hotSpots: [
      {
        pitch: -9.55,
        yaw: -6.87,
        type: 'scene',
        sceneId: 'scene-b',
        targetYaw: -79.39,
        targetPitch: -7.33,
        
        cssClass: 'arrow',
      },
    ],
  },
  'scene-b': {
    id: 'scene-b',
    panorama: '/panoramas/lt1/lobi2.jpg',
    hotSpots: [
      {
        pitch: -13.24,
        yaw: -82.68,
        type: 'scene',
        sceneId: 'scene-a',
        
        cssClass: 'arrow',
      },
      {
        pitch: -18.29,
        yaw: 64.61,
        type: 'scene',
        sceneId: 'scene-g',
        
        cssClass: 'arrow',
      },
      {
        pitch: -12.53,
        yaw: 1.00,
        type: 'scene',
        sceneId: 'scene-h',
        targetYaw: -155.43,
        targetPitch: -0.18,
        
        cssClass: 'arrow',
      },
      {
        pitch: -169.18,
        yaw: 12.92,
        type: 'scene',
        sceneId: 'scene-i',
        targetYaw: -155.43,
        targetPitch: -0.18,
        
        cssClass: 'arrow',
      },
    ],
  },
  'scene-c': {
    id: 'scene-c',
    panorama: '/panoramas/lt2/lobi1.jpg',
    hotSpots: [
      {
        pitch: -9.00,
        yaw: -10.49,
        type: 'scene',
        sceneId: 'scene-f',
        targetYaw: -76.68,
        targetPitch: 1.23,
        
        cssClass: 'arrow',
      },
      {
        pitch: -13.5,
        yaw: 157,
        type: 'scene',
        sceneId: 'scene-d',
        targetYaw: 170.76,
        targetPitch: -0.36,
        
        cssClass: 'arrow',
      },
      {
        pitch: -21.99,
        yaw: 78.69,
        type: 'scene',
        sceneId: 'scene-h',
        targetYaw: -74.53,
        targetPitch: -2.94,
        
        cssClass: 'arrow',
      },
    ],
  },
  'scene-d': {
    id: 'scene-d',
    panorama: '/panoramas/lt2/lorongkiri1.jpg',
    hotSpots: [
      {
        pitch: -13.65,
        yaw: -11.10,
        type: 'scene',
        sceneId: 'scene-c',
        targetYaw: -12.41,
        targetPitch: -1.22,
        
        cssClass: 'arrow',
      },
      {
        pitch: -13,
        yaw: 172,
        type: 'scene',
        sceneId: 'scene-e',
        targetYaw: 170.50,
        targetPitch: 0.13,
        
        cssClass: 'arrow',
      },
    ],
  },
  'scene-e': {
    id: 'scene-e',
    panorama: '/panoramas/lt2/lorongkiri2.jpg',
    hotSpots: [
      {
        pitch: -16.75,
        yaw: 8.12,
        type: 'scene',
        sceneId: 'scene-d',
        targetYaw: -12.35,
        targetPitch: -1.03,
        
        cssClass: 'arrow',
      },
      {
        pitch: -25.02,
        yaw: 97.57,
        type: 'scene',
        sceneId: 'scene-j',
        targetYaw: 78.69,
        targetPitch: -21.99,
        
        cssClass: 'arrow',
      },
    ],
  },
  'scene-f': {
    id: 'scene-f',
    panorama: '/panoramas/lt2/lorongkanan1.jpg',
    hotSpots: [
      {
        pitch: -17.59,
        yaw: -76.27,
        type: 'scene',
        sceneId: 'scene-g',
        targetYaw: 82.95,
        targetPitch: 7.97,
        
        cssClass: 'arrow',
      },
      {
        pitch: -12.51,
        yaw: 106.33,
        type: 'scene',
        sceneId: 'scene-c',
        targetYaw: 155.06,
        targetPitch: -1.98,
        
        cssClass: 'arrow',
      },
    ],
  },
  'scene-g': {
    id: 'scene-g',
    panorama: '/panoramas/lt1/lobi3.jpg',
    hotSpots: [
      {
        pitch: -17.12,
        yaw: 14.50,
        type: 'scene',
        sceneId: 'scene-b',
        targetYaw: -79.39,
        targetPitch: -7.33,
        
        cssClass: 'arrow',
      },
    ],
  },
  'scene-h': {
    id: 'scene-h',
    panorama: '/panoramas/lt1/lorongkiri1.jpg',
    hotSpots: [
      {
        pitch: -15.13,
        yaw: 23.78,
        type: 'scene',
        sceneId: 'scene-b',
        targetYaw: -170.60,
        targetPitch: -0.78,
        
        cssClass: 'arrow',
      },
      {
        pitch: 11.94,
        yaw: 108.27,
        type: 'scene',
        sceneId: 'scene-c',
        targetYaw: -108.02,
        targetPitch: -1.78,
        
        cssClass: 'arrow',
      },
      {
        pitch: -13.39,
        yaw: -155.15,
        type: 'scene',
        sceneId: 'scene-j',
        targetYaw: -108.02,
        targetPitch: -1.78,
        
        cssClass: 'arrow',
      },
    ],
  },
  'scene-i': {
    id: 'scene-i',
    panorama: '/panoramas/lt1/lorongkanan1.jpg',
    hotSpots: [
      {
        pitch: -15.13,
        yaw: 23.78,
        type: 'scene',
        sceneId: 'scene-b',
        targetYaw: -170.60,
        targetPitch: -0.78,
        
        cssClass: 'arrow',
      },
    ],
  },
  'scene-j': {
    id: 'scene-j',
    panorama: '/panoramas/lt1/lorongkiri2.jpg',
    hotSpots: [
      {
        pitch: -17.33,
        yaw: -146.15,
        type: 'scene',
        sceneId: 'scene-h',
        targetYaw: -170.60,
        targetPitch: -0.78,
        
        cssClass: 'arrow',
      },
    ],
  },
}

const ROOM_SCENE_BY_ID = {
  'ft1-1a': 'scene-j',
  'ft1-1b': 'scene-j',
  'ft1-1c': 'scene-h',
  'ft1-1d': 'scene-h',
  'ft1-1e': 'scene-i',
  'ft1-1f': 'scene-i',
  'ft1-1h': 'scene-h',
  'ft1-1i': 'scene-h',
  'ft1-1j': 'scene-i',
  'ft1-1k': 'scene-i',
  'ft1-1l': 'scene-h',
  'ft1-1m': 'scene-j',
  'ft1-2a': 'scene-d',
  'ft1-2b': 'scene-d',
  'ft1-2c': 'scene-c',
  'ft1-2d': 'scene-c',
  'ft1-2e': 'scene-c',
  'ft1-2f': 'scene-f',
  'ft1-2g': 'scene-f',
  'ft1-2h': 'scene-h',
  'ft1-2i': 'scene-h',
  'ft1-2k': 'scene-f',
  'ft1-2l': 'scene-c',
  'ft1-2m': 'scene-d',
  'ft1-2n': 'scene-d',
}

const ROOM_TARGET_POINTS = {
  'ft1-1a': { sceneId: 'scene-j', yaw: 49.48, pitch: -3.65 },
  'ft1-1b': { sceneId: 'scene-j', yaw: -172.54, pitch: -4.84 },
  'ft1-1c': { sceneId: 'scene-h', yaw: -111.77, pitch: -4.96 },
  'ft1-1d': { sceneId: 'scene-h', yaw: -100.89, pitch: 9.20 },
  'ft1-1e': { sceneId: 'scene-i', yaw: 53.51, pitch: -5.46 },
  'ft1-1f': { sceneId: 'scene-i', yaw: -179.19, pitch: -2.28 },
  'ft1-1h': { sceneId: 'scene-h', yaw: 46, pitch: -13 },
  'ft1-1i': { sceneId: 'scene-h', yaw: 72, pitch: -14 },
  'ft1-1j': { sceneId: 'scene-i', yaw: -102.73, pitch: -9.46 },
  'ft1-1k': { sceneId: 'scene-i', yaw: -27.76, pitch: -7.29 },
  'ft1-1l': { sceneId: 'scene-h', yaw: -175.70, pitch: 1.94 },
  'ft1-1m': { sceneId: 'scene-j', yaw: 25.32, pitch: -2.31 },
  'ft1-2a': { sceneId: 'scene-d', yaw: -164.44, pitch: -5.92 },
  'ft1-2b': { sceneId: 'scene-d', yaw: -106.23, pitch: -14.04 },
  'ft1-2c': { sceneId: 'scene-c', yaw: -160.88, pitch:-6.78 },
  'ft1-2d': { sceneId: 'scene-c', yaw: -155.12, pitch: -23.05 },
  'ft1-2e': { sceneId: 'scene-c', yaw: -21.40, pitch: -3.75 },
  'ft1-2f': { sceneId: 'scene-f', yaw: 117.21, pitch: -3.02 },
  'ft1-2g': { sceneId: 'scene-f', yaw: -156.28, pitch: -9.21 },
  'ft1-2h': { sceneId: 'scene-h', yaw: 22, pitch: -14 },
  'ft1-2i': { sceneId: 'scene-h', yaw: 40, pitch: -14 },
  'ft1-2k': { sceneId: 'scene-f', yaw: 11.01, pitch: -8.31 },
  'ft1-2l': { sceneId: 'scene-c', yaw: -1.17, pitch: -5.79 },
  'ft1-2m': { sceneId: 'scene-d', yaw: 8.65, pitch: -4.44},
  'ft1-2n': { sceneId: 'scene-d', yaw: 83.56, pitch: -13.80 },
}

const START_POINT_YAW_OFFSET = {
  west: -12,
  north: 8,
  east: 14,
  south: -6,
}

const START_SCENE_BY_POINT = {
  west: 'scene-a',
  north: 'scene-g',
  east: 'scene-a',
  south: 'scene-a',
}

const FLOOR_LABEL_BY_ID = {
  floor1: 'Lantai 1',
  floor2: 'Lantai 2',
}

const NAV_GUIDE_POINTS = {
  'scene-a': {
    floor1: { yaw: 0, pitch: -26, sceneId: 'scene-a' },
    floor2: { yaw: -35, pitch: -20, sceneId: 'scene-c' },
  },
  'scene-b': {
    floor1: { yaw: 42, pitch: -18, sceneId: 'scene-a' },
    floor2: { yaw: 0, pitch: -26, sceneId: 'scene-c' },
  },
  'scene-c': {
    floor1: { yaw: 32, pitch: -20, sceneId: 'scene-a' },
    floor2: { yaw: 1.20, pitch: -26, sceneId: 'scene-c' },
  },
  'scene-d': {
    floor1: { yaw: 48, pitch: -18, sceneId: 'scene-a' },
    floor2: { yaw: -8, pitch: -24, sceneId: 'scene-c' },
  },
}

const SCENE_TRANSITIONS = {
  'scene-a': [{ to: 'scene-b', yaw: -4.87, pitch: 2.55 }],
  'scene-b': [
    { to: 'scene-a', yaw: -82.68, pitch: -13.24 },
    { to: 'scene-g', yaw: 64.61, pitch: -18.29 },
    { to: 'scene-h', yaw: 1.0, pitch: -12.53 },
    { to: 'scene-i', yaw: 12.92, pitch: -169.18 },
  ],
  'scene-c': [
    { to: 'scene-f', yaw: -10.49, pitch: -9.0 },
    { to: 'scene-d', yaw: 157, pitch: -13.5 },
    { to: 'scene-h', yaw: 78.69, pitch: -21.99 },
  ],
  'scene-d': [
    { to: 'scene-c', yaw: -11.1, pitch: -13.65 },
    { to: 'scene-e', yaw: 172, pitch: -13.0 },
  ],
  'scene-e': [
    { to: 'scene-d', yaw: 8.12, pitch: -16.75 },
    { to: 'scene-c', yaw: 97.57, pitch: -25.02 },
  ],
  'scene-f': [
    { to: 'scene-g', yaw: -76.27, pitch: -17.59 },
    { to: 'scene-c', yaw: 106.33, pitch: -12.51 },
  ],
  'scene-g': [{ to: 'scene-b', yaw: 14.5, pitch: -17.12 }],
  'scene-h': [
    { to: 'scene-b', yaw: 23.78, pitch: -15.13 },
    { to: 'scene-c', yaw: 108.27, pitch: 11.94 },
    { to: 'scene-j', yaw: -155.15, pitch: -13.39 },
  ],
  'scene-i': [
    { to: 'scene-b', yaw: 23.78, pitch: -15.13 },
  ],
  'scene-j': [
    { to: 'scene-h', yaw: -146.15, pitch: -17.33 },
  ],
}

function getNextSceneTransition(currentScene, targetScene) {
  if (!currentScene || !targetScene || currentScene === targetScene) {
    return null
  }

  const queue = [currentScene]
  const visited = new Set([currentScene])
  const previousByNode = {}

  while (queue.length > 0) {
    const scene = queue.shift()
    const edges = SCENE_TRANSITIONS[scene] ?? []

    for (const edge of edges) {
      if (visited.has(edge.to)) {
        continue
      }

      visited.add(edge.to)
      previousByNode[edge.to] = { from: scene, edge }

      if (edge.to === targetScene) {
        break
      }

      queue.push(edge.to)
    }
  }

  if (!previousByNode[targetScene]) {
    return null
  }

  let stepScene = targetScene
  while (previousByNode[stepScene]?.from && previousByNode[stepScene].from !== currentScene) {
    stepScene = previousByNode[stepScene].from
  }

  const firstHop = previousByNode[stepScene]
  return firstHop?.edge ?? null
}

function PanoramaViewer({ isOpen, startScene, navigationConfig, onClose, onNavigationStart }) {
  const viewerHostRef = useRef(null)
  const viewerRef = useRef(null)
  const hotspotSceneRef = useRef(null)
  const [headingHint, setHeadingHint] = useState('Menghitung arah tujuan...')
  const [viewerPose, setViewerPose] = useState({ sceneId: '-', yaw: 0, pitch: 0 })

  const destinationFloorId = navigationConfig?.destinationFloorId ?? 'floor1'
  const destinationFloorLabel = FLOOR_LABEL_BY_ID[destinationFloorId] ?? 'Lantai 1'
  const destinationRoomLabel = navigationConfig?.destinationRoomLabel ?? 'Belum dipilih'
  const startPointLabel = navigationConfig?.startPointLabel ?? 'Belum dipilih'
  const startPointId = navigationConfig?.startPointId ?? 'west'
  const initialSceneId = navigationConfig
    ? START_SCENE_BY_POINT[startPointId] ?? (startScene ?? 'scene-a')
    : (startScene ?? 'scene-a')
  const destinationSceneByRoom = navigationConfig?.destinationRoomId
    ? ROOM_SCENE_BY_ID[navigationConfig.destinationRoomId]
    : null
  const destinationSceneId = destinationSceneByRoom ?? (destinationFloorId === 'floor2' ? 'scene-c' : 'scene-a')
  const destinationRoomTarget = useMemo(
    () => (navigationConfig?.destinationRoomId ? ROOM_TARGET_POINTS[navigationConfig.destinationRoomId] ?? null : null),
    [navigationConfig],
  )
  const scenesConfig = useMemo(() => {
    if (!navigationConfig) {
      return PANORAMA_SCENES
    }

    const scenesWithoutHotspots = {}

    for (const [sceneId, sceneConfig] of Object.entries(PANORAMA_SCENES)) {
      scenesWithoutHotspots[sceneId] = {
        ...sceneConfig,
        hotSpots: [],
      }
    }

    return scenesWithoutHotspots
  }, [navigationConfig])

  useEffect(() => {
    if (!isOpen || !viewerHostRef.current) {
      return
    }

    if (!window.pannellum) {
      return
    }

    viewerRef.current = window.pannellum.viewer(viewerHostRef.current, {
      type: 'equirectangular',
      autoLoad: true,
      showControls: false,
      showZoomCtrl: false,
      showFullscreenCtrl: false,
      sceneFadeDuration: 800,
      default: {
        firstScene: initialSceneId,
      },
      scenes: scenesConfig,
    })

    const clearNavLine = () => {
      if (!viewerRef.current || !hotspotSceneRef.current) {
        return
      }

      try {
        viewerRef.current.removeHotSpot('nav-guide-line', hotspotSceneRef.current)
      } catch {
        // no-op when hotspot is not present
      }

      hotspotSceneRef.current = null
    }

    const resolveGuidanceTarget = () => {
      const currentScene = viewerRef.current.getScene()

      if (destinationRoomTarget && currentScene === destinationRoomTarget.sceneId) {
        return {
          yaw: destinationRoomTarget.yaw,
          pitch: destinationRoomTarget.pitch,
          nextSceneId: currentScene,
          isFinalRoom: true,
        }
      }

      const nextHop = getNextSceneTransition(currentScene, destinationSceneId)
      if (nextHop) {
        const shouldApplyStartOffset = currentScene === initialSceneId
        const startOffset = shouldApplyStartOffset ? START_POINT_YAW_OFFSET[startPointId] ?? 0 : 0

        return {
          yaw: normalizeAngle(nextHop.yaw + startOffset),
          pitch: nextHop.pitch,
          nextSceneId: nextHop.to,
          isFinalRoom: false,
        }
      }

      const fallbackTarget = NAV_GUIDE_POINTS[currentScene]?.[destinationFloorId]
      if (!fallbackTarget) {
        return null
      }

      return {
        yaw: normalizeAngle(fallbackTarget.yaw),
        pitch: fallbackTarget.pitch,
        nextSceneId: fallbackTarget.sceneId,
        isFinalRoom: false,
      }
    }

    const renderNavLine = () => {
      if (!viewerRef.current) {
        return
      }

      if (!navigationConfig) {
        clearNavLine()
        setHeadingHint('Mode jelajah panorama aktif (tanpa navigasi tujuan)')
        return
      }

      const currentScene = viewerRef.current.getScene()
      const target = resolveGuidanceTarget()

      clearNavLine()

      if (!target) {
        setHeadingHint('Arah tujuan belum tersedia untuk scene ini')
        return
      }

      viewerRef.current.addHotSpot(
        {
          id: 'nav-guide-line',
          type: 'info',
          pitch: target.pitch,
          yaw: target.yaw,
          cssClass: target.isFinalRoom ? 'nav-line nav-final' : 'nav-line',
          text: target.isFinalRoom ? 'Lokasi tujuan' : 'Arah tujuan',
          clickHandlerFunc: () => {
            const nextScene = target.nextSceneId
            if (nextScene !== currentScene) {
              viewerRef.current.loadScene(nextScene)
            }
          },
        },
        currentScene,
      )

      hotspotSceneRef.current = currentScene
    }

    const updateHeadingHint = () => {
      if (!viewerRef.current) {
        return
      }

      if (!navigationConfig) {
        setHeadingHint('Mode jelajah panorama aktif (tanpa navigasi tujuan)')
        return
      }

      const currentScene = viewerRef.current.getScene()
      const target = resolveGuidanceTarget()
      if (!target) {
        return
      }

      const currentYaw = viewerRef.current.getYaw()
      const turnInstruction = getTurnInstruction(currentYaw, target.yaw)

      if (turnInstruction.isAligned) {
        setHeadingHint(target.isFinalRoom ? 'Arah tepat, ruangan sudah di depan arah pandang' : 'Arah sudah tepat, ikuti panah biru')
        return
      }

      setHeadingHint(`${turnInstruction.turnDirection} ${turnInstruction.absoluteAngle.toFixed(0)}° menuju tujuan`)
    }

    renderNavLine()
    updateHeadingHint()

    viewerRef.current.on('scenechange', () => {
      renderNavLine()
      updateHeadingHint()
    })

    viewerRef.current.on('mousedown', (event) => {
      const coords = viewerRef.current.mouseEventToCoords(event)
      if (!coords) {
        return
      }

      const [pitch, yaw] = coords
      const sceneId = viewerRef.current.getScene()
      const roomId = navigationConfig?.destinationRoomId ?? '-'
      console.log(`[Nav Calib] roomId=${roomId} scene=${sceneId} yaw=${yaw.toFixed(2)} pitch=${pitch.toFixed(2)}`)
    })

    const hintInterval = window.setInterval(() => {
      updateHeadingHint()

      if (!viewerRef.current) {
        return
      }

      setViewerPose({
        sceneId: viewerRef.current.getScene(),
        yaw: viewerRef.current.getYaw(),
        pitch: viewerRef.current.getPitch(),
      })
    }, 250)

    return () => {
      window.clearInterval(hintInterval)
      clearNavLine()
      if (viewerRef.current) {
        viewerRef.current.destroy()
        viewerRef.current = null
      }
    }
  }, [
    isOpen,
    initialSceneId,
    destinationFloorId,
    destinationSceneId,
    destinationRoomTarget,
    scenesConfig,
    navigationConfig,
    startPointId,
  ])

  const pageTitle = navigationConfig?.destinationRoomLabel ?? 'FT 1 Informatika'
  const activeSceneTitle = PANORAMA_SCENES[viewerPose.sceneId]?.title ?? PANORAMA_SCENES[initialSceneId]?.title ?? 'FT 1 Informatika'

  return (
    <div
      className={`fixed inset-0 z-[999] transition-opacity duration-500 ${isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
      aria-hidden={!isOpen}
    >
      {isOpen && (
        <>
          <div ref={viewerHostRef} className="h-full w-full" />
          
          {/* Navigation Guide Card */}
          {!navigationConfig && (
            <div className="absolute left-6 top-6 z-10 pointer-events-auto">
              <div className="bg-black/50 backdrop-blur-sm rounded-lg px-4 py-3 max-w-xs">
                <p className="text-sm text-white/90 mb-3 leading-relaxed">
                  Untuk melakukan navigasi, anda dapat menekan tombol ini !
                </p>
                <button
                  type="button"
                  onClick={() => {
                    // Trigger navigation modal from parent
                    if (onNavigationStart) {
                      onNavigationStart()
                    }
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 text-sm font-bold text-white transition hover:from-blue-700 hover:to-purple-700 shadow-lg"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5z" />
                  </svg>
                  NAVIGASI
                </button>
              </div>
            </div>
          )}
          
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-20 rounded-lg bg-black/70 px-3 py-2 text-lg text-white transition hover:bg-black/90"
            aria-label="Close panorama"
          >
            ✕
          </button>
        </>
      )}
    </div>
  )
}

export default PanoramaViewer
