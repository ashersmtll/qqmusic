import {mapActions, mapGetters} from 'vuex';
import _ from 'lodash/array.js';

export default {
	name: "song-list",
	props: {
		songs: {type: Array, default: () => []},
	},
	computed: {
		...mapGetters(['playlist', 'currentSong', 'isRadio'])
	},
	methods: {
		isAdd(song) {
			return _.findIndex(this.playlist, song) > -1;
		},
		...mapActions(['addSong', 'playSelectSong', 'deleteSong'])
	}
}