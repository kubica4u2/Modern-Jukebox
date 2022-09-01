<template>
    <div v-if="friendsAddedMe.length > 0">
        <h2 class="mt-2">Added Me</h2>
        <v-card class="mt-2">
            <v-list class="users-list">
                <v-list-tile
                    v-for="friend in friendsAddedMe"
                    :key="friend.uid"
                    class="users-list-item"
                    >
                    <v-list-tile-avatar>
                        <img :src="friend.photoURL" >
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                        <v-list-tile-title >{{friend.displayName}}</v-list-tile-title>
                    </v-list-tile-content>

                    <v-list-tile-action>
                        <v-icon
                        @click="acceptFriend(friend)"
                        >check</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-action>
                        <v-icon
                        @click="ignoreFriend(friend)"
                        >close</v-icon>
                    </v-list-tile-action>
                </v-list-tile>
            </v-list>
        </v-card>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { db } from '@/services/database';

export default {
    name: 'added-me',
    mounted() {
        this.$store.dispatch('getFriendsAddedMe');
    },
    methods: {
        acceptFriend(friend) {
            let uid = this.$store.state.currentUser.uid;
            let friendUID = friend.uid;
            db.collection('users').doc( uid ).collection( 'friends' ).doc( friendUID ).update({status: 'accepted'});
            db.collection('users').doc( friendUID ).collection( 'friends' ).doc( uid ).update({status: 'accepted'})
            .then(() => {
                window.location.reload();
            });
        },
        ignoreFriend(friend) {
            let uid = this.$store.state.currentUser.uid;
            let friendUID = friend.uid;
            db.collection('users').doc( uid ).collection( 'friends' ).doc( friendUID ).update({status: 'ignore'});
            db.collection('users').doc( friendUID ).collection( 'friends' ).doc( uid ).update({status: 'ignore'});
        }
    },
    computed:  mapState([
        'friendsAddedMe'
    ])
}
</script>
