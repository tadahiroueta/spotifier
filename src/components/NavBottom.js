import { useLocation, useNavigate } from "react-router-dom"
import { MagnifyingGlassIcon, Square3Stack3DIcon } from "@heroicons/react/24/solid"

export default function NavBottom() {
	const { pathname } = useLocation()
	const navigate = useNavigate()

	return (
    <div className="mb-6 text-navigation text-xs font-light flex space-x-8 md:text-base">

      <div onClick={ () => navigate("../search") } className={ "w-24 flex flex-col items-center space-y-1 md:w-48 " + (pathname === "/search" ? "!text-white" : null) }>
        <MagnifyingGlassIcon className="h-8 md:h-16" />
        <div>Search</div>
      </div>

      <div onClick={ () => navigate("../library") } className={ "w-24 flex flex-col items-center space-y-1 md:w-48 " + (pathname === "/search" ? null : "!text-white") }>
        <Square3Stack3DIcon className="h-8 md:h-16" />
        <div>Dev's Library</div>
      </div>

    </div>	
)}