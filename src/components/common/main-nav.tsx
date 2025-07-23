import { cn } from '@/utils/lib'

const MainNav = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <nav
      className={cn(
        'w-full h-16 bg-blue-600 flex justify-end items-center px-10',
        className,
      )}
    >
      {children}
    </nav>
  )
}

export default MainNav
