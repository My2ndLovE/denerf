import { useState, useCallback } from 'react'

export type CursorState = 'default' | 'hover' | 'click'

export function useCursor() {
  const [cursorState, setCursorState] = useState<CursorState>('default')

  const setHover = useCallback(() => setCursorState('hover'), [])
  const setDefault = useCallback(() => setCursorState('default'), [])
  const setClick = useCallback(() => setCursorState('click'), [])

  return {
    cursorState,
    setCursorState,
    setHover,
    setDefault,
    setClick,
  }
}
