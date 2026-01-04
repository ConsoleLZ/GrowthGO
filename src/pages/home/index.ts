import { defineComponent, reactive, toRefs } from 'vue';
import { tags } from './constants';

export default defineComponent({
	setup() {
		const state = reactive({
			tagsAll: false,
			selectTags: [] // 选中的标签
		});

		const methods = {
			onSelectAllChange(value: boolean) {
				if(value){
					state.selectTags = Object.keys(tags)
				}else {
					state.selectTags = []
				}
			},
			onSelectChange(value: string[]) {
				if(value.length === Object.keys(tags).length){
					state.tagsAll = true
				}else {
					state.tagsAll = false
				}
			}
		};

		return {
			tags,
			...toRefs(state),
			...methods
		};
	}
});
