import React, { useCallback, useEffect, useRef, useState } from "react"
import { LivePreview, LiveProvider, LiveError } from "react-live"

const findComponentName = (cleaned) => {
  // First, look for named exports: export const/function/class Component
  // We want to find a name that is capitalized, preferably PascalCase (not ALL_CAPS)
  const exportMatches = [...cleaned.matchAll(/\bexport\s+(?:const|let|var|function|class)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g)]
  if (exportMatches.length > 0) {
    const capitalized = exportMatches.find(m => /^[A-Z]/.test(m[1]))
    if (capitalized) {
      const pascalCase = exportMatches.find(m => /^[A-Z][a-z]/.test(m[1]))
      return pascalCase ? pascalCase[1] : capitalized[1]
    }
  }

  // Next, look for any declared function or class that starts with an uppercase letter
  const functionOrClassMatches = [...cleaned.matchAll(/\b(?:function|class)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g)]
  if (functionOrClassMatches.length > 0) {
    const capitalized = functionOrClassMatches.find(m => /^[A-Z]/.test(m[1]))
    if (capitalized) return capitalized[1]
  }

  // Next, look for any declared variables with const/let/var that start with an uppercase letter
  const varMatches = [...cleaned.matchAll(/\b(?:const|let|var)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g)]
  if (varMatches.length > 0) {
    const capitalized = varMatches.filter(m => /^[A-Z]/.test(m[1]))
    if (capitalized.length > 0) {
      const pascalCase = capitalized.find(m => /^[A-Z][a-z]/.test(m[1]))
      if (pascalCase) return pascalCase[1]
      return capitalized[0][1]
    }
  }

  return null
}

const processCode = (rawCode) => {
  if (!rawCode) return { code: "", noInline: false }

  // 1. Strip import statements
  let cleaned = rawCode
    .replace(/import\s+[\s\S]*?from\s+['"].*?['"];?/g, "")
    .replace(/import\s+['"].*?['"];?/g, "")
    .trim()

  let noInline = false

  // Check if there is an explicit render call in the code
  if (cleaned.includes("render(")) {
    noInline = true
  } else {
    // 2. Handle export default function/class Name
    const inlineMatch = cleaned.match(/export\s+default\s+(function|class)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/)
    if (inlineMatch) {
      const type = inlineMatch[1]
      const componentName = inlineMatch[2]
      cleaned = cleaned.replace(/export\s+default\s+(function|class)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/, `${type} ${componentName}`)
      cleaned += `\nrender(<${componentName} />);`
      noInline = true
    } else {
      // 3. Handle export default Name (where Name is already declared)
      const namedMatch = cleaned.match(/export\s+default\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/)
      if (namedMatch) {
        const componentName = namedMatch[1]
        cleaned = cleaned.replace(/export\s+default\s+[a-zA-Z_$][a-zA-Z0-9_$]*;?/g, "")
        cleaned += `\nrender(<${componentName} />);`
        noInline = true
      } else if (cleaned.includes("export default")) {
        // 4. Handle anonymous export default
        cleaned = cleaned.replace(/export\s+default\s+/, "const __PreviewComponent = ")
        cleaned += `\nrender(<__PreviewComponent />);`
        noInline = true
      } else {
        // No export default and no explicit render call.
        // Let's find a component name from the defined/exported symbols.
        const componentName = findComponentName(cleaned)
        if (componentName) {
          cleaned += `\nrender(<${componentName} />);`
          noInline = true
        }
      }
    }
  }

  // 5. Strip any remaining named exports (e.g. export const Foo = ...)
  cleaned = cleaned.replace(/\bexport\s+/g, "")

  return { code: cleaned, noInline }
}


const Preview = ({ code }) => {
  const { code: processed, noInline } = processCode(code)

  return (<LiveProvider
    code={processed}
    scope={{ React, useState, useEffect, useRef, useCallback }}
    noInline={noInline}>
    <div className="bg-black flex justify-center items-center p-4 rounded-lg border border-cyan-950/90 h-full">
      <LivePreview />
      <LiveError className="text-red-500 mt-2 text-sm bg-red-50/50 p-2 rounded font-mono" />
    </div>
  </LiveProvider>
  )
}

export default Preview