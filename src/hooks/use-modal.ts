import { useState } from 'react'

import { ModalHookData } from '@/types/modal'

export const useModal = <T>(): ModalHookData<T> => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [target, setTarget] = useState<T | null>(null)

  const actions = {
    close: () => {
      setTarget(null)
      setIsOpen(false)
    },
    open: (data?: T) => {
      if (data) setTarget(data)
      setIsOpen(true)
    },
    toggle: () => setIsOpen((currentState) => !currentState),
  }

  return {
    isOpen,
    actions,
    target,
  }
}
