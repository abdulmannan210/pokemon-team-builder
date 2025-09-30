"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import Image from "next/image";

import { RootState } from "@/redux/store";
import { deleteTeam, removePokemon, selectTeam } from "@/redux/teamsSlice";

import TeamFormModal from "@/components/TeamFormModal";
import IconTrash from "@/components/icons/IconTrash";
import IconPlus from "@/components/icons/IconPlus";
import ConfirmModal from "@/components/ConfirmModal";
import PokemonDetailModal from "@/components/PokemonDetailModal";

import { Pokemon } from "@/lib/types";

export default function Sidebar() {
  const dispatch = useDispatch();

  const teams = useSelector((state: RootState) => state.teams.teams);
  const activeTeamId = useSelector(
    (state: RootState) => state.teams.activeTeamId
  );

  const [showCreate, setShowCreate] = useState(false);
  const [showRename, setShowRename] = useState<{
    open: boolean;
    id?: string;
    name?: string;
  }>({
    open: false,
  });
  const [showDelete, setShowDelete] = useState<{
    open: boolean;
    id?: string;
    name?: string;
  }>({
    open: false,
  });
  const [detail, setDetail] = useState<{ open: boolean; pokemon?: Pokemon }>({
    open: false,
  });

  const [drawerOpen, setDrawerOpen] = useState(false);

  const activeTeam = teams.find((t) => t.id === activeTeamId) ?? null;

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setDrawerOpen(true)}
        className="lg:hidden fixed top-4 right-4 bg-blue-500 text-white px-3 py-2 rounded-lg shadow cursor-pointer"
      >
        ☰
      </button>

      {/* Overlay */}
      {drawerOpen && (
        <div
          onClick={() => setDrawerOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static z-50 top-0 left-0 h-screen lg:h-[calc(100vh-2rem)] w-80 transform transition-transform ${
          drawerOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } bg-white dark:bg-slate-900 shadow-lg flex flex-col`}
      >
        {/* Header */}
        <div className="p-4 shrink-0 flex items-center justify-between">
          <h2 className="text-xl font-bold">Your Teams</h2>

          <span className="text-xs opacity-90">{teams?.length} teams</span>
        </div>

        {/* New team button */}
        <div className="p-4 border-b shrink-0">
          <button
            onClick={() => {
              setShowCreate(true);
            }}
            className="flex items-center justify-self-end gap-2 px-3 py-2 rounded-xl bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition cursor-pointer"
          >
            <IconPlus /> New Team
          </button>
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Teams list */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 border-b">
            {teams?.map((team) => (
              <div
                key={team.id}
                className={`p-3 rounded-xl border cursor-pointer transition ${
                  activeTeamId === team.id
                    ? "bg-blue-50 border-blue-400"
                    : "bg-slate-50 hover:bg-slate-100"
                }`}
                onClick={() => dispatch(selectTeam({ id: team.id }))}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{team.name}</span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowRename({
                          open: true,
                          id: team.id,
                          name: team.name,
                        });
                      }}
                      className="text-xs text-blue-500 hover:underline cursor-pointer"
                    >
                      Rename
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowDelete({
                          open: true,
                          id: team.id,
                          name: team.name,
                        });
                      }}
                      className="text-red-500 hover:text-red-600 cursor-pointer"
                    >
                      <IconTrash />
                    </button>
                  </div>
                </div>

                <div className="text-xs text-slate-500">
                  {team.members.length} / 6 Pokemon
                </div>

                <div className="flex mt-2 gap-1">
                  {team.members.map((m) => (
                    <Image
                      key={m.id}
                      src={m.sprites.front_default ?? ""}
                      alt={m.name}
                      height={42}
                      width={42}
                      className="rounded-full border"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Selected team section */}
          {activeTeam && (
            <div className="flex-1 overflow-y-auto p-4 bg-slate-50">
              <h3 className="font-semibold text-sm mb-2">
                Selected: {activeTeam.name}
              </h3>

              <ul className="flex flex-wrap gap-2">
                {activeTeam.members.map((m) => (
                  <li
                    key={m.id}
                    className="flex items-center gap-2 px-2 py-1 rounded-md bg-white shadow-sm text-xs cursor-pointer"
                    onClick={() => {
                      setDetail({ open: true, pokemon: m });
                    }}
                  >
                    <Image
                      src={m.sprites.front_default ?? ""}
                      alt={m.name}
                      width={30}
                      height={30}
                    />

                    <span className="text-[14px] capitalize">{m.name}</span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();

                        dispatch(
                          removePokemon({
                            teamId: activeTeam.id,
                            pokemonId: m.id,
                          })
                        );
                        toast.success(`${m.name} removed from team`);
                      }}
                      className="text-red-500 hover:text-red-700 cursor-pointer"
                    >
                      <IconTrash />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </aside>

      <TeamFormModal
        open={showCreate}
        mode="create"
        onClose={() => setShowCreate(false)}
      />

      <TeamFormModal
        open={showRename.open}
        mode="rename"
        teamId={showRename.id}
        initialName={showRename.name}
        onClose={() => setShowRename({ open: false })}
      />

      <ConfirmModal
        open={showDelete.open}
        title="Delete Team"
        message={`Are you sure you want to delete "${showDelete.name}"?`}
        confirmText="Delete"
        cancelText="Cancel"
        onClose={() => setShowDelete({ open: false })}
        onConfirm={() => {
          if (showDelete.id) {
            dispatch(deleteTeam({ id: showDelete.id }));
            toast.success(`Team "${showDelete.name}" deleted`);
          }
        }}
      />

      <PokemonDetailModal
        open={detail.open}
        pokemon={detail.pokemon}
        onClose={() => setDetail({ open: false })}
      />
    </>
  );
}
