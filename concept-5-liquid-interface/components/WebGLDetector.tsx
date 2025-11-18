'use client'

import { useEffect, useState } from 'react'

export default function WebGLDetector({ children }: { children: React.ReactNode }) {
  const [webglSupported, setWebglSupported] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      setWebglSupported(!!gl)
    } catch (e) {
      setWebglSupported(false)
    } finally {
      setLoading(false)
    }
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-pulse">⚒</div>
          <p className="text-orange-500 font-mono">Checking system compatibility...</p>
        </div>
      </div>
    )
  }

  if (!webglSupported) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white p-8">
        <div className="max-w-2xl text-center">
          <h1 className="text-4xl font-bold mb-4">🚫 WebGL Not Supported</h1>
          <p className="text-lg text-gray-400 mb-6">
            Your browser doesn't support WebGL, which is required for the 3D experience.
          </p>
          <div className="text-left bg-gray-900 p-6 rounded-lg mb-6">
            <h3 className="font-bold mb-3">To enable WebGL:</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Update to the latest version of your browser</li>
              <li>Enable hardware acceleration in browser settings</li>
              <li>Try a different browser (Chrome, Firefox, Edge)</li>
              <li>Update your graphics drivers</li>
            </ul>
          </div>
          <a
            href="https://get.webgl.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-orange-500 rounded-lg font-bold hover:bg-orange-600 transition"
          >
            Learn More About WebGL
          </a>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
