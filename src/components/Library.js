import { useEffect, useState } from "react"

import Spotify from "../Spotify"

import genres from "../data/genres.json"
import playlistGenres from "../data/playlistGenres.json"
import NavBottom from "./NavBottom"

const redirectURI = "https://spotifier.tadahiroueta.com/library"

export default function Library() {
  const [ filters, setFilters ] = useState([])
  const [ filtered, setFiltered ] = useState([])
  const [ playlists, setPlaylists ] = useState([])

  useEffect(() => { 
    Spotify.getDevPlaylists(redirectURI)
      .then(setPlaylists)
      .catch(() => {})
  }, [])

  const removeOne = genre => {
    const index = filters.findIndex(filter => filter === genre)
    setFilters(filters.filter((_, i) => i !== index))
  }

  const getFilteredPlaylistGenres = () => {
    if (!filters.length) return playlistGenres

    let filtered = playlistGenres.filter(playlist => playlist.genres.includes(filters[0].name))
    if (filters.length === 1) return filtered

    if (filters[0] !== filters[1]) return filtered.filter(playlist => playlist.genres.includes(filters[1].name))

    return filtered.filter(playlist => playlist.genres.length === 1)
  }

  useEffect(() => {
    if (!playlists.length) return
    const names = getFilteredPlaylistGenres().map(playlist => playlist.name)
    setFiltered(playlists.filter(playlist => names.includes(playlist.name)))
  // eslint-disable-next-line
  }, [ filters, playlists ])

  return (
    <div className="min-h-screen w-full bg-background flex flex-col items-center space-y-4">

      <div className="mt-16 md:mt-24 w-2/3 md:w-5/12 text-white space-y-4 md:space-y-16">
      
        { filters.length ? (
          <div className="flex space-x-3 items-center">
          
            { filters.map((filter, i) => <div onClick={ () => removeOne(filter) } key={ i } className="rounded-full py-1 px-5" style={{ background: filter.color, color: filter.color[2] === "f" ? "black" : null }}>{ filter.name }</div>) }
          
            { filters.length !== 1 ? null : <div className="text-navigation">Add another...</div> }
          
          </div>
        ) : <div className="text-2xl md:text-4xl font-semibold">Dev's Library</div> }

        <div className="min-h-[70vh] md:min-h-[55vh] max-h-[70vh] md:max-h-[55vh] overflow-y-scroll grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-16 no-scrollbar">

          { filters.length >= 2 ? null : genres.map(genre => (
            <div onClick={ () => setFilters([ ...filters, genre ])} key={ genre.name } className="space-y-1">
              <img src="playlist-transparent.png" alt={ genre.name } style={{ background: genre.color }} />
              <div className="text-base font-light">{ genre.name }</div>
            </div>
          ))}

          { !filtered ? null : filtered.map(({ name, cover, link }) => (
            <a href={ link } key={ name }>
              <div className="space-y-1">
                <img src={ cover } alt={ name } />
                <div className="text-base font-light">{ name }</div>
              </div>
            </a>
          ))}

        </div>
      
      </div>

      <NavBottom />
    
    </div>
)}