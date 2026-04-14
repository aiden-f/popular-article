'use client'
import { useEffect } from "react";

export default function Ad() {
    useEffect(() => {
        try {
            (window as any).adsbygoogle = (window as any).adsbygoogle || [];
            (window as any).adsbygoogle.push({});
        } catch (e) { }
    }, []);

    return (
        <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-2723326980364617"
            data-ad-slot="YOUR_SLOT_ID"
            data-ad-format="auto"
            data-full-width-responsive="true"
        />
    );
}