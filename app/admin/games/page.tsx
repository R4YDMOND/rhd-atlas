import PageHeader from "@/components/common/PageHeader";
import SearchInput from "@/components/common/SearchInput";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

import { games } from "@/lib/mock/games";

import Image from "next/image";
import { Plus, Pencil, Trash2 } from "lucide-react";

export default function GamesPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      <div className="max-w-7xl mx-auto p-10 space-y-8">

        <PageHeader
          title="Игры"
          description="Управление игровыми разделами RHD Atlas"
          action={
            <Button>
              <Plus size={18} className="mr-2" />
              Добавить игру
            </Button>
          }
        />

        <SearchInput />

        <Card>

          <table className="w-full">

            <thead>

              <tr className="border-b border-zinc-800 text-left">

                <th className="pb-4">Обложка</th>
                <th>Название</th>
                <th>Версия</th>
                <th>Статус</th>
                <th className="text-right">Действия</th>

              </tr>

            </thead>

            <tbody>

              {games.map((game) => (

                <tr
                  key={game.id}
                  className="border-b border-zinc-900 hover:bg-zinc-800/30 transition"
                >

                  <td className="py-5">

                    <Image
                      src={game.image}
                      alt={game.title}
                      width={90}
                      height={50}
                      className="rounded-lg object-cover"
                    />

                  </td>

                  <td className="font-medium">

                    {game.title}

                  </td>

                  <td>

                    {game.version}

                  </td>

                  <td>

                    <Badge status={game.status as any} />

                  </td>

                  <td>

                    <div className="flex justify-end gap-2">

                      <Button variant="secondary">
                        <Pencil size={16} />
                      </Button>

                      <Button variant="danger">
                        <Trash2 size={16} />
                      </Button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </Card>

      </div>

    </div>
  );
}