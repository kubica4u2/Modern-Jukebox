<template>
    <div>
        <div  
            v-for="video in featuredVideos"
            v-bind:key="video.videoID"
            >
            <v-card max-width="600" class="mx-auto video-card">
                    <v-img 
                        :src="video.thumbnail" 
                        aspect-ratio="1.777">
                        <v-btn  v-bind:to="{name: 'view-video', params: {video_id: video.videoID, title: video.title, channelTitle: video.channelTitle, thumbnail: video.thumbnail }}"></v-btn>
                    </v-img>
             
                <v-card-title primary-title>
                    <div>
                        <h3 class="mb-0">{{video.title}}</h3>
                        <div>{{video.channelTitle}}</div>
                    </div>
                </v-card-title>
            </v-card>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'videos',
        computed: {
            featuredVideos() {
                return this.$store.getters.filterFeatureVideos;
            }
        }
    }
</script>


