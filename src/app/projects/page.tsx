// app/projects/page.tsx
import ProjectCard from '@/components/ProjectCard'

export default function ProjectsPage() {
  return (
    <section
      className="min-h-screen px-6 py-20 flex flex-col items-center text-center"
      style={{ background: 'linear-gradient(rgba(0,0,0,0), rgb(0, 8, 40))' }}
    >
      <h1 className="text-5xl font-bold mb-6 text-white">Projects</h1>
      <p className="text-xl text-white max-w-xl mb-10">
        Here’s a collection of some things I’ve built — from game systems to web apps.
      </p>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl w-full">
        <ProjectCard
          title="D3 Leaderboards"
          description="Interactive Diablo 3 leaderboard using OAuth2 and Blizzard's public API."
          link="/d3-leaderboard"
        />
        <ProjectCard
          title="Roblox Pathfinding"
          description="Custom algorithm to simulate NPC movement using math, not Roblox's default MoveTo()."
          link="/blog/roblox-pathfinding"
        />
        {/* Add more ProjectCards here */}
      </div>
    </section>
  )
}
