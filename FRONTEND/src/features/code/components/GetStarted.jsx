import { useState } from 'react'

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


function CodeBlock({ children, language }) {
    return (
        <div className="relative rounded-lg overflow-hidden border border-slate-700/60 bg-slate-900">
            {language && <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-700/60 bg-slate-800/60">
                <span className="text-xs text-slate-500 font-mono tracking-wide">{language}</span>
                <CopyButton text={children} />
            </div>}
            <pre className="px-5 py-4 text-base text-slate-300 font-mono overflow-x-auto leading-relaxed whitespace-pre-wrap break-words">
                {children}
            </pre>
        </div>
    );
}

// ── Section Label ────────────────────────────────────────────
function SectionLabel({ children }) {
    return (
        <div className="flex items-center gap-3 mb-4">
            <span className="text-sm font-semibold tracking-widest uppercase text-slate-500">{children}</span>
            <div className="flex-1 h-px bg-slate-800" />
        </div>
    );
}

const GetStarted = () => {
    return (
        <div className='overflow-auto scrollbar-none w-1/2 mx-auto bg-slate-950 text-slate-200 font-mono'>
            {/* Installation */}
            <section className="mb-9">
                <SectionLabel>Installation</SectionLabel>
                <CodeBlock language="bash">{`npm install compo-ui-lib`}</CodeBlock>
            </section>

            <section className="mb-9">
                <SectionLabel>Requirement</SectionLabel>
                <CodeBlock >
                    <ul>
                        <li> • React 18 or higher</li>
                        <li> • React is a peer dependency and must be installed in your project</li>
                    </ul>
                </CodeBlock>
            </section>

            <section className="mb-9">
                <SectionLabel>Getting Started</SectionLabel>
                <CodeBlock >
                    <ul>
                        <li>Import components directly from the package.</li>
                        <li><br></br>For An Example:<br></br></li><br />
                        <li>• Button</li>
                        <li>• Input</li>
                    </ul>
                </CodeBlock>
            </section>

            <section className="mb-9">
                <SectionLabel>Button Example</SectionLabel>
                <CodeBlock language="jsx">{`import { Button } from "compo-ui-lib"

export default function App() {
    return (
        <Button size="sm"> Click Me </Button>
    )
}`}
                </CodeBlock>
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

                        {["text", "variant", "size", "disabled", "onClick"].map((p, i) => (
                            <r key={p} className={`group transition-colors hover:bg-slate-800/40 border-b border-slate-800/60`}>
                                <td className="px-4 py-3 text-violet-400 font-medium text-sm">{p}</td>
                            </r>))}

                    </table>
                </div>
            </section>


            <section className="mb-9">
                <SectionLabel>Importing Components </SectionLabel>
                <CodeBlock language="jsx">{`import { Button , Input , Checkbox , Toggle  } from "compo-ui-lib"`}
                </CodeBlock>
            </section>
        </div>
    )
}

export default GetStarted