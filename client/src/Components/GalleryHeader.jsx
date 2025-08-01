import { Search } from 'lucide-react';

const GalleryHeader = ({ searchTerm, setSearchTerm }) => (
  <header className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-800/50 sticky top-0 z-40">
    <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
        <h1 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent tracking-tight text-center sm:text-left">
          Viewer
        </h1>
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
          <input
            type="text"
            placeholder="Search photos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-800/50 border border-gray-700/50 rounded-full pl-9 sm:pl-10 pr-4 py-2 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 w-full sm:w-64 text-sm focus:outline-none"
          />
        </div>
      </div>
    </div>
  </header>
);

export default GalleryHeader;