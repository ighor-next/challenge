export type ModalActions<T> = {
  open: (data?: T) => void
  close: () => void
  toggle: () => void
}

export type ModalHookData<T> = {
  isOpen: boolean
  actions: ModalActions<T>
  target: T | null
}
