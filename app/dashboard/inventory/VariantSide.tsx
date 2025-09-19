import { RegularButton } from "@/app/components/Button";
import { Select } from "radix-ui";
import { AiOutlineClose } from "react-icons/ai";
import { FaAngleDown, FaPlus } from "react-icons/fa6";
import { SelectDropdown, Switch } from "@/app/components/Input";

export default function VariantSide({
  setIsAddVariantOpen,
  variants,
  savedVariants,
}: {
  setIsAddVariantOpen: (show: boolean) => void;
  variants: string[];
  savedVariants: { name: string; values: string[] }[];
}) {
  return (
    <div className="mt-3">
      <div className="border border-gray-300 rounded-md p-2">
        <div className="flex flex-col gap-1 mb-2">
          <p className="text-sm md:text-[17px]">Variants</p>
          <p className="text-xs md:text-xs text-gray-600">
            Add or create variations for your product. e.g., Size, Color.
          </p>
        </div>
        <Select.Root>
          <Select.Trigger className="flex items-center justify-between gap-2 shadow-sm p-1.5 w-full rounded-sm text-gray-600 border border-gray-300 hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500">
            <Select.Value placeholder="Select an option" />
            <FaAngleDown className="text-gray-500" />
          </Select.Trigger>

          <Select.Portal>
            <Select.Content className="bg-white rounded-md shadow-lg">
              <Select.Viewport className="p-1">
                {variants.map((variant) => (
                  <Select.Item
                    key={variant}
                    value={variant}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer rounded"
                  >
                    <Select.ItemText>{variant}</Select.ItemText>
                  </Select.Item>
                ))}
              </Select.Viewport>
              <Select.Arrow />
            </Select.Content>
          </Select.Portal>
        </Select.Root>
        <p
          onClick={() => setIsAddVariantOpen(true)}
          className="flex items-center justify-end mt-1 cursor-pointer gap-1 text-sm"
        >
          <FaPlus size={10} /> Add Variant
        </p>
        {savedVariants.map((variant) => (
          <div
            className="card bg-gray-50 border border-gray-300 mt-3 rounded flex flex-col gap-2 p-3"
            key={variant.name}
          >
            <p>{variant.name}</p>
            <div className="flex flex-wrap">
              <p className="flex flex-wrap items-center gap-2 px-2 py-1 relative text-xs space-x-2">
                {variant.values.map((value) => (
                  <p
                    key={value}
                    className="flex items-center gap-2 border-gray-300 rounded bg-gray-200 p-2"
                  >
                    {value}
                    <AiOutlineClose />
                  </p>
                ))}
              </p>
            </div>
            <input type=" border border-2" />
          </div>
        ))}
      </div>
      <RegularButton label="Generate Variant" className="w-full text-sm mt-3" />
      <div className="border mt-4 border-gray-300 rounded p-2">
        <p>Variant Pricing & Stock</p>
        <div className="overflow-hidden shadow rounded-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300 text-xs md:text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3.5 px-3 text-left font-semibold text-gray-900"></th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 bg-white text-gray-500">
                <tr className="hover:bg-gray-50">
                  <td className={`whitespace-nowrap px-3 py-4 `}></td>
                  <td className="whitespace-nowrap px-3 py-4 text-right"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-3">
        <p>Add image variant</p> <Switch />
      </div>
    </div>
  );
}
