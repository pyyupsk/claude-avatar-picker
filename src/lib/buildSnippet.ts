export function buildSnippet(id: number): string {
	return `(async () => {
  const root = document.getElementById('root')
  const key = Object.keys(root).find(k => k.startsWith('__reactContainer'))
  const find = (f, seen = new Set()) => {
    if (!f || seen.has(f)) return null
    seen.add(f)
    for (const o of [f.memoizedProps, f.stateNode, f.memoizedState]) {
      if (o && typeof o === 'object') {
        if (o.invalidateQueries && o.getQueryCache) return o
        for (const v of Object.values(o)) {
          if (v?.invalidateQueries && v?.getQueryCache) return v
        }
      }
    }
    return find(f.child, seen) || find(f.sibling, seen)
  }
  const qc = window.__qc || (window.__qc = find(root[key]))
  await fetch('/api/account_profile', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ avatar: ${id} }),
  })
  await qc.invalidateQueries()
})()`;
}
