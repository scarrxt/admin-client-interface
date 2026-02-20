const BioSection = ({ bio }) => {
  return (
    <section className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <h2 className="text-2xl font-semibold text-slate-900">About Me</h2>
      <p className="mt-4 text-slate-600 leading-7">{bio || 'Bio will be updated from the dashboard.'}</p>
    </section>
  )
}

export default BioSection
