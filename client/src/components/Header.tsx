const Header = () => {
    return (
        <header className="flex items-center justify-between px-8 py-5 border-b border-[#333333] bg-transparent">
            {/* Logo area */}
            <div className="flex items-center">
                <span className="font-semibold text-gray-200 text-sm tracking-widest uppercase">Perplexity_V2</span>
            </div>

            {/* Nav links */}
            <div className="flex items-center space-x-6">
                <a className="text-gray-500 text-xs font-semibold tracking-wider hover:text-gray-200 transition-colors cursor-pointer">HOME</a>
                <a className="text-gray-200 text-xs font-semibold tracking-wider cursor-pointer border-b px-1 py-1 border-gray-400">CHAT</a>
                <a className="text-gray-500 text-xs font-semibold tracking-wider hover:text-gray-200 transition-colors cursor-pointer">SETTINGS</a>
            </div>
        </header>
    )
}

export default Header