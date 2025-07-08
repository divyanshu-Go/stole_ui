// lib/api.js
import { headers } from "next/headers"; 

export async function getUserProfile() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/profile`, {
    cache: "no-store",
    headers: await headers(), // This forwards the original request's headers, including the cookie!
  });

  const json = await res.json();
  if (!res.ok || !json.user) {
    throw new Error("User fetch failed. API responded with: " + (json.message || "Unknown error"));
  }

  return json.user;
}

export async function getUserElements(userId) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${userId}/element`, {
    cache: "no-store",
  });

  const json = await res.json();
  if (!res.ok || !json.elements) {
    throw new Error("Elements fetch failed");
  }

  return json.elements;
}



export async function getApprovedElements() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/element`, {
    cache: "no-store", // or `next: { revalidate: 600 }` if you want ISR
  });

  if (!res.ok) {
    throw new Error("Failed to fetch elements");
  }

  const data = await res.json();

  const approved = data.components?.filter((el) => el.status === "approved") || [];
  return approved;
}

export async function getElementById(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/element/${id}`, {
    cache: "no-store", // SSR (avoid stale data)
  });

  if (!res.ok) {
    throw new Error("Failed to fetch element");
  }

  const json = await res.json();
  return json?.data; // ← this is key since your API nests the element inside "data"
}

export async function getAllElements() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/element`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch elements");
  const json = await res.json();
  return json.components;
}
