"use client";

import { useState } from "react";
import { DangerButton, SecondaryButton, RegularButton } from "../Button";
import Toast, { showToast, toastTypes } from "../Toast";
// import { ConfirmDialog } from "../ConfirmDialog";
import { Textarea, SelectDropdown, Input, Searchbar } from "../Input";
import { Table } from "../Table";
import {
  Search,
  User,
  Settings,
  Bell,
  Home,
  Plus,
  ChevronDown,
} from "lucide-react";
import Spinner from "../Spinner";

export function HomeContent() {
  const [showDialog, setShowDialog] = useState(false);
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
        <Home className="w-5 h-5 text-blue-600" />
        <span>Home</span>
      </div>

      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
        <User className="w-5 h-5 text-green-600" />
        <span>Profile</span>
      </div>

      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
        <Settings className="w-5 h-5 text-purple-600" />
        <span>Settings</span>
      </div>

      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
        <Bell className="w-5 h-5 text-yellow-600" />
        <span>Notifications</span>
        <ChevronDown className="w-4 h-4 ml-auto text-gray-400" />
      </div>

      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-transparent outline-none"
        />
      </div>

      {/* Toast Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold col-span-full mb-4">
          Toast Notifications
        </h2>

        <RegularButton
          onClick={() =>
            showToast("This is a success message!", toastTypes.success)
          }
          className="bg-green-600 hover:bg-green-700 text-white"
          label="Show Success Toast"
        />

        <DangerButton
          onClick={() =>
            showToast("This is an error message!", toastTypes.error)
          }
          className="w-full"
          label="Show Error Toast"
        />

        <SecondaryButton
          onClick={() => showToast("Here's some information", toastTypes.info)}
          className="w-full bg-blue-100 text-blue-700 hover:bg-blue-200"
          label="Show Info Toast"
        />

        <button
          onClick={() =>
            showToast("Warning: Proceed with caution!", toastTypes.warning)
          }
          className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-md hover:bg-yellow-200 transition-colors"
        >
          Show Warning Toast
        </button>
      </div>

      <div className="flex gap-2">
        <RegularButton label="Submit" icon={<Plus className="w-4 h-4" />} />
        <DangerButton label="Delete" />
        <SecondaryButton label="Cancel" />
      </div>
      <Textarea label="Textarea" name="textarea" />
      <SelectDropdown
        label="Select"
        name="select"
        options={[
          { value: "option1", label: "Option 1" },
          { value: "option2", label: "Option 2" },
          { value: "option3", label: "Option 3" },
        ]}
        onChange={(value) => console.log(value)}
      />
      <Input label="Input" name="input" type="date" />
      <Table
        data={[{ name: "John Doe", age: 30 }]}
        columns={[
          { header: "Name", accessor: "name" },
          { header: "Age", accessor: "age" },
        ]}
      />
      <Searchbar label="Search" name="search" />
      <div className="mt-6 p-4 border rounded-lg">
        <h3 className="font-medium mb-4">Confirm Dialog Example</h3>
        <RegularButton
          label="Show Confirm Dialog"
          onClick={() => setShowDialog(true)}
        />
        {/* <ConfirmDialog
          isOpen={showDialog}
          title="Confirm Action"
          message="Are you sure you want to proceed? This action cannot be undone."
          onConfirm={() => {
            alert('Action confirmed!');
            setShowDialog(false);
          }}
          onCancel={() => {
            console.log('Action cancelled');
            setShowDialog(false);
          }}
        /> */}
      </div>
      <Toast />
      <Spinner className="w-10 h-10 text-red-800" />
    </div>
  );
}
