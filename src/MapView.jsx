import { useEffect } from 'react'
import L from 'leaflet'

const CAMPUS_BOUNDS = [
  [0, 0],
  [1000, 1600],
]

const FLOOR1_BOUNDS = [
  [0, 0],
  [800, 1900],
]

const CAMPUS_FT1 = {
  id: 'ft1',
  name: 'FT 1',
  polygon: [
    [672, 902],
    [822, 984],
    [792, 1042],
    [640, 946],
  ],
}

function MapView({ onSelectFT1, showFt1Plan, activeFloor }) {
  useEffect(() => {
    const mapContainer = document.getElementById('leaflet-map-container')

    if (!mapContainer) {
      return
    }

    const map = L.map(mapContainer, {
      crs: L.CRS.Simple,
      minZoom: -1,
      maxZoom: 2,
      zoomControl: false,
      attributionControl: false,
      doubleClickZoom: false,
    })

    const isMobile = window.innerWidth < 768
    const fitBoundsOptions = {
      padding: isMobile ? [12, 12] : [20, 20],
      maxZoom: isMobile ? -1 : 0,
    }

    if (showFt1Plan) {
      const planImage = activeFloor === 'floor2' ? '/denahlt2.jpeg' : '/denahlt1.jpeg'
      const floorLabel = activeFloor === 'floor2' ? 'FT1 - Lantai 2' : 'FT1 - Lantai 1'

      L.imageOverlay(planImage, FLOOR1_BOUNDS).addTo(map)
      map.fitBounds(FLOOR1_BOUNDS, fitBoundsOptions)

      L.tooltip({
        permanent: true,
        direction: 'center',
        className: 'building-label-active',
      })
        .setLatLng([450, 1000])
        .setContent(floorLabel)
        .addTo(map)
    } else {
      L.imageOverlay('/utama.jpeg', CAMPUS_BOUNDS).addTo(map)
      map.fitBounds(CAMPUS_BOUNDS, fitBoundsOptions)

      // Use point markers instead of a polygon for building selection
      const BUILDING_POINTS = [
        // { id: 'dc', name: 'DC', coords: [682, 502], direction: 'left', offset: [-10, 0] },
        // { id: 'labtek1', name: 'Labtek 1', coords: [820.5, 781.5], direction: 'top', offset: [0, -14] },
        { id: 'ft1', name: 'FT 1 Informatika', coords: [716, 964], direction: 'top', offset: [0, -14] },
        // { id: 'ft3', name: 'FT3 Teknik Sipil', coords: [659, 1106], direction: 'right', offset: [10, 0] },
        // { id: 'labtek2', name: 'Labtek 2', coords: [408, 552], direction: 'left', offset: [-10, 0] },
        // { id: 'ft2', name: 'FT2 Elektro', coords: [306, 724], direction: 'top', offset: [0, -14] },
        // { id: 'labtek3', name: 'Labtek 3', coords: [222, 890], direction: 'right', offset: [10, 0] },
      ]

      BUILDING_POINTS.forEach((b) => {
        const marker = L.circleMarker(b.coords, {
          radius: 8,
          color: '#4c1d95',
          fillColor: '#4c1d95',
          fillOpacity: 1,
          weight: 3,
          opacity: 1,
        }).addTo(map)

        marker.bindTooltip(b.name, {
          permanent: true,
          direction: b.direction,
          offset: b.offset,
          className: 'building-label',
        })

        marker.on('click', () => {
          if (b.id === 'ft1') {
            onSelectFT1()
          } else {
            // non-FT1 markers currently only show the tooltip; expand behaviour if needed
            console.log('Selected building', b.id)
          }
        })
      })
    }
    map.on('click', function (e) {
      console.log('LAT:', e.latlng.lat, 'LNG:', e.latlng.lng)
    })

    return () => {
      map.remove()
    }
  }, [onSelectFT1, showFt1Plan, activeFloor])

  return <div id="leaflet-map-container" className="h-full w-full" />
}

export default MapView
