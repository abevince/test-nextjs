import {
  DialogPanel,
  DialogTitle,
  Dialog as HeadlessDialog,
} from '@headlessui/react'

const Dialog = ({
  isOpen,
  onOpen,
  onClose,
  children,
  title,
}: {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  children: React.ReactNode
  title: string
}) => {
  return (
    <HeadlessDialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={onClose}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl duration-200 ease-out shadow-xl data-closed:transform-[scale(95%)] data-closed:opacity-0"
          >
            <DialogTitle as="h3" className="text-base/7 font-medium text-black">
              {title}
            </DialogTitle>
            {children}
          </DialogPanel>
        </div>
      </div>
    </HeadlessDialog>
  )
}

export default Dialog
