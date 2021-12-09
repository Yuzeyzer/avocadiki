<template>
	<div v-if="selectedChat" class="content-head">
		<div>
			<img class="content-head__call" :src="callsIcon" alt="Call" />
			<img class="content-head__video" :src="videocamIcon" alt="Video" />
		</div>
		<div class="content-head__receiver">
			<span></span>
			<h3>{{ currentChat.sendBy }}</h3>
		</div>
		<div>
			<img class="content-head__open" :src="openIcon" alt="Open" />
			<img class="content-head__menu" :src="menuIcon" alt="Menu" />
		</div>
	</div>
</template>

<script>
import callsIcon from "@/assets/calls.svg";
import {useStore} from 'vuex'
import { computed } from '@vue/reactivity';
export default {
	props: ['selectedChat'],
	setup(props) {
		const store = useStore();
		const currentChat = computed(() => {
			return store.getters.getSelectedChat(props.selectedChat.id)
		})
		return {
			videocamIcon: require("@/assets/videocam.svg"),
			openIcon: require("@/assets/open.svg"),
			menuIcon: require("@/assets/menu.svg"),
			callsIcon,
			currentChat
		};
	},
};
</script>

<style lang="scss">
@import "@/assets/scss/index.scss";
.content-head {
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 2px solid #edeff2;
	padding-bottom: vw(30);

	&__receiver {
		display: flex;
		align-items: center;
		h3 {
			@include font(vw(13), 700);
			color: $greyBlue60;
			margin: 0;
		}
		span {
			display: inline-block;
			width: vw(10);
			height: vw(10);
			border-radius: 50%;
			background-color: $bg-green;
			border: 2px solid $bg-white;
			margin-right: vw(10);
		}
	}
	&__call {
		margin-right: vw(32);
		height: vw(18);
		width: vw(18);
	}
	&__video {
		width: vw(18);
		height: vw(12);
	}
	&__open {
		width: vw(12);
		height: vw(12);
		margin-right: vw(32);
	}
	&__menu {
		height: vw(16);
	}
}
</style>