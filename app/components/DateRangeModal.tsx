import { useEffect, useState } from "react";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { format, addMonths, subMonths, isSameMonth, isSameDay } from "date-fns";

interface DateRangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  onApply: () => void;
}

const weekdays = ["S", "M", "T", "W", "T", "F", "S"];

const generateCalendarDays = (date: Date) => {
  const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  const startDay = startOfMonth.getDay();
  const daysInMonth = endOfMonth.getDate();

  const days = [];

  // Add empty cells for days before the 1st of the month
  for (let i = 0; i < startDay; i++) {
    days.push(null);
  }

  // Add days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(date.getFullYear(), date.getMonth(), i));
  }

  return days;
};

export function DateRangeModal({
  isOpen,
  onClose,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onApply,
}: DateRangeModalProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [tempStartDate, setTempStartDate] = useState<Date | null>(null);
  const [tempEndDate, setTempEndDate] = useState<Date | null>(null);

  const days = generateCalendarDays(currentMonth);
  const monthName = format(currentMonth, "MMMM yyyy");

  const handleDateClick = (date: Date) => {
    if (!tempStartDate || (tempStartDate && tempEndDate)) {
      // If no start date is selected or both are selected, start a new range
      setTempStartDate(date);
      setTempEndDate(null);
    } else if (date < tempStartDate) {
      // If selected date is before start date, make it the new start date
      setTempStartDate(date);
    } else {
      // Otherwise set as end date
      setTempEndDate(date);
    }
  };

  const isInRange = (date: Date) => {
    if (!tempStartDate) return false;
    if (!tempEndDate) return isSameDay(date, tempStartDate);
    return date > tempStartDate && date < tempEndDate;
  };

  const isStartDate = (date: Date) => {
    return tempStartDate ? isSameDay(date, tempStartDate) : false;
  };

  const isEndDate = (date: Date) => {
    return tempEndDate ? isSameDay(date, tempEndDate) : false;
  };
  // Initialize temp dates when modal opens
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTempStartDate(startDate ? new Date(startDate) : null);
      setTempEndDate(endDate ? new Date(endDate) : null);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, startDate, endDate]);

  if (!isOpen) return null;

  const handleApply = () => {
    if (tempStartDate && tempEndDate) {
      onStartDateChange(tempStartDate.toISOString().split("T")[0]);
      onEndDateChange(tempEndDate.toISOString().split("T")[0]);
      onApply();
    } else if (tempStartDate) {
      // If only one date is selected, use it for both start and end
      const dateStr = tempStartDate.toISOString().split("T")[0];
      onStartDateChange(dateStr);
      onEndDateChange(dateStr);
      onApply();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-center items-center">
      {/* Backdrop */}
      <div
        className="absolute top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.5)] transition-opacity flex justify-center items-center"
        onClick={onClose}
      />

      {/* Sliding panel */}
      <div className="fixed w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ease-in-out flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900">
            Select Date Range
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <FiX className="h-6 w-6" />
          </button>
        </div>

        {/* Calendar */}
        <div className="flex-1 p-6 overflow-y-auto flex flex-col items-center">
          {/* Month Navigation */}
          <div className="w-full max-w-xs flex justify-between items-center mb-6">
            <button
              onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
              className="p-2 rounded-full hover:bg-gray-100"
              aria-label="Previous month"
            >
              <FiChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            <span className="text-lg font-medium text-gray-900">
              {monthName}
            </span>
            <button
              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              className="p-2 rounded-full hover:bg-gray-100"
              aria-label="Next month"
            >
              <FiChevronRight className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          {/* Weekday Headers */}
          <div className="w-full max-w-xs grid grid-cols-7 gap-1 mb-2">
            {weekdays.map((day, index) => (
              <div
                key={index}
                className="w-10 h-10 flex items-center justify-center text-sm font-medium text-gray-500"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="w-full max-w-xs grid grid-cols-7 gap-1">
            {days.map((date, index) => {
              if (!date) {
                return <div key={`empty-${index}`} className="w-10 h-10" />;
              }

              const isSelected = isStartDate(date) || isEndDate(date);
              const isRange = isInRange(date);
              const isCurrentMonth = isSameMonth(date, currentMonth);

              return (
                <button
                  key={date.toString()}
                  onClick={() => handleDateClick(date)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors
                    ${isSelected ? "bg-indigo-600 text-white" : ""}
                    ${isRange ? "bg-indigo-100" : ""}
                    ${!isSelected && !isRange ? "hover:bg-gray-100" : ""}
                    ${!isCurrentMonth ? "text-gray-400" : "text-gray-900"}
                    ${isCurrentMonth ? "font-medium" : "font-normal"}
                  `}
                  disabled={!isCurrentMonth}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>

          {/* Selected date range display */}
          <div className="mt-8 w-full max-w-xs p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="text-xs font-medium text-gray-500">From</div>
                <div
                  className={`font-medium ${
                    tempStartDate ? "text-gray-900" : "text-gray-400"
                  }`}
                >
                  {tempStartDate
                    ? format(tempStartDate, "MMM d, yyyy")
                    : "Select date"}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-xs font-medium text-gray-500">To</div>
                <div
                  className={`font-medium ${
                    tempEndDate ? "text-gray-900" : "text-gray-400"
                  }`}
                >
                  {tempEndDate
                    ? format(tempEndDate, "MMM d, yyyy")
                    : "Select date"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleApply}
            disabled={!tempStartDate}
            className={`px-4 py-2 text-sm font-medium text-white rounded-md ${
              tempStartDate
                ? "bg-indigo-600 hover:bg-indigo-700"
                : "bg-indigo-300 cursor-not-allowed"
            }`}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
