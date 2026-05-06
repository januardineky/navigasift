import React from 'react'

const BUILDINGS = [
  { id: 'ft1', name: 'FT 1 Informatika', desc: 'Fakultas Teknik - Jurusan Informatika', img: '/ifunsil.png' },
  { id: 'ft2', name: 'FT 2 Elektro', desc: 'Fakultas Teknik - Jurusan Elektro', img: '/ifunsil.png' },
  { id: 'labtek1', name: 'Labtek 1', desc: 'Laboratorium Teknik 1', img: '/ifunsil.png' },
  { id: 'labtek2', name: 'Labtek 2', desc: 'Laboratorium Teknik 2', img: '/ifunsil.png' },
  { id: 'labtek3', name: 'Labtek 3', desc: 'Laboratorium Teknik 3', img: '/ifunsil.png' },
  { id: 'ft3', name: 'FT 3 Teknik Sipil', desc: 'Fakultas Teknik - Teknik Sipil', img: '/ifunsil.png' },
]

export default function BuildingDirectory({ onBack, onSelectBuilding }) {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-slate-900">Building Directory</h2>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {BUILDINGS.map((b) => (
          <div
            key={b.id}
            role="button"
            tabIndex={0}
            onClick={() => onSelectBuilding && onSelectBuilding(b.id)}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelectBuilding && onSelectBuilding(b.id)}
            className="group relative cursor-pointer overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg focus:outline-none"
          >
            <div className="h-36 overflow-hidden bg-slate-50">
              <img src={b.img} alt={b.name} className="h-full w-full object-cover" />
            </div>

            <div className="p-4">
              <div className="mb-2 text-sm font-semibold text-slate-800">{b.name}</div>
              <div className="text-sm text-slate-500">{b.desc}</div>
            </div>

            <div className="pointer-events-none absolute -inset-px rounded-xl border-2 border-transparent transition group-hover:border-violet-500" />
          </div>
        ))}
      </div>
    </div>
  )
}
