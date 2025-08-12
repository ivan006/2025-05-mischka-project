export default async () => {
  const isCacher = window.location.pathname.startsWith('/cacher/');

  // Abort *before* hydration and router kick in
  if (!isCacher) {
    // Skip hydration AND prevent router from being created
    throw new Error('Skipping Vue mount: prerendered page.');
  }
}
