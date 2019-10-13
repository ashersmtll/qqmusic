// 加载状态
export const loading = state => state.loading;

export const playing = state => state.playing;

export const showPlayer = state => !!state.playlist.length;

export const fullScreen = state => state.fullScreen;

export const playlist = state => state.playlist;

export const sequenceList = state => state.sequenceList;

export const currentSong = state => {
	return state.playlist[state.currentIndex] || {};
};

export const currentIndex = state => state.currentIndex;

export const mode = state => state.mode;

export const isRadio = state => state.isRadio;

export const radioPlaying = stete => stete.radioPlaying;

export const getSendNum = state => state.sendNum;