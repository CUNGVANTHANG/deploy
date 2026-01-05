
import { Team } from "@/types";
import { StorageService } from "./storage.utils";


const MOCK_TEAMS: Team[] = [
    { id: 'tm1', name: 'Engineering', tenantId: 't1', memberIds: ['u1', 'u2'] },
    { id: 'tm2', name: 'Marketing', tenantId: 't1', memberIds: ['u3'] },
];

const storage = new StorageService<Team>('fushion_teams', MOCK_TEAMS);

export const teamsService = {
    getTeams: async () => {
        return storage.getAll();
    },

    createTeam: async (team: Omit<Team, 'id'>) => {
        const newTeam: Team = {
            ...team,
            id: `tm${Date.now()}`
        };
        return storage.create(newTeam);
    },

    updateTeam: async (id: string, updates: Partial<Team>) => {
        return storage.update(id, updates);
    }
};
