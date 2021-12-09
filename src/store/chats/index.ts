import { Istate, searchChat, Ichat } from './types';
import getCollection from '@/composables/getCollection';
import useDoc from '@/composables/useDoc';
const chats = {
  state: () => ({
    items: [],
    currentChat: null,
  }),
  getters: {
    getFilteredChats: (state: Istate) => (searchChat: searchChat) => {
      return state.items.filter((chat: any) => chat.sendBy.includes(searchChat));
    },
    getSelectedChat: (state: Istate) => (id: string) => {
      return state.items.find((chat: any) => chat.chatId === id);
    },
  },
  mutations: {
    GET_CHATS(state: Istate, chats: Ichat[]) {
      state.items = chats;
    },
    SET_CURRENT_CHAT(state: Istate, currentChat: Ichat) {
      state.currentChat = currentChat;
    },
  },
  actions: {
    async getChats({ commit }: any) {
      const { documents } = await getCollection('chats');
      commit('GET_CHATS', documents);
    },
    async setCurrentChat({ commit }: any, chatId: string) {
      const { getDocument } = useDoc();

      const { document } = await getDocument('messages', chatId);

      commit('SET_CURRENT_CHAT', document);
    },
  },
};

export default chats;
