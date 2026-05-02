'use client';
import dynamic from 'next/dynamic';

const ExcalidrawWrapper = dynamic(
  async () => {
    const mod = await import('@excalidraw/excalidraw');
    return mod.Excalidraw;
  },
  { ssr: false }
);

export default function DiagramCanvas({ initialData, onChange }) {
  const handleChange = (elements, state) => {
    const { width, height, offsetTop, offsetLeft, ...persistableState } = state;
    onChange({ elements, appState: persistableState });
  };

  return (
    <div className="diagram-shell">
      <ExcalidrawWrapper
        initialData={initialData}
        onChange={handleChange}
        theme="dark"
        gridModeEnabled
        UIOptions={{
          canvasActions: {
            loadScene: false,
            export: false,
            saveAsImage: true,
            toggleTheme: false
          }
        }}
      />
    </div>
  );
}
