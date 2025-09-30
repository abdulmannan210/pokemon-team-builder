import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Pokemon, Team, TeamsState } from "@/lib/types";

const initialState: TeamsState = {
  teams: [],
  activeTeamId: null,
};

export const teamsSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {
    createTeam: (
      state,
      action: PayloadAction<{ id: string; name: string }>
    ) => {
      const team: Team = {
        id: action.payload.id,
        name: action.payload.name,
        members: [],
      };
      state.teams.push(team);
      state.activeTeamId = team.id;
    },

    renameTeam: (
      state,
      action: PayloadAction<{ id: string; newName: string }>
    ) => {
      const team = state.teams.find((x) => x.id === action.payload.id);

      if (team) team.name = action.payload.newName;
    },

    deleteTeam: (state, action: PayloadAction<{ id: string }>) => {
      state.teams = state.teams.filter((x) => x.id !== action.payload.id);

      if (state.activeTeamId === action.payload.id)
        state.activeTeamId = state.teams.length ? state.teams[0].id : null;
    },

    selectTeam: (state, action: PayloadAction<{ id: string }>) => {
      state.activeTeamId = action.payload.id;
    },

    addPokemon: (
      state,
      action: PayloadAction<{ teamId: string; pokemon: Pokemon }>
    ) => {
      const team = state.teams.find((t) => t.id === action.payload.teamId);

      if (!team) return;

      if (team.members.find((m) => m.id === action.payload.pokemon.id)) return;

      if (team.members.length >= 6) return;

      team.members.push(action.payload.pokemon);
    },

    removePokemon: (
      state,
      action: PayloadAction<{ teamId: string; pokemonId: number }>
    ) => {
      const team = state.teams.find((t) => t.id === action.payload.teamId);

      if (!team) return;

      team.members = team.members.filter(
        (m) => m.id !== action.payload.pokemonId
      );
    },
  },
});

export const {
  createTeam,
  renameTeam,
  deleteTeam,
  selectTeam,
  addPokemon,
  removePokemon,
} = teamsSlice.actions;

export default teamsSlice.reducer;
