import ReactMarkdown from 'react-markdown'

interface Props {
  content: string
}

export const Markdown: React.FC<Props> = ({ content }) => {
  return (
    <ReactMarkdown
      components={{
        h1: ({ children }) => (
          <h1 className="text-3xl font-bold mb-4">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-2xl font-bold mb-3">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-xl font-bold mb-2">{children}</h3>
        ),
        p: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
        ul: ({ children }) => (
          <ul className="list-disc list-inside mb-4 ml-4">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-inside mb-4 ml-4">{children}</ol>
        ),
        li: ({ children }) => <li className="mb-1">{children}</li>,
        a: ({ href, children }) => (
          <a
            href={href}
            className="text-blue-600 hover:text-blue-800 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4">
            {children}
          </blockquote>
        ),
        code: ({ children }) => (
          <code className="bg-gray-100 rounded px-1 py-0.5">{children}</code>
        ),
        pre: ({ children }) => (
          <pre className="bg-gray-100 rounded p-4 mb-4 overflow-x-auto">
            {children}
          </pre>
        ),
        table: ({ children }) => (
          <table className="min-w-full divide-y divide-gray-200 my-4">
            {children}
          </table>
        ),
        thead: ({ children }) => (
          <thead className="bg-gray-50">{children}</thead>
        ),
        tbody: ({ children }) => (
          <tbody className="divide-y divide-gray-200">{children}</tbody>
        ),
        tr: ({ children }) => <tr>{children}</tr>,
        th: ({ children }) => (
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="px-6 py-4 whitespace-nowrap">{children}</td>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
