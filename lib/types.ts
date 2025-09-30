export type SimpleType = { name: string };

export type Pokemon = {
  id: number;
  name: string;
  sprites: { front_default: string | null };
  types: SimpleType[];
  base_experience: number;
};

export type Team = { id: string; name: string; members: Pokemon[] };

export type TeamsState = {
  teams: Team[];
  activeTeamId: string | null;
};

export interface PokemonDetail {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: { name: string }[];
  base_experience: number;
}

export interface ConfirmModalProps {
  open: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onClose: () => void;
}

export interface Props {
  open: boolean;
  mode: "create" | "rename";
  onClose: () => void;
  teamId?: string;
  initialName?: string;
}
