// components/ElementCard.jsx
import Link from 'next/link';

const ElementCard = ({ element }) => {
  const { _id, title, htmlCode, cssCode, authorId } = element;
  
  return (
    <Link 
      href={`/elements/elementId/${_id}`}
      className="group block bg-zinc-100 rounded-lg overflow-hidden transition-transform hover:scale-[1.02]"
    >
      <div className="relative aspect-video bg-white">
        <iframe
          srcDoc={`
            <html>
              <head>
                <style>
                  ${cssCode}
                  /* Reset styles for preview */
                  body {
                    margin: 0;
                    display: grid;
                    place-items: center;
                    min-height: 100vh;
                    background: white;
                  }
                </style>
              </head>
              <body>${htmlCode}</body>
            </html>
          `}
          className="w-full h-full pointer-events-none"
          title={title || 'UI Element'}
        />
      </div>
      <div className="p-3 bg-zinc-100">
        <h3 className="font-medium text-zinc-900 truncate">
          {title || 'Untitled Element'}
        </h3>
        <p className="text-sm text-zinc-600">
          by {authorId.name}
        </p>
      </div>
    </Link>
  );
};

export default ElementCard;