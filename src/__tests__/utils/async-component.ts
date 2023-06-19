export async function resolveComponent(
  Component: any, // Async component
  props?: any // components props
) {
  const ComponentResolved = await Component(props);
  return () => ComponentResolved;
}
