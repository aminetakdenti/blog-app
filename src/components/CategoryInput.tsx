import { useState } from "react";
import { Input } from "@/components/ui/input";

function CategoryInput() {
  const [inputValue, setInputValue] = useState("");
  //   const [suggestions, setSuggestions] = useState<string[]>([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const allSuggestions = [
    "Apple",
    "Banana",
    "Cherry",
    "Date",
    "Fig",
    "Grape",
    "Kiwi",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value;
    setInputValue(userInput);
    const filtered = allSuggestions.filter((suggestion) =>
      suggestion.toLowerCase().startsWith(userInput.toLowerCase())
    );
    setFilteredSuggestions(filtered);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-64">
      <Input
        value={inputValue}
        onChange={handleChange}
        placeholder="Type to search..."
        className="w-full p-2 border border-gray-300 rounded-md"
      />
      {showSuggestions && inputValue && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md max-h-60 overflow-y-auto">
          {filteredSuggestions.length > 0 ? (
            filteredSuggestions.map((suggestion, index) => (
              // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
              <li
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                key={index}
                className="p-2 cursor-pointer hover:bg-gray-200"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))
          ) : (
            <li className="p-2">No suggestions available</li>
          )}
        </ul>
      )}
    </div>
  );
}

export default CategoryInput;
