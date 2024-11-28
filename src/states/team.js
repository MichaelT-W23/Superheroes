import { createSlice } from '@reduxjs/toolkit';

const initialState = JSON.parse(localStorage.getItem('team')) || [];

const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    addTeamSuperhero: (state, action) => {
      const newSuperhero = { ...action.payload, team: true };
      state.push(newSuperhero);
      localStorage.setItem('team', JSON.stringify(state));
    },
    removeTeamSuperhero: (state, action) => {
      const newState = state.filter(hero => hero.superId !== action.payload.superId);
      localStorage.setItem('team', JSON.stringify(newState));
      return newState;
    },
    clearTeam: () => {
      localStorage.removeItem('team');
      return [];
    },
  },
});

export const getAllSuperheroes = (state) => state.team;

export const isSuperheroInTeam = (state, superId) => state.team.some(hero => hero.superId === superId);

export const getTeamCount = (state) => state.team.length;

export const { addTeamSuperhero, removeTeamSuperhero, clearTeam } = teamSlice.actions;

export default teamSlice.reducer;

