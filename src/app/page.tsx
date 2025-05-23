import ProjectCard from '@/components/ProjectCard'

export default function Home() {
  return (
    <section
      style={{ background: 'linear-gradient(rgba(0,0,0,0), rgb(0, 8, 40))' }}
      className="min-h-screen px-6 py-20 flex flex-col items-center justify-center text-center"
    >
      {/* Hero */}
      <div className="mb-20">
        <h1 className="text-5xl font-bold mb-4 text-white">Hey, I&apos;m Sam</h1>
        <p className="text-xl mb-6 text-white max-w-xl mx-auto">
          I build games, systems, and interactive visualizations — mostly in Roblox & React.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <a href="/projects" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition shadow-lg shadow-blue-800">
            View Projects
          </a>
          <a href="/blog" className="border-2 border-blue-900 px-6 py-2 rounded hover:bg-gray-100 dark:hover:bg-blue-950 transition shadow-md shadow-blue-800">
            Read Blog
          </a>
          <a href="/about" className="border-2 border-blue-900 px-6 py-2 rounded hover:bg-gray-100 dark:hover:bg-blue-950 transition shadow-md shadow-blue-800">
            About Me
          </a>
        </div>
      </div>

      {/* Featured Projects */}
      <div className="w-full max-w-4xl">
        <h2 className="text-3xl font-bold mb-6 text-white">Featured Projects</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <ProjectCard
            title="D3 Leaderboards"
            description="An interactive leaderboard using Blizzards OAuth2 API to get Diablo 3's leaderboards."
            link="/d3-leaderboard"
          />
          <ProjectCard
            title="Roblox Pathfinding"
            description="A grid-based algorithm to move NPCs using math, not MoveTo()."
            link="/blog/roblox-pathfinding"
          />
        </div>
      </div>
    </section>
  )
}
