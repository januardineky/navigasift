import { useState, useCallback } from 'react'
import MapView from './MapView'
import PanoramaViewer from './PanoramaViewer'
import BuildingDirectory from './BuildingDirectory'

const FLOOR_OPTIONS = [
  { id: 'floor1', label: 'Lantai 1' },
  { id: 'floor2', label: 'Lantai 2' },
]

const ROOMS_BY_FLOOR = {
  floor1: [
    { id: 'ft1-1d', label: 'FT1 1D Toilet Dosen' },
    { id: 'ft1-1c', label: 'FT1 1C R. PANEL' },
    { id: 'ft1-1l', label: 'FT1 1L R. PRODI SISTEM INFORMASI' },
    { id: 'ft1-1b', label: 'FT1 1B R. SIDANG 1' },
    { id: 'ft1-1m', label: 'FT1 1M R. SIDANG 2' },
    { id: 'ft1-1a', label: 'FT1 1A R. PRODI INFORMATIKA' },
    { id: 'ft1-1k', label: 'FT1 1K R. HMIF' },
    { id: 'ft1-1e', label: 'FT1 1E R. KULIAH' },
    { id: 'ft1-1f', label: 'FT1 1F R. HMSI' },
    { id: 'ft1-1j', label: 'FT1 1J R. KULIAH' },
    { id: 'ft1-1h', label: 'FT1 1H MUSHOLA WANITA' },
    { id: 'ft1-1i', label: 'FT1 1I TOILET MAHASISWA' },
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
    { id: 'ft1-2k', label: 'FT 1 2K R. KULIAH' },
    { id: 'ft1-2l', label: 'FT 1 2L R. KULIAH' },
    { id: 'ft1-2m', label: 'FT 1 2M R. KULIAH' },
    { id: 'ft1-2n', label: 'FT 1 2N R. KULIAH' },
  ],
}

const START_POINTS = [
  { id: 'west', label: 'Pintu Masuk Barat (Kiri)' },
  { id: 'north', label: 'Pintu Masuk Utara (Atas)' },
  { id: 'east', label: 'Pintu Masuk Timur (Kanan)' },
  { id: 'south', label: 'Pintu Masuk Selatan (Bawah)' },
]

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
        <div className="mx-auto flex items-center justify-between px-6 py-4 max-w-7xl">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 flex items-center justify-center bg-transparent">
              <img src="logoft.png" alt="Fakultas Teknik" className="h-10 w-10 object-contain" />
            </div>
            <div className="hidden sm:block">
              <div className="text-xs font-medium text-slate-500">Fakultas Teknik</div>
              <div className="text-sm text-slate-400">Universitas Siliwangi</div>
            </div>
          </div>

          <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-3xl text-violet-700">Navigasift</h1>

          <div className="h-12 w-12 flex items-center justify-center bg-transparent">
            <img src="ifunsil.png" alt="Universitas Siliwangi" className="h-10 w-10 object-contain" />
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-7xl gap-6 px-4 py-6">
        <aside className="w-72 shrink-0 rounded-lg border bg-white p-5">
          <nav className="space-y-3">

            <button onClick={handleReturnHome} className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm hover:bg-violet-50">
              <svg className="h-5 w-5 text-violet-700 stroke-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 21l-4.35-4.35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="11" cy="11" r="6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span>MAPS Search</span>
            </button>

            <button onClick={() => { setIsDirectoryOpen(true); setIsFt1PlanOpen(false); setIsViewerOpen(false); }} className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm hover:bg-violet-50">
              <svg className="h-5 w-5 text-violet-700 stroke-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 21l-4.35-4.35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span>Building Directory</span>
            </button>

            <button onClick={handleOpenViewer} className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm hover:bg-violet-50">
              <svg className="h-5 w-5 text-violet-700 stroke-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span>StreetView</span>
            </button>

            {isFt1PlanOpen && (
              <div className="space-y-2 rounded-md px-3 py-2">
                <div className="text-sm font-medium text-slate-700">Floor</div>
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
        </aside>

        <section className="flex-1">
          {isDirectoryOpen ? (
            <div className="relative min-h-[520px] rounded-xl border border-slate-200 bg-white">
              <BuildingDirectory
                onBack={() => setIsDirectoryOpen(false)}
                onSelectBuilding={(id) => {
                  // Close directory and show relevant plan
                  setIsDirectoryOpen(false)
                  setIsViewerOpen(false)

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
            <div className="relative h-[72vh] min-h-[520px] overflow-hidden rounded-xl border border-slate-200">
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
                  <option key={room.id} value={room.id}>
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
        startScene="scene-a"
        navigationConfig={navigationConfig}
        onClose={handleCloseViewer}
        onNavigationStart={() => setIsNavigationModalOpen(true)}
      />
    </div>
  )
}

export default App
