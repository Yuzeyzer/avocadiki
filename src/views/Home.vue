<template>
	<div class="home">
		<div class="content">
			<div class="chats">
				<aside class="chats__sidebar">
					<SearchInChats @searchText="handleInputChange" />
					<PerfectScrollbar v-if="chats.length" class="chats__channels">
						<ChatsItem
							v-for="(chat, i) in chats"
							:key="chat.id"
							:activeChatItem="activeChatItem"
							:index="i"
							@click="setChat(i)"
							:chat="chat"
						/>
					</PerfectScrollbar>
					<PerfectScrollbar v-else class="chats__channels">
						<ChatsItem
							v-for="(user, i) in users"
							:key="user"
							:activeChatItem="activeChatItem"
							:index="i"
							@click="setChat(i)"
							:user="user"
						/>
					</PerfectScrollbar>
				</aside>
				<div v-if="selectedChat" class="chats__messages">
					<ChatsContentHead :selectedChat="selectedChat" />
					<ChatsContent :messages="selectedChat.message" />
					<SendMessage />
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import ChatsItem from "@/components/Chats/Item.vue";
import SearchInChats from "../components/SearchInChat.vue";
import ChatsContentHead from "@/components/Chats/ContentHead.vue";
import { PerfectScrollbar } from "vue3-perfect-scrollbar";
import { useStore } from "vuex";
import ChatsContent from "@/components/Chats/Content.vue";
import SendMessage from "@/components/Chats/SendMessage.vue";
export default defineComponent({
	name: "Home",
	components: {
		ChatsContent,
		ChatsItem,
		PerfectScrollbar,
		SearchInChats,
		ChatsContentHead,
		SendMessage,
	},

	setup() {
		const searchText = ref("");
		const activeChatItem = ref(-1);

		const store = useStore();

		const chats = computed(() =>
			store.getters.getFilteredChats(searchText.value)
		);

		const users = computed(() => store.getters.getUsers(searchText.value));

		setInterval(() => {
			console.log(users.value);
		}, 3000);

		const selectedChat = computed(() => store.state.chats.currentChat);

		const handleInputChange = (event: string) => {
			searchText.value = event;
		};

		const setChat = async (index: number) => {
			activeChatItem.value = index;
			await store.dispatch("setCurrentChat", chats.value[index].chatId);
		};

		// setInterval(() => {
		// 	console.log(chats.value)
		// },3000)

		onMounted(() => {
			store.dispatch("getChats");
			store.dispatch("getUsersFirebase");
		});

		return {
			users,
			chats,
			handleInputChange,
			setChat,
			activeChatItem,
			selectedChat,
		};
	},
});
</script>


<style lang="scss">
@import "~perfect-scrollbar/css/perfect-scrollbar.css";
@import "@/assets/scss/index.scss";
.ps {
	position: relative;
	height: vw(480);
}

.chats {
	display: flex;
	&__messages {
		width: 100%;
		background: #fafbfc;
		padding: vw(30);
		padding-right: vw(30);
	}
	&__sidebar {
		padding: vw(30) 0;
		padding-right: vw(1);
		width: vw(370);
	}
	&__channels {
		max-height: 100vh;
		padding-right: vw(40);
	}
}
</style>