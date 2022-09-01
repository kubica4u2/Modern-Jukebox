<template>
    <div>
        <v-toolbar color="#424242">
            <div class="header-search">
                <v-text-field
                    box
                    label="Search"
                    append-icon="search"
                    color="orange"
                    background-color="#191919"
                    v-model="search"
                ></v-text-field>
            </div>
        </v-toolbar>

        <div class="v-container">
            <div class="v-layout">
                <div class="v-flex">
                    <template v-if="filterSearchUsers.length > 0">
                         <h2 class="mt-2">Quck Add</h2>
                        <v-card class="mt-2">
                            <v-list class="users-list">
                                <v-list-tile
                                    v-for="(user, index) in filterSearchUsers" 
                                    :key="user.uid + index" 
                                    avatar 
                                    class="users-list-item"
                                    @click="addFriend( user )"
                                    >
                                    <v-list-tile-avatar>
                                        <img :src="user.photoURL">
                                    </v-list-tile-avatar>

                                    <v-list-tile-content>
                                        <v-list-tile-title v-html="user.displayName"></v-list-tile-title>
                                    </v-list-tile-content>

                                    <v-list-tile-action>
                                        <v-icon>person_add</v-icon>
                                    </v-list-tile-action>
                                </v-list-tile>
                            </v-list>
                        </v-card>
                    </template>
                    <template v-else>
                        <div class="mt-3  text-center">
                            <h2>No Users Found!</h2>
                            <img src='https://firebasestorage.googleapis.com/v0/b/modern-jukebox-cd98e.appspot.com/o/sheep-158247.png?alt=media&token=9761a471-20c8-485a-8cee-460f523802a6' alt="sheep" class="sheep-img" />
                        </div>
                    </template>

                    <AddedMe />
                    <Friends />

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { db } from '@/services/database';
    import AddedMe from './AddedMe';
    import Friends from './Friends';

    export default {
        name: 'users',
        data() {
            return {
                search: ""
            }
        },
        mounted() {
            this.$store.dispatch( 'getUsers' );
            this.$store.dispatch( 'getFriends' );
            this.$store.dispatch( 'getFriendsID' );
        },
        components: {
            AddedMe,
            Friends
        },
        computed:  {
            users() {
                return this.$store.getters.filterUsers;
            },
            filterSearchUsers() {
                return this.users.filter(user => {
                    return user.email.toLowerCase().match(this.search.toLowerCase());
                });
            }
        },
        methods: {
            addFriend: function( user ) {

                const { uid, displayName, email, photoURL } = this.$store.state.currentUser;

                let obj = {
                    displayName,
                    email,
                    photoURL,
                    uid,
                    status: 'pending'
                }

                db.collection( 'users' ).doc( user.uid ).collection( 'friends' ).doc( uid ).set(obj);

                user['status'] = 'waiting';
                db.collection( 'users' ).doc( uid ).collection( 'friends' ).doc( user.uid ).set(user);
            }
        } 
    }
</script>

<style>
    .text-center {
        text-align: center;
    }
    .sheep-img {
        max-width: 100%;
        margin-top: 30px;
        display: block;
        margin-left: auto;
        margin-right: auto;
    }
</style>