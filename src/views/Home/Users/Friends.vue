<template>
    <div v-if="friends.length > 0">
        <h2 class="mt-2">My Friends</h2>
        <v-card class="mt-2">
            <v-list class="users-list">
                <v-list-tile
                    v-for="(friend, index ) in friends"
                    :key="friend.uid + index"
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
                        @click="deleteFriend(friend)"
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
    name: 'friends',
    mounted() {
        this.$store.dispatch('getFriends');
    },
    methods: {
        deleteFriend: function(friend) {
            let uid = this.$store.state.currentUser.uid;
            let friendUID = friend.uid;
            db.collection('users').doc( uid ).collection( 'friends' ).doc( friendUID ).delete();
            db.collection('users').doc( friendUID ).collection( 'friends' ).doc( uid ).delete();
        }
    },
    computed:  mapState([
        'friends'
    ])
}
</script>