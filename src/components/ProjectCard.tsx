import Link from "next/link";

type ProjectCardProps = {
  title: string;
  description: string;
  link: string;
};

export default function ProjectCard({ title, description, link }: ProjectCardProps) {
  return (
    <div className="border-2 border-gray-200 dark:border-blue-500 rounded-2xl p-6 py-10 shadow-sm hover:shadow-md transition bg-white dark:bg-gray-950">
      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
      
      <Link href={link} className="bg-blue-600 text-white px-8 py-2 rounded hover:bg-blue-700 transition shadow-md shadow-blue-800">
        View Project →
      </Link>
      {/* <Link href={link} className="text-md border-2 rounded py-1 px-6 text-blue-500 bg-gray-900 hover:underline shadow-md shadow-blue-800">
        View Project →
      </Link> */}
    </div>
  );
}
