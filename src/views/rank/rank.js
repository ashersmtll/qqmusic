import {getAllRank} from "../../api/rank.js";
import {createRankInfo} from '../../common/js/rankInfo.js';
import {getSession, setSession} from "../../common/js/cache.js";

export default {
	name: 'rank',
	data(){
		let rankData = getSession('rankData') || [];
		return {
			topLists: rankData,
		}
	},
	activated() {
		!this.topLists.length && this.init();
	},
	methods: {
		async init() {
			try{
				let {toplist: {data: {group}}} = await getAllRank();
				let lists = [];
				group.forEach(item => {
					let obj = {
						id: item.groupId,
						name: item.groupName,
						lists: [],
					};
					item.toplist.forEach(rank =>  rank.topId !== 201? obj.lists.push(createRankInfo(rank)): '');
					obj.lists.length && lists.push(obj);
				});
				this.topLists = lists;
				setSession('rankData', lists);
			}catch(e){

			}
		},
		goto(item) {
			this.$router.push({path: this.LINK["rank-detail"], query: {id: item.id, num: item.totalNum, time: item.time}});
		}
	}
};