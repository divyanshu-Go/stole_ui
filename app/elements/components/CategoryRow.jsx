// components/CategoryRow.jsx
import Link from 'next/link';
import ElementCard from './ElementCard';

const CategoryRow = ({ category, elements }) => {
  // Take only first 4 elements
  const displayElements = elements.slice(0, 4);
  
  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">{category}</h2>
        <Link 
          href={`/elements/${category.toLowerCase()}`}
          className="text-sm text-blue-400 hover:text-blue-300"
        >
          View All
        </Link>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayElements.map(element => (
          <ElementCard key={element._id} element={element} />
        ))}
      </div>
    </section>
  );
};

export default CategoryRow;