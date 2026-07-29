import type { CalculatorBlockData } from '@/lib/types/block';

interface CalculatorBlockProps {
  block: CalculatorBlockData;
}

export function CalculatorBlock({ block }: CalculatorBlockProps) {
  const { game, configId, title } = block.data;

  return (
    <div className="my-6 rounded-lg border border-jade-green/20 bg-dark-graphite/50 p-4">
      {title && (
        <h3 className="mb-3 text-lg font-semibold text-warm-white">{title}</h3>
      )}
      <div
        data-calculator={game}
        data-config={configId}
        className="min-h-[400px] rounded-md border border-white/5 bg-deep-obsidian/50 p-4"
      >
        <p className="text-sm text-muted-gray">
          Калькулятор билдов {game === 'wwm' ? 'Where Winds Meet' : 'Once Human'}
        </p>
        <p className="mt-1 text-xs text-muted-gray/60">
          Конфигурация: {configId}
        </p>
      </div>
    </div>
  );
}