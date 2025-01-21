export function ConditionalDecorator(
  condition: boolean,
  decorator: MethodDecorator,
) {
  // if condition is true, apply the decorator
  if (condition) {
    return decorator;
  }

  // if condition is false, return no-op decorator
  return () => {
    // Do nothing
  };
}
