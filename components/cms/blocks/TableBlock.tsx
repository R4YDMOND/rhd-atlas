import type { TableBlockData } from '@/lib/types/block';

interface TableBlockProps {
  block: TableBlockData;
}

export function TableBlock({ block }: TableBlockProps) {
  const { headers, rows, caption } = block.data;

  return (
    <div className="mb-6 overflow-x-auto">
      <table className="w-full border-collapse border border-white/10">
        {caption && (
          <caption className="mb-2 text-sm text-muted-gray">{caption}</caption>
        )}
        <thead>
          <tr className="bg-white/5">
            {headers.map((header, idx) => (
              <th
                key={idx}
                className="border border-white/10 px-4 py-2 text-left text-warm-white font-semibold"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr key={rowIdx} className="hover:bg-white/5">
              {row.map((cell, cellIdx) => (
                <td
                  key={cellIdx}
                  className="border border-white/10 px-4 py-2 text-warm-white/80"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}