import { useState, useCallback } from 'react'
import MapView from './MapView'
import PanoramaViewer from './PanoramaViewer'
import BuildingDirectory from './BuildingDirectory'
import searchIcon from './assets/icons/search.svg'
import buildingIcon from './assets/icons/building.svg'
import streetviewIcon from './assets/icons/streetview.svg'
import floorIcon from './assets/icons/floor.svg'

const FLOOR_OPTIONS = [
  { id: 'floor1', label: 'Lantai 1' },
  { id: 'floor2', label: 'Lantai 2' },
]

const ROOMS_BY_FLOOR = {
  floor1: [
    { id: 'ft1-1a', label: 'FT1 1A R. PRODI INFORMATIKA' },
    { id: 'ft1-1b', label: 'FT1 1B R. SIDANG 1' },
    { id: 'ft1-1c', label: 'FT1 1C R. PANEL' },
    { id: 'ft1-1d', label: 'FT1 1D TOILET DOSEN' },
    { id: 'ft1-1e', label: 'FT1 1E R. KULIAH' },
    { id: 'ft1-1f', label: 'FT1 1F R. HMSI' },
    { id: 'ft1-1g', label: 'FT1 1G MUSHOLA WANITA' },
    { id: 'ft1-1h', label: 'FT1 1H TOILET MAHASISWA' },
    { id: 'ft1-1i', label: 'FT1 1I R. PANEL '},
    { id: 'ft1-1j', label: 'FT1 1J R. KULIAH' },
    { id: 'ft1-1k', label: 'FT1 1K R. HMIF' },
    { id: 'ft1-1l', label: 'FT1 1L R. PRODI SISTEM INFORMASI' },
    { id: 'ft1-1m', label: 'FT1 1M R. SIDANG 2' },
  ],
  floor2: [
    { id: 'ft1-2a', label: 'FT 1 2A R. KULIAH' },
    { id: 'ft1-2b', label: 'FT 1 2B R. KULIAH' },
    { id: 'ft1-2c', label: 'FT 1 2C R. PANEL' },
    { id: 'ft1-2d', label: 'FT 1 2D TOILET DOSEN' },
    { id: 'ft1-2e', label: 'FT 1 2E R. KULIAH' },
    { id: 'ft1-2f', label: 'FT 1 2F R. KULIAH' },
    { id: 'ft1-2g', label: 'FT 1 2G R. KULIAH' },
    { id: 'ft1-2h', label: 'FT 1 2H MUSHOLA PRIA' },
    { id: 'ft1-2i', label: 'FT 1 2I TOILET MAHASISWA' },
    { id: 'ft1-2j', label: 'FT 1 2J R. PANEL' },
    { id: 'ft1-2k', label: 'FT 1 2K R. KULIAH' },
    { id: 'ft1-2l', label: 'FT 1 2L R. KULIAH' },
    { id: 'ft1-2m', label: 'FT 1 2M R. KULIAH' },
    { id: 'ft1-2n', label: 'FT 1 2N R. KULIAH' },
  ],
}

const START_POINTS = [
  { id: 'north', label: 'Pintu Masuk Utara (Atas)' },
  { id: 'south', label: 'Pintu Masuk Selatan (Bawah)' },
]

const UNAVAILABLE_ROOM_IDS = new Set([
  'ft1-1g',
  'ft1-1h',
  'ft1-1i',
  'ft1-2h',
  'ft1-2i',
  'ft1-2j',
])

