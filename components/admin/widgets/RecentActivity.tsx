export default function RecentActivity() {
    return (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h3 className="text-xl font-semibold text-white mb-6">
                Последние действия
            </h3>

            <div className="space-y-4 text-zinc-300">
                <p>• Создана структура проекта</p>
                <p>• Добавлен Hero-блок</p>
                <p>• Добавлен раздел игр</p>
                <p>• Начата разработка административной панели</p>
            </div>
        </div>
    );
}