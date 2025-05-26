// app/about/page.tsx
export default function AboutPage() {
  return (
    <section
      className="min-h-screen px-6 py-20 flex flex-col items-center justify-center text-center"
      style={{ background: 'linear-gradient(rgba(0,0,0,0), rgb(0, 8, 40))' }}
    >
      <h1 className="text-5xl font-bold mb-6 text-white">About Me</h1>
      <p className="text-xl text-white max-w-2xl">
        I’m Sam — a developer passionate about games, simulations, and creating interactive tools.
        I’ve been working with technologies like Roblox Studio, Lua, React, and more. I love bringing
        systems to life, whether it's AI pathfinding, dynamic UI, or multiplayer infrastructure.
      </p>
    </section>
  )
}
