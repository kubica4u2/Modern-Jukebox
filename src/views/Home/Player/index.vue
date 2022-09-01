<template>
    <div>
        <div class="background-black">
            <div class="video-wrapper">
                <youtube :video-id="videoId" :player-vars="playerVars" @ended="videoEnded(videoId)" ref="youtube" class="youtube-video"></youtube>
            </div>
        </div>
        <div class="v-container">
            <div class="v-layout">
                <div class="v-flex">

                    <template v-if=" ! currentUser">
                        <v-list class="users-list">
                            <v-subheader>
                                <v-switch
                                        v-model="autoplay"
                                        label="Autoplay"
                                ></v-switch>
                                <v-spacer></v-spacer>
                            </v-subheader>
                        </v-list>
                        <br />
                        <h1>Welcome To ModernJukeBox</h1>
                        <br />
                        <ul>
                            <li><h3>Use any device to send music/videos instantly.</h3></li>
                            <li><h3>Search Youtube for any video.</h3></li>
                            <li><h3>Share music/videos with friends instantly.</h3></li>
                            <li><h3>Create favorite list</h3></li>
                        </ul>
                        <br />
                        <div class="content-modal-btn">
                            <Register />
                        </div>
                    </template>

                    <template v-else-if="playerVideos.length > 0" >
                        <v-list class="users-list">
                            <v-subheader>
                                <v-switch 
                                    v-model="autoplay" 
                                    label="Autoplay"
                                ></v-switch>
                                <v-spacer></v-spacer>
                            </v-subheader>
                            <v-list-tile
                                v-for="(playerVideo, index) in playerVideos" 
                                :key="playerVideo + index" 
                                avatar 
                                class="users-list-item"
                                >
                                <v-list-tile-content>
                                    <v-list-tile-title v-html="playerVideo.title"></v-list-tile-title>
                                </v-list-tile-content>
                                <v-list-tile-action>
                                    <v-icon
                                    @click="addFavoriteVideo( playerVideo )"
                                    >star_border</v-icon>
                                </v-list-tile-action>
                                <v-list-tile-action>
                                    <v-icon
                                    @click="playVideo( playerVideo.videoID )"
                                    >play_circle_outline</v-icon>
                                </v-list-tile-action>
                                <v-list-tile-action>
                                    <v-icon
                                    @click="deleteVideo( playerVideo.videoID )"
                                    >delete</v-icon>
                                </v-list-tile-action>
                            </v-list-tile>
                        </v-list>
                    </template>
                    <template v-else>
                        <v-list class="users-list">
                            <v-subheader>
                                <v-switch 
                                    v-model="autoplay" 
                                    label="Autoplay"
                                ></v-switch>
                                <v-spacer></v-spacer>
                            </v-subheader>
                        </v-list>
                        <br />
                        <h1>Video Queue Is Empty...</h1>
                        <br />
                        <ul>
                            <li><h3>This is where any videos sent to you will be displayed</h3></li>
                            <li><h3>Turn on autoplay and use any device as a jukebox</h3></li>
                        </ul>
                        <br />
                        <div>
                            <v-btn depressed large color="primary" to="/">View Videos</v-btn>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { db } from '@/services/database';
import { setTimeout } from 'timers';
import Register from '../../../components/AuthModal/Register';
export default {
    name: 'player-videos',
    components: {
        Register
    },
    data() {
        return {
            autoplay: false,
            playerVars: {
                playsinline: 1,
                rel: 0,
                autoplay: 0
            }
        }
    },
    mounted() {

        if( this.$store.state.currentUser ) {
            this.$store.dispatch('getPlayerVideos');
        }

    },
    methods: {
        deleteVideo: function( videoID ) {
            let uid = this.$store.state.currentUser.uid;
            db.collection( 'users' ).doc( uid ).collection( 'videos' ).doc( videoID ).delete();
        },
        playVideo: function( videoID ) {
            this.$store.state.currentVideo = videoID;
            setTimeout(() => {
                this.player.playVideo();
            }, 500);

        },
        videoEnded: function( videoID ) {
            let uid = this.$store.state.currentUser.uid;
            db.collection( 'users' ).doc( uid ).collection( 'videos' ).doc( videoID ).delete();
        },
        addFavoriteVideo: function( video ) {

            const { channelTitle, thumbnail, title, videoID } = video;

            let uid = this.$store.state.currentUser.uid;

            db.collection( 'users' ).doc( uid ).collection( 'favorites' ).doc( videoID ).set({
                channelTitle,
                thumbnail,
                title,
                videoID
            });
        }
    },
    watch: {
        autoplay(newValue) {
            if(newValue === false) {
                this.playerVars.autoplay = 0;
            } else {
                this.playerVars.autoplay = 1;
                this.player.playVideo();
            }
        }
    },
    computed: {
        currentUser() {
            return this.$store.state.currentUser;
        },
        playerVideos() {
            return this.$store.getters.filterPlayerVideos;
        },
        videoId() {
            return this.$store.state.currentVideo;
        },
        player() {
            return this.$refs.youtube.player
        }
    }
}
</script>
