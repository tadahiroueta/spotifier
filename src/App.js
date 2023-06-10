import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function App() {
  const [search, setSearch] = useState('');

  return (
    <div className="py-14 min-h-screen bg-background flex flex-col items-center">

      <div className='w-5/6 space-y-3'>
        <div className="text-white text-3xl font-semibold">Search</div>
        <div className="py-2 px-5 bg-white rounded-md flex space-x-2">

          <MagnifyingGlassIcon className="h-8 w-8" />

          <input type="text" placeholder='Find your public playlist' 
            value={search} onChange={ e => setSearch(e.target.value) }
            className="placeholder:text-black outline-none" />

        </div>
      </div>

      {/* TODO */}

    </div>
)}