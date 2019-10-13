import {getRadioList} from "../../api/radio.js";
import {setSession, getSession} from "../../common/js/cache.js";

export default {
	name: "radio",
	data() {
		let radioLists = getSession('radioLists') || [];
		return {
			radioList: radioLists,
		}
	},
	activated() {
		!this.radioList.length && this.init();
	},
	methods: {
		async init() {
			try{
				let {data: {groupList}} = await getRadioList();
				this.radioList = groupList;
				setSession('radioLists', groupList);
			} catch(e){

			}
		},
		goto(item) {
			setSession('currentRadio', item);
			this.$router.push({path: this.LINK["radio-detail"], query: {id: item.radioId}});
		}
	}
}