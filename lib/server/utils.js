export function serializeForClient(data) {
  return JSON.parse(JSON.stringify(data));
}
