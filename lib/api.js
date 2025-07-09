import { cookies } from "next/headers";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://stole-ui.vercel.app";

export async function getUserProfile() {
  const cookieStore = await cookies(); // 🟢 This reads cookies on the server
  const token = cookieStore.get("auth_token")?.value ;

  if (!token) {
    return null;
  }

  const res = await fetch(`${BASE_URL}/api/user/profile`, {
    method: "GET",
    headers: {
      Cookie: `auth_token=${token}`, // 🟢 Pass the cookie to the backend API
    },
    cache: "no-store",
  });

  const json = await res.json();
  if (!res.ok || !json.user) {
    console.error("User fetch failed. API responded with: " + (json.message || "Unknown error"));
  }

  return json.user;
}

export async function getUserElements(userId) {
  const res = await fetch(`${BASE_URL}/api/user/${userId}/element`, {
    cache: "no-store",
  });

  const json = await res.json();
  if (!res.ok || !json.elements) {
    console.error("Elements fetch failed");
  }

  return json.elements;
}

export async function getApprovedElements() {
  const res = await fetch(`${BASE_URL}/api/element`, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Failed to fetch elements");
  }

  const data = await res.json();
  const approved = data.components?.filter((el) => el.status === "approved") || [];
  return approved;
}

export async function getElementById(id) {
  const res = await fetch(`${BASE_URL}/api/element/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Failed to fetch element");
  }

  const json = await res.json();
  return json?.data;
}

export async function getAllElements() {
  const res = await fetch(`${BASE_URL}/api/element`, {
    cache: "no-store",
  });

  if (!res.ok) console.error("Failed to fetch elements");
  const json = await res.json();
  return json.components;
}

export async function getStats() {
  try {
    const [elementRes, userRes] = await Promise.all([
      fetch(`${BASE_URL}/api/stats/elements`, { cache: "no-store" }),
      fcetch(`${BASE_URL}/api/stats/users`, { cache: "no-store" }),
    ]);

    if (!elementRes.ok || !userRes.ok) {
      throw new Error("Failed to fetch stats");
    }

    const [elementData, userData] = await Promise.all([
      elementRes.json(),
      userRes.json(),
    ]);

    return {
      elementCount: elementData.count || 0,
      userCount: userData.count || 0,
    };
  } catch (err) {
    console.error("Error fetching stats:", err);
    return {
      elementCount: 0,
      userCount: 0,
    };
  }
}

export async function getCategory() {
  const res = await fetch(`${BASE_URL}/api/category`, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Failed to fetch categories");
    return [];
  }

  const categories = await res.json();
  return categories;
}


