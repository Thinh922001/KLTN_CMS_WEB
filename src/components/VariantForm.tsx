import React, { useState } from 'react';
import VariantItem from './VariantItem';

interface Variant {
  name: string;
  images: string;
  options: string;
}

function VariantForm() {
  const [variants, setVariants] = useState<Variant[]>([]);

  const handleAddVariant = () => {
    setVariants([...variants, { name: '', images: '', options: '' }]);
  };

  const handleVariantChange = (
    index: number,
    field: keyof Variant,
    value: string,
  ) => {
    const updatedVariants = [...variants];
    updatedVariants[index][field] = value;
    setVariants(updatedVariants);
  };

  const handleRemoveVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedVariants = variants.map((variant) => ({
      ...variant,
      images: variant.images.split(',').map((i) => i.trim()),
      options: variant.options.split(',').map((o) => o.trim()),
    }));
    alert(JSON.stringify(formattedVariants));
  };

  return (
    <form onSubmit={handleSubmit}>
      {variants.map((variant, index) => (
        <VariantItem
          key={index}
          variant={variant}
          index={index}
          handleVariantChange={handleVariantChange}
          handleRemoveVariant={handleRemoveVariant}
        />
      ))}

      <button
        type="button"
        onClick={handleAddVariant}
        className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700"
      >
        + Thêm biến thể mới
      </button>

      <button
        type="submit"
        className="ml-4 mt-4 px-4 py-2 bg-green-600 text-white font-semibold rounded-md shadow hover:bg-green-700"
      >
        Gửi
      </button>
    </form>
  );
}

export default VariantForm;
