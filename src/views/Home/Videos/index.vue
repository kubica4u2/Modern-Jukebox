<template>
    <div>
        <template v-if="currentUser">
            <v-toolbar color="#424242">
                <div class="header-search">
                    <v-text-field box label="Search" append-icon="search" color="orange" background-color="#191919"
                        v-model="searchResult" @keydown.enter="getYoutubeVideos(searchResult)"></v-text-field>
                </div>
            </v-toolbar>
        </template>
        <div class="v-container">
            <div class="v-layout v-column">
                <div class="v-flex">
                    <template>
                        <div class="text-xs-center video-tabs">
                            <span>
                                <v-btn fab color="teal" @click="getFeatureVideo('music')">
                                    <v-icon>music_video</v-icon>
                                </v-btn>
                                <div>Music</div>
                            </span>
                            <span>
                                <v-btn fab color="indigo" @click="getFeatureVideo('trailers')">
                                    <v-icon>theaters</v-icon>
                                </v-btn>
                                <div>Trailers</div>
                            </span>
                            <span>
                                <v-btn fab color="red" @click="getFeatureVideo('gaming')">
                                    <v-icon>games</v-icon>
                                </v-btn>
                                <div>Gaming</div>
                            </span>
        
                            <span>
                                <v-btn fab color="green" @click="getFeatureVideo('sports')">
                                    <v-icon>local_activity</v-icon>
                                </v-btn>
                                <div>Sports</div>
                            </span>

                            <span>
                                <v-btn fab color="purple" @click="getFeatureVideo('comedy')">
                                    <v-icon>face</v-icon>
                                </v-btn>
                                <div>Comedy</div>
                            </span>

                            <template v-if="currentUser">
                                <span>
                                    <v-btn fab color="orange" @click="getFavoriteVideo('favorites')">
                                        <v-icon>star</v-icon>
                                    </v-btn>
                                    <div>Favorites</div>
                                </span>
                            </template>
                        </div>
                    </template>
                    <Videos />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Videos from './Videos';
    import {
        mapActions
    } from 'vuex';

    export default {
        name: 'video-index',
        data() {
            return {
                searchResult: ''
            }
        },
        computed: {
            currentUser() {
                return this.$store.state.currentUser;
            }
        },
        components: {
            Videos
        },
        mounted() {
            this.$store.dispatch('getFeatureVideo', 'music');
        },
        methods: {
            ...mapActions({
                getFeatureVideo: 'getFeatureVideo',
                getYoutubeVideos: 'getYoutubeVideos',
                getFavoriteVideo: 'getFavoriteVideo'
            }),
        }
    }
</script>

<style>
    .video-tabs {
        padding: 10px 0;
        display: flex;
        justify-content: flex-start;
        overflow-x: scroll;
        -ms-overflow-style: none;
        overflow: -moz-scrollbars-none; 
        max-width: 600px;
        margin: auto;
    }
    .video-tabs::-webkit-scrollbar { width: 0 !important }
    .video-card .v-image {
        position: relative;
    }

    .video-card .v-image .v-responsive__content,
    .video-card .v-image .v-responsive__content a {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding: 0;
        margin: auto;
        background-color: transparent !important;
        box-shadow: none;
    }

    .video-card .v-card__title {
        padding-top: 16px;
    }
</style>