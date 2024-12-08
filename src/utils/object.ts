export const getValues = (obj: Record<string, string | number> | undefined) => {
  if (!obj) return '';
  return Object.values(obj).join(', ');
};

export const checkVariants = (obj: any) => {
  return (
    !!obj['name'] &&
    Array.isArray(obj['options']) &&
    obj['options'].length > 0 &&
    obj['options'].every((opt) => opt.trim() !== '')
  );
};

export const formattedVariants = (
  variants: { name: string; images: string; options: string }[],
) =>
  variants.map((variant) => ({
    ...variant,
    images: variant.images.split(',').map((i) => i.trim()),
    options: variant.options.split(',').map((o) => o.trim()),
  }));
