export const getValues = (obj: Record<string, string | number> | undefined) => {
  if (!obj) return '';
  return Object.values(obj).join(', ');
};
