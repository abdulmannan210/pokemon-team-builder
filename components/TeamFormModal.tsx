"use client";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import { createTeam, renameTeam } from "@/redux/teamsSlice";

import Modal from "@/components/Modal";

import { Props } from "@/lib/types";

export default function TeamFormModal({
  open,
  mode,
  onClose,
  teamId,
  initialName = "",
}: Props) {
  const dispatch = useDispatch();
  const [input, setInput] = useState(initialName);

  useEffect(() => {
    if (open) {
      setInput(initialName);
    }
  }, [open, initialName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const name = input.trim();

    if (!name) {
      toast.error("Name cannot be empty");
      return;
    }

    if (mode === "create") {
      dispatch(createTeam({ id: crypto.randomUUID(), name }));

      toast.success(`Team ${name} created!`);
    } else if (mode === "rename" && teamId) {
      dispatch(renameTeam({ id: teamId, newName: name }));

      toast.success("Team renamed successfully");
    }
    onClose();
  };

  return (
    <Modal
      open={open}
      title={mode === "create" ? "Create Team" : "Rename Team"}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 rounded-lg border px-2 py-1"
          placeholder={mode === "create" ? "Team name..." : "New team name..."}
        />

        <button
          type="submit"
          className="px-3 py-1 rounded-lg bg-blue-500 text-white cursor-pointer"
        >
          Save
        </button>
      </form>
    </Modal>
  );
}
