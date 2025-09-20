import { RegularButton } from "@/app/components/Button";
import { Select } from "radix-ui";
import { AiOutlineClose } from "react-icons/ai";
import { FaAngleDown, FaPlus } from "react-icons/fa6";
import { SelectDropdown, Switch } from "@/app/components/Input";
import { useState } from "react";
import { toast } from "react-toastify";
import { StockTable } from "@/app/components/Table";

export default function VariantSide({
  setIsAddVariantOpen,
  variants,
  savedVariants,
}: {
  setIsAddVariantOpen: (show: boolean) => void;
  variants: string[];
  savedVariants: { name: string; values: string[] }[];
}) {
  // Default input type when none chosen for a specific variant
  const [selectedVariant, setSelectedVariant] = useState<string>("text");
  // Per-variant selected input type (text | color | number | range)
  const [variantInputTypes, setVariantInputTypes] = useState<
    Record<string, string>
  >({});
  // Per-variant input value
  const [variantInputs, setVariantInputs] = useState<Record<string, string>>(
    {}
  );
  // Locally tracked added values for each variant (to display without mutating props)
  const [addedValues, setAddedValues] = useState<Record<string, string[]>>({});

  const [generateClicked, setGenerateClicked] = useState(false);

  const [addImageVariant, setAddImageVariant] = useState(false);

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
            <Select.Value placeholder="Add a variant" />
            <FaAngleDown className="text-gray-500" />
          </Select.Trigger>

          <Select.Portal>
            <Select.Content className="bg-white rounded-md shadow-lg">
              <Select.Viewport className="p-1">
                {variants &&
                  variants.map((variant) => (
                    <Select.Item
                      key={variant}
                      value={variant}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer rounded"
                    >
                      <Select.ItemText>{variant}</Select.ItemText>
                    </Select.Item>
                  ))}
                {!variants.length && (
                  <Select.Item
                    value="c"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer rounded"
                  >
                    <Select.ItemText
                      className="text-gray-600"
                      onClick={() => setIsAddVariantOpen(true)}
                    >
                      No variants. Create one
                    </Select.ItemText>
                  </Select.Item>
                )}
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
                {[...variant.values, ...(addedValues[variant.name] ?? [])].map(
                  (value) => {
                    const isAdded = (addedValues[variant.name] ?? []).some(
                      (v) => v.toLowerCase() === value.toLowerCase()
                    );
                    return (
                      <span
                        key={`${variant.name}-${value}`}
                        className="flex items-center gap-2 border-gray-300 rounded bg-gray-200 p-2"
                      >
                        {value}
                        <button
                          type="button"
                          className={`inline-flex items-center justify-center ${
                            isAdded
                              ? "cursor-pointer text-gray-600 hover:text-red-600"
                              : "cursor-not-allowed text-gray-400"
                          }`}
                          aria-label={`Remove ${value}`}
                          title={
                            isAdded ? "Remove" : "Cannot remove preset value"
                          }
                          onClick={() => {
                            if (!isAdded) return;
                            setAddedValues((prev) => {
                              const current = prev[variant.name] ?? [];
                              const next = current.filter(
                                (v) => v.toLowerCase() !== value.toLowerCase()
                              );
                              return { ...prev, [variant.name]: next };
                            });
                          }}
                          disabled={!isAdded}
                        >
                          <AiOutlineClose />
                        </button>
                      </span>
                    );
                  }
                )}
              </p>
            </div>
            <div className="grid grid-cols-[2fr_1fr_2fr] gap-2">
              <input
                type={
                  (variantInputTypes[variant.name] ??
                    selectedVariant) as React.HTMLInputTypeAttribute
                }
                className="border border-gray-300 rounded p-2 w-full"
                value={variantInputs[variant.name] ?? ""}
                onChange={(e) =>
                  setVariantInputs((prev) => ({
                    ...prev,
                    [variant.name]: e.target.value,
                  }))
                }
              />
              <RegularButton
                label="Add"
                onClick={() => {
                  const raw = variantInputs[variant.name] ?? "";
                  const value = raw.trim();
                  if (!value) return;
                  // Prevent duplicates across existing and newly added values
                  const existing = new Set(
                    [
                      ...variant.values,
                      ...(addedValues[variant.name] ?? []),
                    ].map((v) => v.toLowerCase())
                  );
                  if (existing.has(value.toLowerCase())) {
                    return;
                  }
                  setAddedValues((prev) => {
                    const current = prev[variant.name] ?? [];
                    return { ...prev, [variant.name]: [...current, value] };
                  });
                  // Clear input after add
                  setVariantInputs((prev) => ({ ...prev, [variant.name]: "" }));
                }}
                className="bg-gray-200 p-2 rounded"
              />
              <Select.Root
                value={variantInputTypes[variant.name] ?? selectedVariant}
                onValueChange={(val) =>
                  setVariantInputTypes((prev) => ({
                    ...prev,
                    [variant.name]: val.toLowerCase(),
                  }))
                }
              >
                <Select.Trigger className="flex items-center justify-between gap-2 shadow-sm p-1.5 w-full rounded-sm text-gray-600 border border-gray-300 hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500">
                  <Select.Value
                    placeholder="Select an option"
                    className="text-xs text-black"
                  />
                  <FaAngleDown className="text-gray-500" />
                </Select.Trigger>

                <Select.Portal>
                  <Select.Content className="bg-white rounded-md shadow-lg">
                    <Select.Viewport className="p-1">
                      <Select.Item
                        value="text"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer rounded"
                      >
                        <Select.ItemText>Text</Select.ItemText>
                      </Select.Item>
                      <Select.Item
                        value="color"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer rounded"
                      >
                        <Select.ItemText>Color</Select.ItemText>
                      </Select.Item>
                      <Select.Item
                        value="number"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer rounded"
                      >
                        <Select.ItemText>Number</Select.ItemText>
                      </Select.Item>
                      <Select.Item
                        value="range"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer rounded"
                      >
                        <Select.ItemText>Range</Select.ItemText>
                      </Select.Item>
                    </Select.Viewport>
                    <Select.Arrow />
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </div>
          </div>
        ))}
      </div>
      <RegularButton
        label="Generate Variant"
        className="w-full text-sm mt-3"
        onClick={() => {
          const hasAtLeastOneVariant = savedVariants.length > 0;
          const hasAnyEmpty = savedVariants.some((v) => {
            const preset = v.values?.length ?? 0;
            const added = addedValues[v.name]?.length ?? 0;
            return preset + added === 0;
          });

          if (!hasAtLeastOneVariant) {
            toast.warning("Create a variant");
            setGenerateClicked(false);
            return;
          }
          if (hasAnyEmpty) {
            toast.warning("Add a variant");
            setGenerateClicked(false);
            return;
          }

          setGenerateClicked(true);
          // TODO: proceed with generating combinations
        }}
      />
      {generateClicked && (
        <div className="mt-6 space-y-6">
          {savedVariants.map((variant) => {
            const combinedValues = [
              ...(variant.values ?? []),
              ...(addedValues[variant.name] ?? []),
            ];
            return (
              <div key={`variant-block-${variant.name}`} className="space-y-4">
                <h4 className="text-sm font-semibold text-gray-900">
                  {variant.name}
                </h4>
                {combinedValues.length === 0 && (
                  <p className="text-xs text-gray-500">No subvariants added.</p>
                )}
                {combinedValues.map((sub) => (
                  <div
                    key={`variant-${variant.name}-sub-${sub}`}
                    className="overflow-x-auto shadow rounded-lg"
                  >
                    <table className="min-w-full divide-y divide-gray-300 text-xs md:text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="py-3.5 px-3 text-left font-semibold text-gray-900">
                            {variant.name}: {sub}
                          </th>
                          <th className="py-3.5 px-3 text-left font-semibold text-gray-900">
                            Cost Price
                          </th>
                          <th className="py-3.5 px-3 text-left font-semibold text-gray-900">
                            Selling Price
                          </th>
                          <th className="py-3.5 px-3 text-left font-semibold text-gray-900">
                            Quantity
                          </th>
                          <th className="py-3.5 px-3 text-left font-semibold text-gray-900">
                            Threshold
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white text-gray-500">
                        <tr className="hover:bg-gray-50">
                          <td className={`whitespace-nowrap px-3 py-4 `}>
                            {/* Subvariant label already shown in header; keep cell for layout */}
                            <span className="text-gray-700">Details</span>
                          </td>
                          <td className={`whitespace-nowrap px-3 py-4 `}>
                            <input
                              type="number"
                              className="border border-gray-300 rounded-md p-2 w-24"
                              placeholder="Cost Price"
                            />
                          </td>
                          <td className={`whitespace-nowrap px-3 py-4 `}>
                            <input
                              type="number"
                              className="border border-gray-300 rounded-md p-2 w-24"
                              placeholder="Selling Price"
                            />
                          </td>
                          <td className={`whitespace-nowrap px-3 py-4 `}>
                            <input
                              type="number"
                              className="border border-gray-300 rounded-md p-2 w-24"
                              placeholder="Quantity"
                            />
                          </td>
                          <td className={`whitespace-nowrap px-3 py-4 `}>
                            <input
                              type="number"
                              className="border border-gray-300 rounded-md p-2 w-24"
                              value={10}
                              disabled
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}
      <div className="flex flex-col">
        <div className="flex justify-between items-center mt-3">
          <p>Add image variant</p>{" "}
          <Switch
            onChange={() => {
              if (generateClicked) {
                setAddImageVariant(!addImageVariant);
              } else {
                toast.warning("Generate variant first");
              }
            }}
            disabled={!generateClicked}
            checked={addImageVariant}
          />
        </div>
        {addImageVariant && (
          <div className="mt-3">
            <p className="text-sm text-gray-500">Upload Image</p>
            <div className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100  ">
              <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 32 32"
                  className="w-8 h-8 mb-4 text-primary"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M 16 7 C 13.351563 7 11.050781 8.238281 9.40625 10.0625 C 9.269531 10.046875 9.148438 10 9 10 C 6.800781 10 5 11.800781 5 14 C 3.269531 15.054688 2 16.835938 2 19 C 2 22.300781 4.699219 25 8 25 L 13 25 L 13 23 L 8 23 C 5.78125 23 4 21.21875 4 19 C 4 17.339844 5.007813 15.921875 6.4375 15.3125 L 7.125 15.03125 L 7.03125 14.28125 C 7.011719 14.117188 7 14.023438 7 14 C 7 12.882813 7.882813 12 9 12 C 9.140625 12 9.296875 12.019531 9.46875 12.0625 L 10.09375 12.21875 L 10.46875 11.71875 C 11.75 10.074219 13.75 9 16 9 C 19.277344 9 22.011719 11.253906 22.78125 14.28125 L 22.96875 15.0625 L 23.8125 15.03125 C 24.023438 15.019531 24.070313 15 24 15 C 26.21875 15 28 16.78125 28 19 C 28 21.21875 26.21875 23 24 23 L 19 23 L 19 25 L 24 25 C 27.300781 25 30 22.300781 30 19 C 30 15.84375 27.511719 13.316406 24.40625 13.09375 C 23.183594 9.574219 19.925781 7 16 7 Z M 16 15 L 12 19 L 15 19 L 15 27 L 17 27 L 17 19 L 20 19 Z"></path>
                </svg>
                <p className="mb-2 text-sm text-primary">
                  <span className="font-semibold">Upload Main Image</span>
                </p>
                <p className="text-xs text-primary">PNG, JPG, GIF up to 10MB</p>
              </div>
              <input
                accept="image/*"
                multiple={false}
                tabIndex={-1}
                type="file"
                style={{
                  border: "0px",
                  clip: "rect(0px, 0px, 0px, 0px)",
                  clipPath: "inset(50%)",
                  height: "1px",
                  margin: "0px -1px -1px 0px",
                  overflow: "hidden",
                  padding: "0px",
                  position: "absolute",
                  width: "1px",
                  whiteSpace: "nowrap",
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
