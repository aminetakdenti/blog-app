import Downshift from "downshift";
import { Input } from "./ui/input";
import { v4 as uuid4 } from "uuid";

const items = [
  { value: "apple" },
  { value: "pear" },
  { value: "orange" },
  { value: "grape" },
  { value: "banana" },
];

type Props = {
  setCategories: React.Dispatch<React.SetStateAction<string[]>>;
};

function DownshiftInput({ setCategories }: Props) {
  return (
    <Downshift
      onChange={(selection, state) => {
        if (selection) {
          setCategories((prev) => [...prev, selection.value]);
          state.clearSelection();
        }
      }}
      itemToString={(item) => (item ? item.value : "")}
    >
      {({
        getInputProps,
        getItemProps,
        getMenuProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem,
        getRootProps,
      }) => (
        <div>
          <div
            className="w-full"
            {...getRootProps({}, { suppressRefError: true })}
          >
            <Input
              type="email"
              placeholder="add category"
              {...getInputProps()}
            />
          </div>
          <ul
            {...getMenuProps()}
            className={`${isOpen ? "divide-y border rounded-lg overflow-hidden" : ""} `}
          >
            {isOpen
              ? items
                  .filter(
                    (item) => !inputValue || item.value.includes(inputValue)
                  )
                  .map((item, index) => (
                    <li
                      key={uuid4()}
                      {...getItemProps({
                        index,
                        item,
                        className: "p-2 cursor-pointer ",
                        style: {
                          backgroundColor:
                            highlightedIndex === index ? "#cbd5e1" : "white",

                          fontWeight:
                            selectedItem === index ? "bold" : "normal",
                        },
                      })}
                    >
                      {item.value}
                    </li>
                  ))
              : null}
          </ul>
        </div>
      )}
    </Downshift>
  );
}

export default DownshiftInput;
