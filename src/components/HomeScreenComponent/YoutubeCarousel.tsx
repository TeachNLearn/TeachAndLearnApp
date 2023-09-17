// VideoPlayer.tsx

import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

interface VideoPlayerProps {
  videoId: string;
  width?: number;
  height?: number;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId, width = 200, height = 300 }) => {
  const [playing, setPlaying] = useState(false);

  const togglePlaying = () => {
    setPlaying(!playing);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={togglePlaying}>
      <YoutubePlayer height={height} width={width} play={playing} videoId={videoId} />
      <Text style={{color:'#000' , fontWeight:'700' , fontSize:18}}>How to use teach and Learn</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
     justifyContent:'center' ,
     alignItems:'center' ,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    backgroundColor: '#fff',
    borderRadius: 10,
    
  },
});

export default VideoPlayer;
