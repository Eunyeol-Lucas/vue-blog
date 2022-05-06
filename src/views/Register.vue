<template>
  <div class="form-wrap">
    <form class="register">
      <p class="login-register">
        Already have and account?
        <router-link class="router-link" :to="{ name: 'Login' }"
          >Login</router-link
        >
      </p>
      <h2>Create Your FireBlog Account</h2>
      <div class="inputs">
        <div class="input">
          <input type="text" placeholder="First Name" v-model="firstName" />
          <user class="icon" />
        </div>
        <div class="input">
          <input type="text" placeholder="Last Name" v-model="lastName" />
          <user class="icon" />
        </div>
        <div class="input">
          <input type="text" placeholder="Username" v-model="username" />
          <user class="icon" />
        </div>
        <div class="input">
          <input type="text" placeholder="Email" v-model="email" />
          <email class="icon" />
        </div>
        <div class="input">
          <input type="password" placeholder="Password" v-model="password" />
          <password class="icon" />
        </div>
        <div v-show="error" class="error">{{ errorMsg }}</div>
      </div>
      <button @click.prevent="register">Sign Up</button>
      <div class="angle"></div>
    </form>
    <div class="background"></div>
  </div>
</template>

<script>
import email from "../assets/Icons/envelope-regular.svg";
import password from "../assets/Icons/lock-alt-solid.svg";
import user from "../assets/Icons/user-alt-light.svg";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { dbService } from "../firebase/firebaseInit.js";
import { doc, setDoc } from "firebase/firestore";

export default {
  name: "Register",
  components: {
    email,
    password,
    user,
  },
  data() {
    return {
      firstName: null,
      lastName: null,
      username: null,
      email: null,
      password: null,
      error: null,
      errorMsg: "",
    };
  },
  methods: {
    async register() {
      if (
        this.email !== "" &&
        this.password !== "" &&
        this.firstName !== "" &&
        this.lastName !== "" &&
        this.username !== ""
      ) {
        this.error = false;
        this.errorMsg = "";
        try {
          const firebaseAuth = await getAuth();
          const createUser = await createUserWithEmailAndPassword(
            firebaseAuth,
            this.email,
            this.password
          );
          const result = await createUser;
          const dataBase = doc(dbService, "users", result.user.uid);
          await setDoc(dataBase, {
            firstName: this.firstName,
            lastName: this.lastName,
            username: this.username,
            email: this.email,
          });
          this.$router.push({ name: "Login" });
          return;
        } catch (error) {
          this.error = true;
          this.errorMsg = error.message;
          return;
        }
      }
      this.error = true;
      this.errorMsg = "Please fill out all the fields!";
    },
  },
};
</script>

<style lang="scss" scoped>
.register {
  h2 {
    max-width: 350px;
  }
}
</style>
