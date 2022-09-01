<template>
    <div>
        <v-toolbar color="#424242">
            <div>
                {{currentUser.displayName}}
            </div>
            <v-spacer></v-spacer>
            <div>
                <v-avatar
                    :size="38"
                    color="grey lighten-4"
                >
                    <img :src="currentUser.photoURL" alt="avatar">
                </v-avatar>
            </div>
        </v-toolbar>
        <div class="v-container">
            <div class="v-layout">
                <div class="v-flex">
                    <v-card class="mt-2">
                        <v-list class="users-list">

                            <v-list-tile
                                class="users-list-item"
                                @click="logout"
                            >
                                <v-list-tile-content>
                                    <v-list-tile-title>Logout</v-list-tile-title>
                                </v-list-tile-content>

                                <v-list-tile-action>
                                    <v-icon>logout</v-icon>
                                </v-list-tile-action>
                            </v-list-tile>


                            <v-list-tile
                                class="users-list-item"
                                @click="dialog = true"
                            >
                                <v-list-tile-content>
                                    <v-list-tile-title>Delete Account</v-list-tile-title>
                                </v-list-tile-content>

                                <v-list-tile-action>
                                    <v-icon>delete</v-icon>
                                </v-list-tile-action>
                            </v-list-tile>
                            <v-dialog
                                v-model="dialog"
                                max-width="290"
                                >
                                <v-card>
                                    <v-card-title class="headline">Delete Account</v-card-title>

                                    <v-card-text>
                                        Are you sure you want to delete your account?
                                    </v-card-text>

                                    <v-card-actions>
                                    <v-spacer></v-spacer>

                                    <v-btn
                                        color="orange"
                                        @click="dialog = false"
                                    >
                                        No
                                    </v-btn>

                                    <v-btn
                                        color="orange"
                                        flat="flat" 
                                        @click="deleteAccount"
                                    >
                                        Yes
                                    </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-list>
                    </v-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { auth } from '@/services/database';
import store from '@/store';

export default {
    name: 'settings',
    data () {
      return {
            dialog: false
        }
    },
    computed: {
        currentUser() {
            return this.$store.state.currentUser;
        }
    },
    methods: {
		logout: function() {
            auth.signOut().then(() => {
                store.commit( 'SET_CURRENT_USER', null );
                this.$router.go('/');
            }).catch((error) => {
                console.log(error);
            });
        },
        deleteAccount: function() {
            auth.currentUser.delete().then(() => {
                store.commit( 'SET_CURRENT_USER', null );
                this.$router.go('/');
            }).catch((error) => {
                console.log(error);
            });
        }
    }
}
</script>