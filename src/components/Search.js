import { useState, useEffect } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

import Spotify from "../Spotify"

const PLAYLIST_PLACEHOLDER = { name: "", cover: "playlist-placeholder.png", link: "" }

export default function Search() {
  const [ searchTerm, setSearchTerm ] = useState('');
  const [ searchResults, setSearchResults ] = useState([]);
  const [ playlist, setPlaylist ] = useState(PLAYLIST_PLACEHOLDER);

  useEffect(() => { Spotify.getAccessToken() }, [])

  /**
   * Tries to find the cover of a playlist that includes the song
   * 
   * @param {Array} playlists (made by user)
   * @param {Object} song -- top result from search
   * @returns {string} href of playlist cover image
   */
  const searchPlaylist = async (songName) => { 
    for (const playlist of await Spotify.getPlaylists()) if (playlist.songs.find(song => songName === song)) {
      setPlaylist(playlist)
      return
    }
    setPlaylist(PLAYLIST_PLACEHOLDER)
  }

  const search = async term => {
    // search for song
    const results = await Spotify.searchSong(term)

    if (results.length === 0) return search(term)

    setSearchResults(results)
    searchPlaylist(results[0].name)
  }

  const handleClick = result => {
    const term = result.name + " " + result.artist
    setSearchTerm(term)
    search(term)
  }

  return (
    <div className={ 'min-h-screen w-full bg-background flex flex-col items-center ' + (searchTerm ? "!bg-active-background" : null) }>

      <div className={ "pt-16 pb-4 w-full flex flex-col items-center " + (searchTerm ? "bg-search-background" : null) }>
        <div className='w-5/6 space-y-3'>

          { searchTerm ? null : <div className={ "text-white text-[1.7rem] font-semibold " }>Search</div> }

          <div className="w-full font-extralight flex items-center justify-between space-x-6">

            <div className={ "py-2 px-5 rounded-md flex-grow bg-white text-black flex items-center space-x-2 " + (searchTerm ? "px-1 h-7 bg-search text-white" : null)}>

              <MagnifyingGlassIcon className={ "h-8 w-8 " + (searchTerm ? "h-6 w-6" : null) } />

              <input type="text" placeholder='Find your public playlist' value={ searchTerm } onChange={ e => setSearchTerm(e.target.value) } onKeyUp={({ key }) => { if (key === "Enter") search(searchTerm) }} className="w-5/6 bg-transparent placeholder:text-black outline-none" />

              { searchTerm ? <XMarkIcon onClick={ () => setSearchTerm("") } className="h-6 w-6" /> : null }

            </div>

            { searchTerm ? <div onClick={ () => setSearchTerm("") } className={ "text-white " }>Cancel</div> : null }

          </div>

        </div>
      </div>

      <div className="mt-6 w-5/6 flex flex-col space-y-4">
        { !searchResults ? null : searchResults.map((result, i) => (
          <div onClick={ () => handleClick(result) } key={ i } className="flex items-center space-x-4">
            
            <img src={ result.cover } alt={ result.name } className='w-14' />

            <div className="">
              <div className="text-white">{ result.name }</div>
              <div className="text-navigation text-sm">{ result.artist }</div>
            </div>

          </div>
        ))}
      </div>

      <a href={ playlist.link } className='mt-10 w-7/12 space-y-5' >
        <img src={ playlist.cover } alt="playlist-placeholder" />
        <div className='text-center text-xl font-light text-white'>{ playlist.name }</div>
      </a>

    </div>
)}