const ProjectsGrid = ({ projects = [] }) => {
  return (
    <section className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-slate-900">Projects</h2>
        <span className="text-sm text-slate-500">{projects.length} items</span>
      </div>

      {projects.length === 0 ? (
        <p className="mt-4 text-slate-500">No projects added yet.</p>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <article key={project._id} className="overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
              <img
                src={project.imageUrl}
                alt={project.projectName}
                className="h-40 w-full object-cover"
                onError={(event) => {
                  event.currentTarget.src = 'https://placehold.co/600x400?text=Project'
                }}
              />
              <div className="p-4">
                <h3 className="font-semibold text-slate-900">{project.projectName}</h3>
                <p className="mt-1 text-sm text-slate-700">{project.title}</p>
                <p className="mt-2 text-sm text-slate-600 line-clamp-4">{project.description}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default ProjectsGrid
