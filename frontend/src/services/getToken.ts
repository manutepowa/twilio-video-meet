export default async function getMeetToken (username: string, room: string) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACK_URL}/get-token`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, room })
      }
    )
    return await response.json()
  } catch (e) {
    console.error(e)
  }
}
