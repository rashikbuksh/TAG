import React from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import notificationSound from "../assets/audio/mixkit-confirmation-tone-2867.wav";

const NotificationSound = () => {
	return (
		<div className="hidden">
			<AudioPlayer
				autoPlay={true}
				src={notificationSound}
				controls={false}
			/>
		</div>
	);
};

export default NotificationSound;
