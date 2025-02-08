// SubmitForm.jsx
import React from 'react';

const SubmitForm = ({
  title,
  setTitle,
  description,
  setDescription,
  category,
  setCategory,
  tags,
  setTags,
  onSubmit,
}) => {
  const handleTagInputKeyDown = (e) => {
    if (e.key === 'Enter' && e.target.value.trim() !== '') {
      setTags([...tags, e.target.value.trim()]);
      e.target.value = '';
    }
  };

  const handleTagRemove = (index) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1);
    setTags(updatedTags);
  };

  return (
    <div className="mt-4">
      <h1 className="text-2xl font-bold mb-4">Submit Component</h1>
      <div className="mb-4">
        <label htmlFor="title" className="block font-medium mb-1">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block font-medium mb-1">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
          rows={3}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="category" className="block font-medium mb-1">
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
        >
          <option value="Button">Button</option>
          <option value="Card">Card</option>
          <option value="Loader">Loader</option>
          <option value="Switch">Switch</option>
          <option value="Form">Form</option>
          <option value="Pattern">Pattern</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="tags" className="block font-medium mb-1">
          Tags
        </label>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="bg-gray-200 rounded-full px-3 py-1 text-sm flex items-center"
            >
              {tag}
              <button
                type="button"
                className="ml-2 text-gray-500 hover:text-gray-700"
                onClick={() => handleTagRemove(index)}
              >
                x
              </button>
            </div>
          ))}
          <input
            type="text"
            id="tags"
            onKeyDown={handleTagInputKeyDown}
            placeholder="Add a tag and press Enter"
            className="border border-gray-300 rounded-md px-3 py-2 flex-1"
          />
        </div>
      </div>
      <button
        type="button"
        onClick={onSubmit}
        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
      >
        Submit
      </button>
    </div>
  );
};

export default SubmitForm;