import React from 'react';

interface Variant {
  name: string;
  images: string;
  options: string;
}

interface VariantItemProps {
  variant: Variant;
  index: number;
  handleVariantChange: (
    index: number,
    field: keyof Variant,
    value: string,
  ) => void;
  handleRemoveVariant: (index: number) => void;
}

function VariantItem({
  variant,
  index,
  handleVariantChange,
  handleRemoveVariant,
}: VariantItemProps) {
  return (
    <div className="bg-gray-50 p-4 rounded-md mb-4 shadow">
      <label className="block text-gray-700 font-semibold">Tên biến thể:</label>
      <input
        type="text"
        placeholder="Nhập tên biến thể"
        value={variant.name}
        onChange={(e) => handleVariantChange(index, 'name', e.target.value)}
        className="w-full p-2 mt-1 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <label className="block text-gray-700 font-semibold">
        Hình ảnh (mã màu hoặc link hình ảnh cách nhau bằng `,`):
      </label>
      <input
        type="text"
        placeholder="#bab4a9,#464749"
        value={variant.images}
        onChange={(e) => handleVariantChange(index, 'images', e.target.value)}
        className="w-full p-2 mt-1 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <label className="block text-gray-700 font-semibold">
        Các tùy chọn (cách nhau bằng `,`):
      </label>
      <input
        type="text"
        placeholder="256GB,512GB,1TB"
        value={variant.options}
        onChange={(e) => handleVariantChange(index, 'options', e.target.value)}
        className="w-full p-2 mt-1 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="button"
        onClick={() => handleRemoveVariant(index)}
        className="px-4 py-2 mt-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"
      >
        Xóa biến thể
      </button>
    </div>
  );
}

export default VariantItem;
