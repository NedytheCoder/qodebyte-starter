import { SectionTabInput, SelectDropdown } from "@/app/components/Input";
import { Pagination } from "@/app/components/Pagination";
import { StockTable } from "@/app/components/Table";
import { Pane } from "@/app/components/Tabpane";

export default function Configuration({
  activeConfigure,
  onChangeConfigure,
}: {
  activeConfigure: string;
  onChangeConfigure: (section: string) => void;
}) {
  const configureTabs = [
    { key: "category", label: "Category" },
    { key: "attributes", label: "Attributes" },
    { key: "taxes", label: "Taxes" },
    { key: "discounts", label: "Discounts" },
    { key: "coupons", label: "Coupons" },
  ];
  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8 ">
      {/* Big Bar Chart */}
      <div className="mt-4 md:w-fit">
        <Pane
          tabs={configureTabs}
          setActiveSection={(section: string) => onChangeConfigure(section)}
          activeSection={activeConfigure}
        />
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row justify-between gap-0 md:gap-4">
        <div className="flex items-center gap-2 justify-between w-full">
          <div className="relative flex-1">
            <SectionTabInput
              placeholder={`Search by ${activeConfigure
                .charAt(0)
                .toUpperCase()}${activeConfigure.slice(1)}`}
            />
          </div>
          <div className="hidden md:flex items-center gap-2 text-gray-800 w-48">
            <SelectDropdown
              options={[
                { value: "name-asc", label: "Name (A-Z)" },
                { value: "name-desc", label: "Name (Z-A)" },
                { value: "stock-asc", label: "Stock (Low to High)" },
                { value: "stock-desc", label: "Stock (High to Low)" },
              ]}
              placeholder="Sort by"
              className="w-full"
              onChange={(value) => {
                // Handle sort logic here
                console.log("Sort by:", value);
              }}
            />
          </div>
        </div>
      </div>

      {/* Stock Table */}
      {(() => {
        // Configure table columns and sample rows per tab
        switch (activeConfigure) {
          case "attributes": {
            const columns = [
              { key: "attributeId", label: "Attribute ID" },
              { key: "attribute", label: "Attribute" },
            ] as const;
            const rows = [
              { attributeId: "ATT-1001", attribute: "Color" },
              { attributeId: "ATT-1002", attribute: "Size" },
            ];
            return (
              <StockTable
                columns={columns}
                rows={rows}
                onView={() => {}}
                onReport={() => {}}
              />
            );
          }
          case "taxes": {
            const columns = [
              { key: "taxId", label: "Tax ID" },
              { key: "tax", label: "Tax" },
            ] as const;
            const rows = [
              { taxId: "TAX-2001", tax: "VAT 7.5%" },
              { taxId: "TAX-2002", tax: "GST 5%" },
            ];
            return (
              <StockTable
                columns={columns}
                rows={rows}
                onView={() => {}}
                onReport={() => {}}
              />
            );
          }
          case "discounts": {
            const columns = [
              { key: "discountId", label: "Discount ID" },
              { key: "discount", label: "Discount" },
            ] as const;
            const rows = [
              { discountId: "DISC-3001", discount: "Black Friday 20%" },
              { discountId: "DISC-3002", discount: "Clearance 10%" },
            ];
            return (
              <StockTable
                columns={columns}
                rows={rows}
                onView={() => {}}
                onReport={() => {}}
              />
            );
          }
          case "coupons": {
            const columns = [
              { key: "couponId", label: "Coupon ID" },
              { key: "coupon", label: "Coupon" },
            ] as const;
            const rows = [
              { couponId: "CPN-4001", coupon: "WELCOME10" },
              { couponId: "CPN-4002", coupon: "FREESHIP" },
            ];
            return (
              <StockTable
                columns={columns}
                rows={rows}
                onView={() => {}}
                onReport={() => {}}
              />
            );
          }
          case "category":
          default: {
            const columns = [
              { key: "categoryId", label: "Category ID" },
              { key: "category", label: "Category" },
            ] as const;
            const rows = [
              { categoryId: "CAT-5001", category: "Electronics" },
              { categoryId: "CAT-5002", category: "Apparel" },
            ];
            return (
              <StockTable
                columns={columns}
                rows={rows}
                onView={() => {}}
                onReport={() => {}}
              />
            );
          }
        }
      })()}

      {/* Pagination */}
      <Pagination
        currentPage={1}
        totalPages={2}
        onPageChange={(page) => console.log("Page changed to:", page)}
        label={
          <>
            <p>Time Stock: 0</p>
          </>
        }
      />
    </div>
  );
}
