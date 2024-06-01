import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { v4 as uuid } from "uuid";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
interface KeywordsInputProps {
  initialKeywords?: string[];
  onKeywordsChange: (keywords: string[]) => void;
}

const KeywordsInput: React.FC<KeywordsInputProps> = ({
  initialKeywords = [],
  onKeywordsChange,
}) => {
  const [keywords, setKeywords] = useState<string[]>(initialKeywords);
  const [inputValue, setInputValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<
    {
      _id: Id<"category">;
      _creationTime: number;
      name: string;
      usageCount: number;
    }[]
  >([]);

  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const suggestionsRef = useRef<HTMLUListElement>(null);

  const predefinedCategories = useQuery(api.category.listCategories);
  const createCategory = useMutation(api.category.createCategory);

  useEffect(() => {
    if (inputValue.length > 1 && predefinedCategories) {
      const filteredSuggestions = predefinedCategories.filter((category) =>
        category.name.toLowerCase().includes(inputValue.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
    setHighlightedIndex(-1); // Reset highlighted index on input change
  }, [inputValue, predefinedCategories]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlightedIndex((prevIndex) =>
        Math.min(prevIndex + 1, suggestions.length - 1)
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlightedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (highlightedIndex >= 0) {
        addKeyword(suggestions[highlightedIndex].name);
      } else if (inputValue.trim() !== "") {
        addKeyword(inputValue.trim());
      }
    } else if (event.key === "Backspace" && inputValue === "") {
      event.preventDefault();
      const newKeywords = keywords.slice(0, -1);
      setKeywords(newKeywords);
      onKeywordsChange(newKeywords);
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const paste = event.clipboardData.getData("text");
    const keywordsToAdd = paste
      .split(/[\n\t,]+/)
      .map((keyword) => keyword.trim())
      .filter(Boolean);
    if (keywordsToAdd.length) {
      const newKeywords = [...keywords, ...keywordsToAdd];
      setKeywords(newKeywords);
      onKeywordsChange(newKeywords);
      setInputValue("");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (inputValue.trim() !== "" && event.relatedTarget?.tagName !== "BUTTON") {
      addKeyword(inputValue.trim());
    }
  };

  const addKeyword = async (keyword: string) => {
    const newKeywords = [...keywords, keyword];
    setKeywords(newKeywords);
    onKeywordsChange(newKeywords);
    setInputValue("");
    setSuggestions([]);
    await createCategory({ name: keyword });
  };

  const removeKeyword = (indexToRemove: number) => {
    const newKeywords = keywords.filter((_, index) => index !== indexToRemove);
    setKeywords(newKeywords);
    onKeywordsChange(newKeywords);
  };

  const handleSuggestionClick = (suggestion: string) => {
    addKeyword(suggestion);
    setSuggestions([]);
  };

  return (
    <div className="flex w-full flex-wrap items-center rounded-lg border p-2 ">
      <div
        className="flex w-full flex-wrap overflow-y-auto items-center"
        style={{ maxHeight: "300px" }}
      >
        {keywords.map((keyword, index) => (
          <Badge
            key={uuid()}
            role="button"
            onClick={() => removeKeyword(index)}
            className="m-1 flex items-center rounded-full px-2 py-1 text-xs h-full"
          >
            {keyword}
            <X size={14} className="ml-2 cursor-pointer" />
          </Badge>
        ))}
        <Input
          type="text"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          onBlur={handleBlur}
          className="flex-1 min-w-20 text-sm border-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0 py-0"
          placeholder="Type keyword and press Enter..."
        />
      </div>
      {suggestions.length > 0 && (
        <ul
          ref={suggestionsRef}
          className="w-full mt-2 border rounded-lg p-2  shadow-md"
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={suggestion._id}
              onClick={() => handleSuggestionClick(suggestion.name)}
              onKeyUp={(event) => {
                if (event.key === "Enter") {
                  handleSuggestionClick(suggestion.name);
                }
              }}
              className={`cursor-pointer p-1 hover:bg-gray-200 dark:hover:bg-slate-800 rounded ${highlightedIndex === index ? "bg-gray-200 dark:bg-slate-800" : ""}`}
            >
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default KeywordsInput;
