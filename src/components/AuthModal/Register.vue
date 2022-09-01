<template>
    <div class="text-xs-center d-flex align-center">
        <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on }">
                <div v-on="on" id="register-btn">
                    Register
                </div>
            </template>

            <v-card>
                <form  id="register-form">
                    <v-card-title class="headline grey">
                        Register
                    </v-card-title>

                    <v-card-text>
                            <v-text-field v-model="email" label="E-mail"></v-text-field>
                            <v-text-field 
                                v-model="password" 
                                label="Password"
                                :append-icon="show1 ? 'visibility' : 'visibility_off'" 
                                :type="show1 ? 'text' : 'password'"
                                @click:append="show1 = !show1"
                            >
                            </v-text-field>
                            <v-text-field 
                                v-model="password2" 
                                label="Confirm Password"
                                :append-icon="show1 ? 'visibility' : 'visibility_off'" 
                                :type="show1 ? 'text' : 'password'"
                                @click:append="show1 = !show1"
                            >
                            </v-text-field>

                            
                            <div v-if="error">
                                <v-alert :value="true" color="error">
                                    {{ error }}
                                </v-alert>
                            </div>
                    </v-card-text>


                    <v-card-actions>
                        <v-btn
                            color="#DC5043"
                            @click="googleSignUp"
                        >
                            <i class="fa fa-google" aria-hidden="true"></i>
                            Sign In
                        </v-btn>
                        <v-btn
                            color="#4267B1"
                            @click="fbSighUp"
                        >
                            <i class="fa fa-facebook" aria-hidden="true"></i>
                            Sign In
                        </v-btn>
                    </v-card-actions>

                    <v-divider></v-divider>

                    <v-card-actions>
                    <v-spacer></v-spacer>
                        <v-btn
                            color="orange"
                            flat
                            @click="signUp"
                        >
                            Register
                        </v-btn>
                    </v-card-actions>
                </form>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import { auth } from '@/services/database';

    export default {
        name: 'signup',
        data() {
            return {
                email: '',
                password: '',
                password2: '',
                error: '',
                dialog: false,
                show1: false,
            }
        },
        methods: {
            async signUp() {
                let result = await auth.signUp(this.email, this.password, this.password2);
                if (result.message) {
                    this.error = result.message;
                } else if (result == '!match') {
                    this.error = 'Passwords dont match!';
                } else {
                    this.$router.push('/');
                }

            },
            async fbSighUp() {
                let result = await auth.loginWithFacebook();

                if (result.message) {
                    this.error = result.message;
                } else {
                    this.$router.push('/');
                }

            },
            async googleSignUp() {
                let result = await auth.loginWithGoogle();

                if (result.message) {
                    this.error = result.message;
                } else {
                    this.$router.push('/');
                }
            }
        }
    }
</script>

<style scoped>
    #register-btn {
        text-transform: uppercase;
        cursor: pointer;
        margin-right: 20px;
    }
    .v-btn .fa {
        margin-right: 10px;
        margin-top: 1px;
        font-size: 18px;
    }
</style>