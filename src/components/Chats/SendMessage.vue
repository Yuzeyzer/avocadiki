<template>
	<form @submit.prevent="handleSubmit" class="send-message">
		<div class="send-message__row">
			<div class="send-message__sharing">
				<label class="">
					<input type="file" />
					<img :src="fileIcon" alt="" />
				</label>
				<label class="send-message__share-image">
					<input @change="getImageFile" type="file" />
					<img :src="shareImageIcon" alt="" />
				</label>
				<label class="send-message__type-message">
					<span>Type Message </span>
					<textarea @keypress.enter="handleSubmit" v-model="message"></textarea>
				</label>
			</div>
			<button>
				<img :src="sendMessage" alt="" />
			</button>
		</div>
	</form>
</template>

<script>
import fileIcon from "./file.svg";
import shareImageIcon from "@/assets/share-image.svg";
import sendMessage from "@/assets/send-message.svg";
import { computed, ref } from "@vue/reactivity";
import useDoc from "@/composables/useDoc";
import { useStore } from "vuex";
import { v4 as uuidv4 } from 'uuid';
import { useStorage } from "@/composables/useStorage";
export default {
	components: {},
	setup() {
		const { uploadImageAndGetImageUrl } = useStorage();
		const { addNewMessageToCollection, uploadImageInMessage } = useDoc();
		const store = useStore();
		const message = ref("");

		const getImageFile = async (event) => {
      const uniqId = uuidv4()

			const file = event.target.files[0];
			const uploadedImageUrl = await uploadImageAndGetImageUrl(
				file,
				currentChat.value.id,
				uniqId
			);

			await uploadImageInMessage(
				uploadedImageUrl,
				currentChat.value.id,
				uniqId
			);
		};

		const currentChat = computed(() => store.state.chats.currentChat);

		const handleSubmit = async () => {
			await addNewMessageToCollection(
				message.value,
				"messages",
				currentChat.value.id
			);
			message.value = "";
		};
		return {
			getImageFile,
			fileIcon,
			shareImageIcon,
			sendMessage,
			message,
			handleSubmit,
		};
	},
};
</script>

<style lang="scss">
@import "@/assets/scss/index.scss";
.send-message {
	border-top: 2px solid #edeff2;
	padding-top: vw(30);
	&__row {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	&__sharing {
		display: flex;
		align-items: center;
	}
	&__type-message {
		@include font(12px, 600);
		color: #6b7a99;
		display: flex;
		align-items: center;
		textarea {
			margin-left: 30px;
			resize: none;
			width: vw(900);
			font-family: SF Pro Display;
			font-style: normal;
			font-weight: 600;
			font-size: 12px;
			line-height: 20px;
			color: #6b7a99;
			border: none;
			outline: none;
			background-color: #fff;
			border-radius: 10px;
			padding: 15px;
			box-sizing: border-box;
		}
	}
	&__share-image {
		margin: 0 40px 0 25px;
	}
	label {
		cursor: pointer;
	}
	input[type="file"] {
		display: none;
		cursor: pointer;
	}
}
</style>