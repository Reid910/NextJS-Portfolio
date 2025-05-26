// app/blog/page.tsx
export default function BlogPage() {
  return (
    <section
      className="min-h-screen px-6 py-20 flex flex-col items-center text-center"
      style={{ background: 'linear-gradient(rgba(0,0,0,0), rgb(0, 8, 40))' }}
    >
      <h1 className="text-5xl font-bold mb-6 text-white">Blog</h1>
      <p className="text-xl text-white max-w-xl mb-10">
        Thoughts, tutorials, and breakdowns of projects I’m working on or ideas I’ve explored.
      </p>
      {/* Example posts */}
      <div className="grid gap-6 max-w-3xl w-full">
        <a href="/blog/roblox-pathfinding" className="bg-white/5 p-6 rounded-xl border border-blue-900 text-left text-white hover:bg-white/10 transition">
          <h2 className="text-2xl font-bold mb-2">Roblox Pathfinding without MoveTo()</h2>
          <p className="text-sm">How I created a math-based system to move NPCs across a grid.</p>
        </a>
        {/* Add more blog post links here */}
      </div>
    </section>
  )
}
