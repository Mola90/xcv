import React from "react";

export function Select({ value, onValueChange, className = "", children }) {
  const options = React.Children.toArray(children)
    .flatMap((child) => {
      if (!child || typeof child !== "object") return [];
      if (child.type && child.type.displayName === "SelectContent") {
        return React.Children.toArray(child.props.children).map((c) => {
          if (c && c.type && c.type.displayName === "SelectItem") {
            return { value: c.props.value, label: c.props.children };
          }
          return null;
        }).filter(Boolean);
      }
      return [];
    });

  return (
    <select
      value={value}
      onChange={(e) => onValueChange && onValueChange(e.target.value)}
      className={"w-full border rounded-md px-3 py-2 text-sm bg-white " + className}
    >
      {options.map((opt, i) => (
        <option key={i} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  );
}

export function SelectTrigger({ children }) { return <>{children}</>; }
export function SelectValue() { return null; }
export function SelectContent({ children }) { return <>{children}</>; }
export function SelectItem({ value, children }) { return <option value={value}>{children}</option>; }
SelectContent.displayName = "SelectContent";
SelectItem.displayName = "SelectItem";
