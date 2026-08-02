"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Search, Swords } from "lucide-react";

import { wwmWeapons } from "@/data/wwm/weapons";
import {
  getWwmSkillsByWeapon,
  type WwmSkill,
} from "@/data/wwm/skills";

type WeaponSkillSelectProps = {
  onSelect: (skill: WwmSkill) => void;
};

function matches(query: string, ...values: (string | null)[]) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return values.some((value) => value?.toLowerCase().includes(q));
}

export default function WeaponSkillSelect({
  onSelect,
}: WeaponSkillSelectProps) {
  const [weaponId, setWeaponId] = useState<string | null>(null);
  const [weaponOpen, setWeaponOpen] = useState(false);
  const [weaponQuery, setWeaponQuery] = useState("");

  const [skillOpen, setSkillOpen] = useState(false);
  const [skillQuery, setSkillQuery] = useState("");
  const [selectedSkill, setSelectedSkill] = useState<WwmSkill | null>(null);

  const selectedWeapon = useMemo(
    () => wwmWeapons.find((weapon) => weapon.id === weaponId) ?? null,
    [weaponId]
  );

  const filteredWeapons = useMemo(
    () =>
      wwmWeapons.filter((weapon) =>
        matches(weaponQuery, weapon.nameRu, weapon.nameEn, weapon.nameCn)
      ),
    [weaponQuery]
  );

  const skillsForWeapon = useMemo(
    () => (weaponId ? getWwmSkillsByWeapon(weaponId) : []),
    [weaponId]
  );

  const filteredSkills = useMemo(
    () =>
      skillsForWeapon.filter((skill) =>
        matches(skillQuery, skill.nameRu, skill.nameEn, skill.nameCn)
      ),
    [skillsForWeapon, skillQuery]
  );

  function handleWeaponPick(id: string) {
    setWeaponId(id);
    setWeaponQuery("");
    setWeaponOpen(false);
    setSelectedSkill(null);
    setSkillQuery("");
  }

  function handleSkillPick(skill: WwmSkill) {
    setSelectedSkill(skill);
    setSkillQuery("");
    setSkillOpen(false);
    onSelect(skill);
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {/* Оружие */}
      <div className="relative">
        <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-[#777D7C]">
          Оружие
        </label>

        <button
          type="button"
          onClick={() => setWeaponOpen((prev) => !prev)}
          className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-[#101518] px-4 py-3 text-left text-[#F1EEE7] transition hover:border-[#C7A56A]/40"
        >
          <span
            className={selectedWeapon ? "text-[#F1EEE7]" : "text-[#777D7C]"}
          >
            {selectedWeapon ? selectedWeapon.nameRu : "Выберите оружие"}
          </span>
          <ChevronDown className="h-4 w-4 text-[#777D7C]" />
        </button>

        {weaponOpen && (
          <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-white/10 bg-[#0B1012] shadow-xl">
            <div className="relative border-b border-white/10">
              <Search className="absolute left-3 top-3 h-4 w-4 text-[#777D7C]" />
              <input
                autoFocus
                value={weaponQuery}
                onChange={(event) => setWeaponQuery(event.target.value)}
                placeholder="Поиск оружия..."
                className="w-full bg-transparent py-2.5 pl-9 pr-3 text-sm text-[#F1EEE7] outline-none placeholder:text-[#777D7C]"
              />
            </div>

            <div className="max-h-64 overflow-y-auto py-1">
              {filteredWeapons.length === 0 && (
                <p className="px-4 py-3 text-sm text-[#777D7C]">
                  Ничего не найдено
                </p>
              )}

              {filteredWeapons.map((weapon) => (
                <button
                  key={weapon.id}
                  type="button"
                  onClick={() => handleWeaponPick(weapon.id)}
                  className="flex w-full items-center justify-between px-4 py-2.5 text-left text-sm text-[#D1D2CE] transition hover:bg-white/[0.05] hover:text-[#F1EEE7]"
                >
                  <span>
                    {weapon.nameRu}
                    <span className="ml-2 text-xs text-[#777D7C]">
                      {weapon.nameCn}
                    </span>
                  </span>
                  <span className="text-xs text-[#777D7C]">
                    {weapon.skillCount}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Навык */}
      <div className="relative">
        <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-[#777D7C]">
          Навык
        </label>

        <button
          type="button"
          disabled={!weaponId}
          onClick={() => setSkillOpen((prev) => !prev)}
          className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-[#101518] px-4 py-3 text-left text-[#F1EEE7] transition hover:border-[#C7A56A]/40 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <span
            className={selectedSkill ? "text-[#F1EEE7]" : "text-[#777D7C]"}
          >
            {selectedSkill ? selectedSkill.nameRu : "Сначала выберите оружие"}
          </span>
          <ChevronDown className="h-4 w-4 text-[#777D7C]" />
        </button>

        {skillOpen && weaponId && (
          <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-white/10 bg-[#0B1012] shadow-xl">
            <div className="relative border-b border-white/10">
              <Search className="absolute left-3 top-3 h-4 w-4 text-[#777D7C]" />
              <input
                autoFocus
                value={skillQuery}
                onChange={(event) => setSkillQuery(event.target.value)}
                placeholder="Поиск навыка..."
                className="w-full bg-transparent py-2.5 pl-9 pr-3 text-sm text-[#F1EEE7] outline-none placeholder:text-[#777D7C]"
              />
            </div>

            <div className="max-h-64 overflow-y-auto py-1">
              {filteredSkills.length === 0 && (
                <p className="px-4 py-3 text-sm text-[#777D7C]">
                  Ничего не найдено
                </p>
              )}

              {filteredSkills.map((skill) => (
                <button
                  key={skill.id}
                  type="button"
                  onClick={() => handleSkillPick(skill)}
                  className="flex w-full items-center justify-between px-4 py-2.5 text-left text-sm text-[#D1D2CE] transition hover:bg-white/[0.05] hover:text-[#F1EEE7]"
                >
                  <span className="flex items-center gap-2">
                    <Swords className="h-3.5 w-3.5 text-[#C7A56A]/70" />
                    {skill.nameRu}
                    <span className="text-xs text-[#777D7C]">
                      {skill.nameCn}
                    </span>
                  </span>
                  {skill.version && (
                    <span className="text-xs text-[#777D7C]">
                      ур. {skill.version}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