function App() {
  const [isFt1PlanOpen, setIsFt1PlanOpen] = useState(false)
  const [activePlanFloor, setActivePlanFloor] = useState('floor1')
  const [isViewerOpen, setIsViewerOpen] = useState(false)
  const [isDirectoryOpen, setIsDirectoryOpen] = useState(false)
  const [isNavigationModalOpen, setIsNavigationModalOpen] = useState(false)
  const [navigationFloorId, setNavigationFloorId] = useState('floor1')
  const [navigationRoomId, setNavigationRoomId] = useState(ROOMS_BY_FLOOR.floor1[0].id)
  const [navigationStartPointId, setNavigationStartPointId] = useState(START_POINTS[0].id)
  const [navigationConfig, setNavigationConfig] = useState(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleSelectFT1 = useCallback(() => {
    setIsFt1PlanOpen(true)
    setActivePlanFloor('floor1')
    setIsViewerOpen(false)
  }, [])

  const handleSelectFloor = useCallback((floorId) => {
    setIsFt1PlanOpen(true)
    setActivePlanFloor(floorId)
    setIsViewerOpen(false)
  }, [])

  const handleOpenViewer = useCallback(() => {
    setIsFt1PlanOpen(false)
    setIsViewerOpen(true)
    setIsNavigationModalOpen(false)
    setNavigationConfig(null)
  }, [])

  const [viewerStartScene, setViewerStartScene] = useState('scene-a')

  // open viewer and optionally set the starting scene
  const openViewerWithScene = useCallback((scene = 'scene-a') => {
    setViewerStartScene(scene)
    setIsFt1PlanOpen(false)
    setIsViewerOpen(true)
    setIsNavigationModalOpen(false)
    setNavigationConfig(null)
  }, [])

  const handleReturnHome = useCallback(() => {
    setIsDirectoryOpen(false)
    setIsFt1PlanOpen(false)
    setIsViewerOpen(false)
    setIsNavigationModalOpen(false)
    setNavigationConfig(null)
  }, [])

  const handleCloseViewer = useCallback(() => {
    setIsViewerOpen(false)
  }, [])

  const handleOpenNavigationModal = useCallback(() => {
    if (!isFt1PlanOpen) {
      return
    }

    setIsNavigationModalOpen(true)
  }, [isFt1PlanOpen])

  const handleCloseNavigationModal = useCallback(() => {
    setIsNavigationModalOpen(false)
  }, [])

  const handleChangeNavigationFloor = useCallback((event) => {
    const nextFloorId = event.target.value
    setNavigationFloorId(nextFloorId)
    setNavigationRoomId(ROOMS_BY_FLOOR[nextFloorId][0]?.id ?? '')
  }, [])

  const handleStartNavigation = useCallback(() => {
    const selectedRoom = ROOMS_BY_FLOOR[navigationFloorId]?.find((room) => room.id === navigationRoomId)
    const selectedStartPoint = START_POINTS.find((point) => point.id === navigationStartPointId)

    if (!selectedRoom || !selectedStartPoint) {
      return
    }

    if (UNAVAILABLE_ROOM_IDS.has(selectedRoom.id)) {
      return
    }

    setNavigationConfig({
      destinationFloorId: navigationFloorId,
      destinationRoomId: selectedRoom.id,
      destinationRoomLabel: selectedRoom.label,
      startPointId: selectedStartPoint.id,
      startPointLabel: selectedStartPoint.label,
    })

    setIsNavigationModalOpen(false)
    setIsViewerOpen(true)
  }, [navigationFloorId, navigationRoomId, navigationStartPointId])

  const navigationRooms = ROOMS_BY_FLOOR[navigationFloorId] ?? []

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="relative border-b bg-white">
        <div className="mx-auto flex items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden p-2 text-violet-700 hover:bg-violet-50 rounded-md"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isSidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
            <div className="h-12 w-12 flex items-center justify-center bg-transparent flex-shrink-0">
              <img src="logoft.png" alt="Fakultas Teknik" className="h-10 w-10 object-contain" />
            </div>
            <div className="hidden sm:block">
              <div className="text-xs font-medium text-slate-500">Fakultas Teknik</div>
              <div className="text-sm text-slate-400">Universitas Siliwangi</div>
            </div>
          </div>

          <h1 className="text-xl sm:text-3xl font-bold text-violet-700">Navigasift</h1>

          <div className="h-12 w-12 flex items-center justify-center bg-transparent flex-shrink-0">
            <img src="ifunsil.png" alt="Universitas Siliwangi" className="h-10 w-10 object-contain" />
          </div>
        </div>
      </header>

      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-white md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <main className="mx-auto flex flex-col md:flex-row max-w-7xl gap-4 md:gap-6 px-4 py-4 md:py-6 relative">
        <aside className={`fixed inset-x-0 top-0 z-50 h-[100dvh] w-full -translate-y-full border-b border-slate-200 bg-white shadow-2xl transition-transform duration-300 ease-out md:static md:z-auto md:h-auto md:w-72 md:translate-y-0 md:rounded-lg md:border md:shadow-none ${
          isSidebarOpen ? 'translate-y-0' : ''
        }`}>
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 md:hidden">
            <div>
              <div className="text-sm font-semibold text-slate-900">Menu</div>
              <div className="text-xs text-slate-500">Navigasi gedung</div>
            </div>
            <button
              type="button"
              onClick={() => setIsSidebarOpen(false)}
              className="rounded-md p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              aria-label="Close menu"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto p-5 md:max-h-none md:p-5">
            <nav className="space-y-3">

            <button onClick={() => { handleReturnHome(); setIsSidebarOpen(false); }} className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition hover:bg-violet-50">
              <img src={searchIcon} alt="Maps" className="h-5 w-5" />
              <span>MAPS Search</span>
            </button>

            <button onClick={() => { setIsDirectoryOpen(true); setIsFt1PlanOpen(false); setIsViewerOpen(false); setIsSidebarOpen(false); }} className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition hover:bg-violet-50">
              <img src={buildingIcon} alt="Building" className="h-5 w-5" />
              <span>Building Directory</span>
            </button>

            {isFt1PlanOpen && (
              <button onClick={() => { openViewerWithScene(activePlanFloor === 'floor2' ? 'scene-c' : 'scene-a'); setIsSidebarOpen(false); }} className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition hover:bg-violet-50">
                <img src={streetviewIcon} alt="StreetView" className="h-5 w-5" />
                <span>StreetView</span>
              </button>
            )}

            {isFt1PlanOpen && (
              <div className="space-y-2 rounded-md px-3 py-2">
                <div className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <img src={floorIcon} alt="Floor" className="h-4 w-4" />
                  <span>Floor</span>
                </div>
                <div className="ml-2 space-y-1 border-l border-slate-200 pl-3">
                  <button
                    type="button"
                    onClick={() => handleSelectFloor('floor1')}
                    className={`flex w-full items-center rounded-md px-3 py-2 text-left text-sm transition ${
                      activePlanFloor === 'floor1' ? 'bg-violet-100 text-violet-700' : 'hover:bg-violet-50'
                    }`}
                  >
                    <span>Floor 1</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectFloor('floor2')}
                    className={`flex w-full items-center rounded-md px-3 py-2 text-left text-sm transition ${
                      activePlanFloor === 'floor2' ? 'bg-violet-100 text-violet-700' : 'hover:bg-violet-50'
                    }`}
                  >
                    <span>Floor 2</span>
                  </button>
                </div>
              </div>
            )}

            {/* FT1 Controls removed per design - building selection now via blue markers on the map */}
            </nav>
          </div>
        </aside>

        <section className={`flex-1 min-w-0 w-full md:w-auto ${isSidebarOpen ? 'hidden md:block' : ''}`}>
          {isDirectoryOpen ? (
            <div className="relative min-h-[520px] rounded-lg md:rounded-xl border border-slate-200 bg-white overflow-hidden">
              <BuildingDirectory
                onBack={() => { setIsDirectoryOpen(false); setIsSidebarOpen(false); }}
                onSelectBuilding={(id) => {
                  // Close directory and show relevant plan
                  setIsDirectoryOpen(false)
                  setIsViewerOpen(false)
                  setIsSidebarOpen(false)

                  if (id === 'ft1') {
                    setIsFt1PlanOpen(true)
                    setActivePlanFloor('floor1')
                  } else {
                    // Default to campus view if not FT1
                    setIsFt1PlanOpen(false)
                  }
                }}
              />
            </div>
          ) : (
            <div className="relative h-[55vh] md:h-[72vh] min-h-[380px] md:min-h-[520px] overflow-hidden rounded-lg md:rounded-xl border border-slate-200">
              <MapView onSelectFT1={handleSelectFT1} showFt1Plan={isFt1PlanOpen} activeFloor={activePlanFloor} />
            </div>
          )}
        </section>
      </main>

      {isNavigationModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/45 px-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_28px_80px_-24px_rgba(15,23,42,0.45)]">
            <h2 className="text-lg font-semibold text-slate-900">Navigasi FT1</h2>
            <p className="mt-1 text-sm text-slate-600">Pilih tujuan ruangan dan lokasi awal dari 4 pintu masuk.</p>

            <label className="mt-4 block text-sm font-medium text-slate-700">
              Pilih Lantai
              <select
                value={navigationFloorId}
                onChange={handleChangeNavigationFloor}
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700"
              >
                {FLOOR_OPTIONS.map((floor) => (
                  <option key={floor.id} value={floor.id}>
                    {floor.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="mt-3 block text-sm font-medium text-slate-700">
              Pilih Ruangan
              <select
                value={navigationRoomId}
                onChange={(event) => setNavigationRoomId(event.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700"
              >
                {navigationRooms.map((room) => (
                  <option key={room.id} value={room.id} disabled={UNAVAILABLE_ROOM_IDS.has(room.id)}>
                    {room.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="mt-3 block text-sm font-medium text-slate-700">
              Lokasi Awal
              <select
                value={navigationStartPointId}
                onChange={(event) => setNavigationStartPointId(event.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700"
              >
                {START_POINTS.map((point) => (
                  <option key={point.id} value={point.id}>
                    {point.label}
                  </option>
                ))}
              </select>
            </label>

            <div className="mt-5 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleStartNavigation}
                className="rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:bg-sky-700"
              >
                Mulai Navigasi
              </button>
              <button
                type="button"
                onClick={handleCloseNavigationModal}
                className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      <PanoramaViewer
        isOpen={isViewerOpen}
        startScene={viewerStartScene}
        navigationConfig={navigationConfig}
        onClose={handleCloseViewer}
        onNavigationStart={() => setIsNavigationModalOpen(true)}
      />
    </div>
  )
}

export default App
