export function get(url) {
  return fetch(url)
    .then(res => res.json())
}

export function post(url, body = {}) {
  const headers = new Headers({
    'Content-Type': 'application/json'
  })

  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers
  })
    .then(res => res.json())
}
