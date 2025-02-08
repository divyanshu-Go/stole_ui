export default function EditorLayout({ children }) {
    return (
      <main className="light-mode">
        <div className=" relative min-h-screen flex flex-col mx-6">
              
              <main className=" flex-1">{children}</main>
              
            </div>
      </main>
    );
  }