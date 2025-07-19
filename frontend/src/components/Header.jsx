export default function Header() {
  return (
    <header className="bg-gray-200 text-black px-6 py-4 shadow-md flex justify-between items-center">
      <h1 className="text-2xl font-bold">read-me</h1>
      <nav className="space-x-4">
        <a href="#" className="hover:underline">
          home
        </a>
        <a href="#" className="hover:underline">
          my library
        </a>
        <a href="#" className="hover:underline">
          account
        </a>
      </nav>
    </header>
  );
}
