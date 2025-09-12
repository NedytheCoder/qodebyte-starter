// "use client";

// import { X } from "lucide-react";
// import { createPortal } from "react-dom";
// import { useEffect, useRef } from "react";

// interface ConfirmDialogProps {
//   isOpen: boolean;
//   title: string;
//   message: string | React.ReactNode;
//   confirmText?: string;
//   cancelText?: string;
//   onConfirm: () => void;
//   onCancel: () => void;
//   variant?: "danger" | "warning" | "info";
//   isLoading?: boolean;
// }

// export function ConfirmDialog({
//   isOpen,
//   title,
//   message,
//   confirmText = "Confirm",
//   cancelText = "Cancel",
//   onConfirm,
//   onCancel,
//   variant = "info",
//   isLoading = false,
// }: ConfirmDialogProps) {
//   const dialogRef = useRef<HTMLDivElement>(null);
//   const previouslyFocusedElement = useRef<HTMLElement | null>(null);

//   // Handle Escape key and outside clicks
//   useEffect(() => {
//     if (!isOpen) return;

//     // Store the currently focused element
//     previouslyFocusedElement.current = document.activeElement as HTMLElement;

//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.key === "Escape") {
//         onCancel();
//       }
//     };

//     const handleClickOutside = (e: MouseEvent) => {
//       if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
//         onCancel();
//       }
//     };

//     document.addEventListener("keydown", handleKeyDown);
//     document.addEventListener("mousedown", handleClickOutside);

//     // Focus the first focusable element in the dialog
//     const focusableElements = dialogRef.current?.querySelectorAll(
//       'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
//     );
//     const firstFocusable = focusableElements?.[0] as HTMLElement;
//     firstFocusable?.focus();

//     return () => {
//       document.removeEventListener("keydown", handleKeyDown);
//       document.removeEventListener("mousedown", handleClickOutside);
//       // Restore focus to the previously focused element
//       previouslyFocusedElement.current?.focus();
//     };
//   }, [isOpen, onCancel]);

//   if (!isOpen) return null;

//   // Variant styles
//   const variantStyles = {
//     danger: "bg-red-600 hover:bg-red-700 focus:ring-red-500",
//     warning: "bg-amber-500 hover:bg-amber-600 focus:ring-amber-500",
//     info: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
//   };

//   return createPortal(
//     <div className="fixed inset-0 z-50 overflow-y-auto bg-red-700">
//       <div className="flex min-h-screen items-center justify-center p-4 pt-4 pb-20 text-center sm:block sm:p-0">
//         {/* Overlay */}
//         <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />

//         {/* Center the dialog */}
//         <span
//           className="hidden sm:inline-block sm:h-screen sm:align-middle"
//           aria-hidden="true"
//         >
//           &#8203;
//         </span>

//         {/* Dialog */}
//         <div
//           ref={dialogRef}
//           className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle dark:bg-gray-800"
//           role="dialog"
//           aria-modal="true"
//           aria-labelledby="modal-headline"
//         >
//           <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//             <div className="sm:flex sm:items-start">
//               <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
//                 <X className="h-6 w-6 text-red-600" />
//               </div>
//               <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
//                 <h3
//                   className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
//                   id="modal-headline"
//                 >
//                   {title}
//                 </h3>
//                 <div className="mt-2">
//                   <p className="text-sm text-gray-500 dark:text-gray-300">
//                     {message}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 dark:bg-gray-700">
//             <button
//               type="button"
//               className={`inline-flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm ${
//                 variantStyles[variant]
//               } ${isLoading ? "opacity-70" : ""}`}
//               onClick={onConfirm}
//               disabled={isLoading}
//             >
//               {isLoading ? "Processing..." : confirmText}
//             </button>
//             <button
//               type="button"
//               className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm dark:bg-gray-600 dark:text-white dark:border-gray-500 dark:hover:bg-gray-500"
//               onClick={onCancel}
//               disabled={isLoading}
//             >
//               {cancelText}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>,
//     document.body
//   );
// }

//!! YOU CAN JUST USE RADIX FOR THAT
