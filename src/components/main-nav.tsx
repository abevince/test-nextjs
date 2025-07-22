const MainNav = ({ children }: { children: React.ReactNode }) => {
  return (
    <nav className="w-full h-16 bg-blue-600 flex justify-end items-center px-10">
      {children}
    </nav>
  )
}

export default MainNav
