const Card = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div className={`rounded-md bg-white p-4 shadow-sm ${className}`}>
      {children}
    </div>
  )
}

export default Card
