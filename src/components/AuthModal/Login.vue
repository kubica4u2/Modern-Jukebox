<template>
    <div class="text-xs-center">
        <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on }">
                <img src="/img/login.png" v-on="on" style="margin-top: 6px; cursor: pointer;" />
            </template>

            <v-card>
                <form id="login-form">
                    <v-card-title class="headline grey">
                        Login
                    </v-card-title>

                    <v-card-text>
                        <v-text-field v-model="email" label="E-mail"></v-text-field>
                        <v-text-field 
                            v-model="password" 
                            :append-icon="show1 ? 'visibility' : 'visibility_off'" 
                            :type="show1 ? 'text' : 'password'"
                            label="Password"
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
                        <v-btn
                            color="orange"
                            flat
                            to="/account-recovery"
                            @click="dialog = false"
                        >
                            Forgot Account?
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="orange"
                            flat
                            @click="logIn"
                        >
                            Login
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
        name: 'signin',
        data() {
            return {
                email: '',
                password: '',
                error: '',
                dialog: false,
                show1: false,
            }
        },
        methods: {
            async logIn() {
                let result = await auth.signIn(this.email, this.password)

                if (result.message) {
                    this.error = result.message;
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
    .text-right {
        text-align: right;
    }

    #login-form .button {
        margin-top: 10px;
    }
    .v-btn .fa {
        margin-right: 10px;
        margin-top: 1px;
        font-size: 18px;
    }
</style>
