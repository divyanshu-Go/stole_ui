"use client";

export default function SubmitSection() {
  return (
    <section className="container py-12">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-3xl font-bold tracking-tighter mb-8">Submit Your Element</h2>
        <form className="space-y-4">
          <div>
            <input 
              type="text" 
              placeholder="Element Title" 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <textarea 
              placeholder="CSS Code" 
              className="w-full px-4 py-2 border border-gray-300 rounded-md min-h-[200px] font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <div>
            <button 
              type="submit" 
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit Element
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
