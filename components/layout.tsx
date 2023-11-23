
export default function Layout({ children }: { children: any}) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="bg-black sticky top-0 h-14 flex justify-center items-center font-semibold uppercase text-white">
        PSA
      </header>
      <div className="flex flex-col md:flex-row flex-1">
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
