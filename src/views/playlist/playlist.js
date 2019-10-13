import {listNav} from "./listNav.js";
import { getDissListByTag } from "../../api/detail.js";
import {getSession, setSession} from "../../common/js/cache.js";
import { createDissName } from "../../common/js/dissFactory.js";
import { mapGetters } from "vuex";

export default {
	name: "playlist",
	data() {
		let showLists = getSession('dissList') || {};
		return {
			listNav: listNav,
			active: 0,
			showLists,
			showList: showLists[listNav[0].id] || [],
		}
	},
	computed: {
		...mapGetters([
			'showPlayer',
		])
	},
	activated() {
		!this.showList.length && this.init(this.active);
	},
	methods: {
		async init(i) {
			try{
				let {data: {list}} = await getDissListByTag({id: listNav[i].id, sortId: listNav[i].sortId, start: 0, end: 50});
				list = list.map(item => createDissName(item))
				this.showLists[listNav[i].id] = list;
				this.showList = list;
				setSession('dissList', this.showLists);
				this.$nextTick(() => {
					this.$refs.content.scrollTo(0, 0, !1);
				})
			}catch(e){

			}
		},
		changeItem(i) {
			if(i === this.active)return;
			this.active = i;
			let list = this.showLists[listNav[i].id] || [];
			list.length? this.showList = list: this.init(i);
		},
		goto(item) {
			this.$router.push({path: this.LINK.detail, query: {id: item.dissid}})
		},
	}
}