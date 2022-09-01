<template>
        <div class="v-container">
            <div class="v-layout">
                <div class="v-flex">
                    <v-card  class="recover-form">
                        <form>
                            <v-card-title class="headline grey">
                                Recovery Account
                            </v-card-title>

                            <v-card-text>
                                <v-text-field v-model="email" label="E-mail"></v-text-field>
       
                                <div v-if="message">
                                    <v-alert :value="true" :color="color">
                                        {{ message }}
                                    </v-alert>
                                </div>
                            </v-card-text>

                            <v-divider></v-divider>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                    color="orange"
                                    flat
                                    @click="sendEmail"
                                >
                                    Recover
                                </v-btn>
                            </v-card-actions>
                        </form>
                    </v-card>
                </div>
            </div>
        </div>
</template>

<script>
import { auth } from '@/services/database';
export default {
    name: 'account-recovery',
    data() {
        return {
            email: '',
            color: '',
            message: '',
        }
    },
    methods: {
        sendEmail() {
            console.log(this.email);
            if(this.email == '') {
                this.color = 'error';
                this.message = 'Please Enter Email Address';
            } else {
                auth.sendPasswordResetEmail(this.email).then(() => {
                    this.color = 'success';
                    this.message = 'Email Sent';
                }).catch((error) => {
                    this.message = error;
                });
            }
        }
    }
}
</script>

<style scoped>
    .recover-form {
        margin-top: 80px;
    }
</style>
