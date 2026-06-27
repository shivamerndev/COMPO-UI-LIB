import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Preview from "../pages/Preview";


// ── Copy Button ──────────────────────────────────────────────
function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };
  return (
    <button
      onClick={copy}
      className="text-xs px-2.5 py-1 rounded bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white transition-colors"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

// ── Code Block ───────────────────────────────────────────────
function CodeBlock({ children, language }) {
  return (
    <div className="relative rounded-lg overflow-hidden border border-slate-700/60 bg-slate-900">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-700/60 bg-slate-800/60">
        <span className="text-xs text-slate-500 font-mono tracking-wide">{language}</span>
        <CopyButton text={children} />
      </div>
      <pre className="px-5 py-4 text-sm text-slate-300 font-mono overflow-x-auto leading-relaxed whitespace-pre-wrap wrap-break-word">
        {children}
      </pre>
    </div>
  );
}

// ── Section Label ────────────────────────────────────────────
function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="text-xs font-semibold tracking-widest uppercase text-slate-500">{children}</span>
      <div className="flex-1 h-px bg-slate-800" />
    </div>
  );
}

// ── Main ─────────────────────────────────────────────────────
export default function ComponentGuide({ handleGetCompoById, compId }) {

  const component = useSelector(state => state.component.currentComponent)

  useEffect(() => {
    if (compId) {
      handleGetCompoById(compId)
    }
  }, [compId])


  return (component &&
    <div className="overflow-auto scrollbar-none w-1/2 mx-auto bg-slate-950 text-slate-200 font-mono">

      <h1 className="text-3xl font-semibold tracking-tight text-white mb-2">
        {component.name}
      </h1>

      {/* Import */}
      <section className="mb-9">
        <SectionLabel>Import</SectionLabel>
        <CodeBlock language="javascript">{`import { ${component.name} } from "${component.npmPackage}"`}</CodeBlock>
      </section>

      {/* Usage */}
      <section className="mb-9">
        <SectionLabel>Usage</SectionLabel>
        <CodeBlock language="jsx">{`import { ${component.name} } from "${component.npmPackage}"

export default function App() {
  return (
    <${component.name} ${component.props[0]}={value}  ${component.props[1]}={value}  ${component.props[2]}={value} ${component.props[3]}={value} />
  )
}`}</CodeBlock>
      </section>


      {/* Source Code */}
      <section className="mb-12 ">
        <SectionLabel>Preview</SectionLabel>
        <div className="max-h-96 overflow-y-auto rounded-lg scrollbar-none">
          <Preview code={component.code} />
        </div>
      </section>

      {/* Props */}
      <section className="mb-9">

        <div className="rounded-lg border border-slate-800 bg-slate-900 overflow-hidden">
          <table className="w-full text-sm border-collapse">

            <tr className="bg-slate-800/50">
              <th className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-slate-500 font-medium border-b border-slate-800">
                Props
              </th>
            </tr>

            {component.props.map((p, i) => (
              <r key={p} className={`group transition-colors hover:bg-slate-800/40 ${i < component.props.length - 1 ? "border-b border-slate-800/60" : ""}`}>
                <td className="px-4 py-3 text-violet-400 font-medium text-xs">{p}</td>
              </r>))}

          </table>
        </div>
      </section>

      {/* Source Code */}
      <section className="mb-12 ">
        <SectionLabel>Source code</SectionLabel>
        <div className="max-h-96 overflow-y-auto rounded-lg scrollbar-none">
          <CodeBlock language="jsx">{component.code}</CodeBlock>
        </div>
      </section>

    </div>

  );
}