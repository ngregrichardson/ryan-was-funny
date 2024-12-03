import { useDebounce } from "@uidotdev/usehooks";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

export default function SearchBar({ onSearch }: { onSearch: (searchKey: string) => void }) {
    const [instantSearchKey, setSearchKey] = useState("");
    const searchKey = useDebounce(instantSearchKey, 100);

    useEffect(() => {
        onSearch(searchKey);
    }, [searchKey]);

    return <div className="bg-muted flex gap-2 rounded-full items-center border focus-within:border-accent focus-within:bg-white flex-row-reverse">
        <input value={instantSearchKey} onChange={e => setSearchKey(e.target.value)} type="text" placeholder="Search" className="peer bg-transparent border-none placeholder:text-muted-foreground h-10 flex-1 rounded-r-full outline-none caret-text text-text pr-3" />
        <Search className="text-muted-foreground ml-3 peer-focus:text-accent w-4 h-4" />
    </div>;
}