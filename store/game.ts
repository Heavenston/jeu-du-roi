import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  players: [] as string[],
  targets: [] as number[],
  king: null as null|number,

  gotIdea: false,
  autoChoose: false,

  ideaText: "",
});
export type State = ReturnType<typeof state>;

export const getters: GetterTree<State, State> = {
  targetsName: state => state.targets.map(v => state.players[v]),
  remainingPlayers: state => {
    let r = new Set<number>();
    for (let i = 0; i < state.players.length; i++)
      if (!state.targets.some(v => v == i) && i != state.king) r.add(i);
    return [...r.values()];    
  },
  parsedIdeaText: state => {
    return state.ideaText
      .replace(/\$\(([0-9]+)\)/g, (c,n) => state.players[state.targets[n-1]])
      .replace(
        /\$\(([0-9]+)\+\)/g,
        (c,n) => {
          let out = state.targets.map((v,i) => state.players[v]).slice(n-1);
          if (out.length >= 2)
            out.splice(-2, 2, `${out[out.length-2]} et ${out[out.length-1]}`);
          return out.join(", ");
        }
      );
  }
};

export const mutations: MutationTree<State> = {
  ADD_PLAYER: (state, p: string) => state.players.push(p),
  REMOVE_PLAYER: (state, p: number) => state.players.splice(p, 1),
  SET_PLAYERS: (state, p: string[]) => state.players = p,
  
  ADD_TARGET: (state, p: number) => state.targets = [...new Set([...state.targets, p]).values()],
  REMOVE_TARGET: (state, p: number) => state.targets = state.targets.filter(n => n != p),
  CLEAR_TARGETS: state => state.targets = [],

  SET_KING: (state, p: number) => state.king = p,
  RESET_KING: state => state.king = null,

  SET_GOT_IDEA: (state, p: boolean) => state.gotIdea = p,
  SET_AUTO_CHOOSE: (state, p: boolean) => state.autoChoose = p,
  SET_IDEA_TEXT: (state, p: string) => state.ideaText = p,
};

export const actions: ActionTree<State, State> = {
  addRandomTarget({ commit, state, getters }) {
    commit("ADD_TARGET", getters.remainingPlayers[Math.floor(Math.random()*getters.remainingPlayers.length)]);
  },
  addRandomTargets({ commit, state, getters }, n: number) {
    for (let i = 0; i < n; i++) {
      commit("ADD_TARGET", getters.remainingPlayers[Math.floor(Math.random()*getters.remainingPlayers.length)]);
    }
  },
  chooseRandomKing({ commit, state }) {
    commit("SET_KING", Math.floor(Math.random() * state.players.length)); 
  },
  reset({ commit }) {
    commit("RESET_KING");
    commit("SET_GOT_IDEA", false);
    commit("SET_AUTO_CHOOSE", false);
    commit("SET_IDEA_TEXT", "");
  }
}