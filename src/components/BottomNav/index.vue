<template>
    <v-card  flat>
        <v-bottom-nav  :value="true" fixed >
            <v-btn color="orange" to="/" flat>
                <span>Home</span>
                <v-icon>music_video</v-icon>
            </v-btn>

            <v-btn color="orange" to="/player" flat>
                <span>Player</span>
                <v-icon>play_circle_outline</v-icon>
            </v-btn>
            <template v-if="currentUser">
                <v-btn color="orange" to="/users" flat>
                    <span>Users</span>
                    <v-icon>people_outline</v-icon>
                </v-btn>
            </template>
            <template v-if="currentUser">
            <v-btn color="orange" to="/settings" flat>
                <span>Settings</span>
                <v-icon>settings</v-icon>
            </v-btn>
            </template>
        </v-bottom-nav>
    </v-card>
</template>

<script>
    export default {
        name: 'BottomNav',
        computed: {
            currentUser() {
                return this.$store.state.currentUser;
            }
        }
    }
</script>