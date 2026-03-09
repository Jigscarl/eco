export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-10 py-4 bg-green-700 text-white">

      <h2 className="text-xl font-bold">
        EcoTrack
      </h2>

      <div className="space-x-6">
        <a href="#" className="hover:underline">Register</a>
        <a href="#" className="hover:underline">Login</a>

      </div>

    </nav>
  )
}