import { useCopyToClipboard } from "@uidotdev/usehooks"
import { Check, Share } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function ShareButton({ id }: { id: string }) {
    const navigate = useNavigate();
    const [copiedText, copyToClipboard] = useCopyToClipboard();
    const [justCopied, setJustCopied] = useState(false);

    const handleCopyToClipboard = useCallback(() => {
        const path = `/#${id}`;
        copyToClipboard(`${window.location.origin}${path}`);
        navigate(path);
    }, [id]);

    useEffect(() => {
        if(copiedText) {
            setJustCopied(true);
            let timeout = setTimeout(() => {
                setJustCopied(false);
            }, 1500);

            return () => clearTimeout(timeout);
        }
    }, [copiedText])

    return <button onClick={handleCopyToClipboard} className="bg-transparent border-none">
        {justCopied ?
            <Check className="w-6 h-6 text-muted-foreground" /> :
            <Share className="w-6 h-6 text-muted-foreground" />}
    </button>
}