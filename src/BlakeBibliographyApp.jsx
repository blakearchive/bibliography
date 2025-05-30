import React, { useState } from "react";
import { NAV_ITEMS } from "./navData";
import { CONTENT_MAP } from "./contentMap";

function Sidebar({ items, onSelect, filter, isMobile, onClose }) {
  return (
    <div className={`overflow-y-auto h-full p-2 bg-white ${isMobile ? 'absolute top-0 left-0 w-64 z-40 shadow-xl' : ''}`}>
      {isMobile && (
        <div className="p-2 flex justify-end">
          <button onClick={onClose} className="rounded px-2 py-1 border">✕</button>
        </div>
      )}
      {items.map((item) => (
        <SidebarItem key={item.anchor} item={item} onSelect={onSelect} filter={filter} />
      ))}
    </div>
  );
}

function SidebarItem({ item, onSelect, filter, depth = 0 }) {
  const [open, setOpen] = useState(depth < 1);
  const hasChildren = item.children && item.children.length > 0;
  const match = !filter || item.title.toLowerCase().includes(filter.toLowerCase());
  if (!match && !hasChildren) return null;
  return (
    <div className={`ml-${depth * 4} my-1`}>
      <div className="flex items-center cursor-pointer select-none" onClick={() => (hasChildren ? setOpen((v) => !v) : onSelect(item.anchor))}>
        {hasChildren && (
          <span className="mr-1">{open ? "▼" : "▶"}</span>
        )}
        <span>{item.title}</span>
      </div>
      {hasChildren && open && (
        <div className="ml-4">
          {item.children.map((child) => (
            <SidebarItem key={child.anchor} item={child} onSelect={onSelect} filter={filter} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

function SearchBar({ value, onChange }) {
  return (
    <div className="p-2 border-b bg-white sticky top-0 z-10">
      <input
        className="w-full border rounded px-3 py-2"
        placeholder="Search bibliography..."
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
}

function useMobileSidebar() {
  const [open, setOpen] = useState(false);
  React.useEffect(() => {
    const handler = () => setOpen(false);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return [open, setOpen];
}

export default function BlakeBibliographyApp() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useMobileSidebar();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const content = selected ? CONTENT_MAP[selected] : '<div class="prose"><h1>William Blake Bibliography</h1><p>Select a section on the left, or search for a topic.</p></div>';

  return (
    <div className="flex h-screen bg-[#f4f4fa] flex-col md:flex-row">
      {isMobile ? (
        <>
          <div className="w-full p-2 flex items-center justify-between border-b bg-white sticky top-0 z-20">
            <button className="p-2" onClick={() => setSidebarOpen(true)}>☰</button>
            <SearchBar value={search} onChange={setSearch} />
          </div>
          {sidebarOpen && (
            <Sidebar items={NAV_ITEMS} onSelect={anchor => { setSelected(anchor); setSidebarOpen(false); }} filter={search} isMobile={true} onClose={() => setSidebarOpen(false)} />
          )}
        </>
      ) : (
        <div className="w-80 border-r bg-white shadow-md flex flex-col">
          <SearchBar value={search} onChange={setSearch} />
          <Sidebar items={NAV_ITEMS} onSelect={setSelected} filter={search} />
        </div>
      )}
      <div className="flex-1 p-6 overflow-y-auto">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
}
