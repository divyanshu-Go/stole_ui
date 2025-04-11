// lib/Utils/socialsFunction.js
export async function toggleLike(elementId) {
    const res = await fetch(`/api/element/${elementId}/likes`, {
      method: "PATCH",
    });
  
    if (!res.ok) throw new Error("Failed to like/unlike");
  
    return await res.json(); // { liked: true/false, likesCount }
  }
  


export async function toggleSave(elementId) {
  const res = await fetch(`/api/element/${elementId}/saves`, {
    method: "PATCH",
  });

  if (!res.ok) throw new Error("Failed to save/unsave");

  return await res.json(); // { saved: true/false, savesCount }
}
