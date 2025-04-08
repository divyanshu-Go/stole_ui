import React from 'react';
import Link from 'next/link';
import { Code, Heart, Bookmark, MessageSquare } from 'lucide-react';

const ElementCard = ({ element }) => {
  const { _id, title, htmlCode, cssCode, authorId } = element;
  
  // Future properties (commented out for now)
  // const { likes = 0, saves = 0, comments = 0 } = element;
  
  return (
    <div className="group  bg-zinc-900 rounded-xl overflow-hidden border-[3px] border-zinc-800 
    transition-all duration-100 hover:scale-[1.01] hover:rounded-2xl hover:border-zinc-700">
      <div className="relative aspect-video ">
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
                    background: #d4d4d8;
                    color: #e4e4e7;
                    overflow: clip;
                  }
                </style>
              </head>
              <body>${htmlCode}</body>
            </html>
          `}
          className="w-full h-full pointer-events-auto overflow-hidden"
          title={title || 'UI Element'}
        />
        
        <Link 
          href={`/elements/elementId/${_id}`} 
          className="absolute bottom-2 right-2 flex items-center gap-1 bg-zinc-800
           hover:bg-zinc-950 hover:border-violet-100 text-zinc-200 px-3 py-1.5 rounded-md 
           sm:text-xs font-medium transition-colors duration-200 border-2 border-zinc-700
           text-xs"
           
        >
          <Code size={16} />
          <span>Get code</span>
        </Link>
      </div>
      
      <div className="p-3 flex items-center justify-between border-t border-zinc-800">
        <p className="text-xs tracking-wider font-medium text-zinc-400 truncate">
          by <span className="text-zinc-300 hover:text-white transition-colors">{authorId.name}</span>
        </p>
        
        <div className="flex items-center gap-3 text-zinc-500">
          <button className="flex items-center gap-1 hover:text-red-400 transition-colors">
            <Heart size={16} />
            <span className="text-xs">0</span>
          </button>
          
          <button className="flex items-center gap-1 hover:text-blue-400 transition-colors">
            <Bookmark size={16} />
            <span className="text-xs">0</span>
          </button>
          
          <button className="flex items-center gap-1 hover:text-green-400 transition-colors">
            <MessageSquare size={16} />
            <span className="text-xs">0</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ElementCard;