/** Resolve public assets for a custom domain or a GitHub Pages project path. */
export function assetPath(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
}
