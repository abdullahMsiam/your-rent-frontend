export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div>
    {/* Navigation */}
    <nav>Navigation</nav>
    {/* Main Content */}
    {children}
    {/* Footer */}
    <footer>Footer</footer>
    
  </div>
}