export default async () => {
  const isCacher = window.location.pathname.startsWith('/cacher/');
  const isSpa = window.location.pathname.startsWith('/spa/');

  // Abort *before* hydration and router kick in
  if (!isCacher && !isSpa) {
    // Skip hydration AND prevent router from being created
    throw new Error('Skipping Vue mount: prerendered page.');
  }
}
