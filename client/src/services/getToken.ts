export default async function getMeetToken(username: string, room: string) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/get-token`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, room }),
      }
    )
    const json = await response.json()
    return json.token
  } catch (e) {
    console.error(e)
  }
}
