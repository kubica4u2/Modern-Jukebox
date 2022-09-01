<template>
    <div>
        <div class="background-black">
            <div class="video-wrapper">
                <youtube :video-id="video_id" :player-vars="playerVars" ref="youtube" class="youtube-video"></youtube>
            </div>
        </div>
        <div class="v-container">
            <div class="v-layout">
                <div class="v-flex">
                    <template v-if=" ! currentUser">
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
                    <template v-else-if="friends.length > 0">
                        <v-card>
                            <v-list class="users-list">
                                <v-subheader>
                                    <v-spacer></v-spacer>
                                    <v-list-tile-action class="justify-end">
                                        <v-icon @click="addFavoriteVideo">{{ favIcon }}</v-icon>
                                    </v-list-tile-action>
                                </v-subheader>

                                <v-list-tile v-for="friend in friends" :key="friend.uid" avatar class="users-list-item"
                                    @click="sendVideo( friend, showSnackBar )">
                                    <v-list-tile-avatar>
                                        <img :src="friend.photoURL">
                                    </v-list-tile-avatar>

                                    <v-list-tile-content>
                                        <v-list-tile-title v-html="friend.displayName"></v-list-tile-title>
                                    </v-list-tile-content>

                                    <v-list-tile-action>
                                        <v-icon>send</v-icon>
                                    </v-list-tile-action>
                                </v-list-tile>
                            </v-list>
                        </v-card>
                    </template>
                    <template v-else>
                        <v-card>
                            <v-list class="users-list">
                                <v-subheader>
                                    <v-spacer></v-spacer>
                                    <v-list-tile-action class="justify-end">
                                        <v-icon @click="addFavoriteVideo">{{ favIcon }}</v-icon>
                                    </v-list-tile-action>
                                </v-subheader>
                            </v-list>
                        </v-card>
                        <div style="margin-left: 5px;">
                            <br />
                            <h1>Welcome</h1>
                            <br />
                            <h3>Add new friends to begin sharing videos instantly!</h3>
                            <br />
                        </div>
                        <div>
                            <v-btn depressed large color="primary" to="/users">Add Friends</v-btn>
                        </div>
                    </template>

                    <v-snackbar v-model="snackbar" :color="color" :multi-line="mode === 'multi-line'" :timeout="timeout"
                        :vertical="mode === 'vertical'">
                        {{ snackbarText }}
                        <v-btn dark flat @click="snackbar = false">
                            Close
                        </v-btn>
                    </v-snackbar>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Register from '../../../components/AuthModal/Register';
    import {
        mapState
    } from 'vuex';
    import {
        db
    } from '@/services/database';

    export default {
        name: 'view-video',
        props: {
            video_id: {
                type: String
            },
            title: {
                type: String
            }
        },
        components: {
            Register
        },
        data() {
            return {
                fav: false,
                favIcon: 'star_border',
                snackbar: false,
                snackbarText: '',
                disabled: false,
                color: '',
                mode: '',
                timeout: 700,
                playerVars: {
                    playsinline: 1,
                    rel: 0,
                    autoplay: 1
                }
            }
        },
        mounted() {

            if( this.$store.state.currentUser ) {
                this.$store.dispatch('getFriends');
                let uid = this.$store.state.currentUser.uid;
                db.collection('users').doc(uid).collection('favorites').doc(this.$route.params.video_id)
                    .get().then((snapshot) => {
                    if (snapshot.exists) {
                        this.fav = true;
                        this.favIcon = 'star';
                    }
                });
            }

        },
        computed: {
            currentUser() {
                return this.$store.state.currentUser;
            },
            ...mapState(['friends'])
        },
        methods: {
            sendVideo: function (friend, cb) {
                let friendID = friend.uid;
                let videoID = this.$route.params.video_id;
                let title = this.$route.params.title;
                let thumbnail = this.$route.params.thumbnail;
                let channelTitle = this.$route.params.channelTitle;

                db.collection('usersToken').doc(friendID).get().then((usersToken) => {
                    if (usersToken.exists) {

                        let token = usersToken.data().token;

                        db.collection('users').doc(friendID).collection('videos').doc(videoID).get().then((
                            video) => {
                            if (video.exists) {
                                this.color = 'red';
                                this.snackbarText = 'Already Has Video';
                                cb();
                            } else {
                                db.collection('users').doc(friendID).collection('videos').doc(
                                    videoID).set({
                                    videoID,
                                    title,
                                    thumbnail,
                                    channelTitle,
                                    token,
                                    created: new Date()
                                }).then(() => {
                                    this.color = 'green';
                                    this.snackbarText = 'Video Sent';
                                    cb();
                                });
                            }
                        });

                    } else {

                        db.collection('users').doc(friendID).collection('videos').doc(videoID).get().then((
                            video) => {
                            if (video.exists) {
                                this.color = 'red';
                                this.snackbarText = 'Already Has Video';
                                cb();
                            } else {
                                db.collection('users').doc(friendID).collection('videos').doc(
                                    videoID).set({
                                    videoID,
                                    title,
                                    thumbnail,
                                    channelTitle,
                                    created: new Date()
                                }).then(() => {
                                    this.color = 'green';
                                    this.snackbarText = 'Video Sent';
                                    cb();
                                });
                            }
                        });
                    }

                }).catch((err) => {
                    console.log("Error getting document:", err);
                });
            },
            addFavoriteVideo: function () {
                this.fav = !this.fav;
                this.fav ? this.favIcon = 'star' : this.favIcon = 'star_border';

                let uid = this.$store.state.currentUser.uid;

                let videoID = this.$route.params.video_id;
                let title = this.$route.params.title;
                let thumbnail = this.$route.params.thumbnail;
                let channelTitle = this.$route.params.channelTitle;

                if (this.fav === true) {
                    db.collection('users').doc(uid).collection('favorites').doc(videoID).set({
                        channelTitle,
                        thumbnail,
                        title,
                        videoID
                    });
                } else {
                    db.collection('users').doc(uid).collection('favorites').doc(videoID).delete();
                }

            },
            showSnackBar: function () {
                this.snackbar = true;
            }
        }
    }
</script>

<style>
    .v-list__tile__action.justify-end {
        justify-content: flex-end !important;
    }
    .content-modal-btn #register-btn {
        background-color: #1976d2 !important;
        border-color: #1976d2 !important;
        font-size: 15px;
        height: 44px;
        padding: 0 32px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex: none !important;
        font-weight: 500;
        border-radius: 2px;
        min-width: 88px;
    }
</style>