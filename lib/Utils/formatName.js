// Utils/formatName.js
export function formatUserName(name) {
    if (!name) return "";
  
    // If name is 9 characters or less, return as is
    if (name.length <= 9) return name;
  
    // Try to split by whitespace and return the first part
    const parts = name.trim().split(" ");
    return parts[0].length <= 9 ? parts[0] : parts[0].slice(0, 9) + "...";
  }
  