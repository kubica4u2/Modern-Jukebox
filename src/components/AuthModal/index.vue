<template>
    <div class="d-flex">
        <Register />
        <Login />
    </div>
</template>

<script>
    import Login from './Login';
    import Register from './Register'
    export default {
        components: {
            Login,
            Register
        }
    }
</script>

