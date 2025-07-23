import { cn } from '@/utils/lib'

const Card = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div className={cn('rounded-md bg-white p-4 shadow-sm', className)}>
      {children}
    </div>
  )
}

export default Card
