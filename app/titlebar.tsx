'use client';
import { useEffect } from "react";
export default function TitleBar() {
    useEffect(() => {
        if (window.electronAPI) {
            window.electronAPI.enableWindowDragging();
        }
    }, []);
    return (
        <header
            style={{
                height: '30px',
                width: '100%',
                color: '#000',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0 15px',
            }}
            id="titlebar"
        >
            <button style={{ background: 'transparent', color: '#000' }}>Home</button>
        </header>
    );
}