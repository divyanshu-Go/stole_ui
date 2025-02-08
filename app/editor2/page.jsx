
"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const CodeEditor = dynamic(() => import('@/components/CodeEditor'), { ssr: false });
const PreviewPanel = dynamic(() => import('@/components/PreviewPanel'), { ssr: false });

const SubmitForm = dynamic(() => import('@/components/SubmitForm'), { ssr: false });

const ElementSubmissionPage = () => {
  const router = useRouter();
  const [htmlCode, setHtmlCode] = useState('');
  const [cssCode, setCssCode] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Other');
  const [tags, setTags] = useState([]);

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/element', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          htmlCode,
          cssCode,
          category,
          tags,
        }),
      });

      if (response.ok) {
        // Redirect to the dashboard or element details page
        await router.push('/dashboard');
      } else {
        // Handle error
        console.error('Error submitting element:', response.status);
      }
    } catch (error) {
      console.error('Error submitting element:', error);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 p-6 border-r border-gray-300">
        <h1 className="text-2xl font-bold mb-4">HTML</h1>
        <CodeEditor
          language="html"
          value={htmlCode}
          onChange={setHtmlCode}
          className="h-[calc(50vh-2rem)]"
        />

        <h1 className="text-2xl font-bold mb-4 mt-4">CSS</h1>
        <CodeEditor
          language="css"
          value={cssCode}
          onChange={setCssCode}
          className="h-[calc(50vh-2rem)] "
        />
      </div>

      <div className="w-1/2 p-6">
        <PreviewPanel htmlCode={htmlCode} cssCode={cssCode} />
        <SubmitForm
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          category={category}
          setCategory={setCategory}
          tags={tags}
          setTags={setTags}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default ElementSubmissionPage;