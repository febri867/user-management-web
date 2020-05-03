<template>
  <form>
    <md-card>
      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-50">
            <div class="md-layout">
              <div class="md-layout-item md-small-size-100 md-size-100">
                <md-field>
                  <label>Name</label>
                  <md-input v-model="form.name" type="text"></md-input>
                </md-field>
              </div>
            </div>
            <div class="md-layout">
              <div class="md-layout-item md-small-size-100 md-size-100">
                <md-field>
                  <label>Salary</label>
                  <md-input v-model="form.salary" type="text"></md-input>
                </md-field>
              </div>
            </div>
            <div class="md-layout">
              <div class="md-layout-item md-small-size-100 md-size-100">
                <md-field>
                  <label>Designation ( Only staff, manager, and chief)</label>
                  <md-input v-model="form.designation" type="text"></md-input>
                </md-field>
              </div>
            </div>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <div class="md-layout-item md-small-size-100 md-size-100">
              <md-field>
                <label>Photo</label>
                <md-file
                  @md-change="handleChange"
                  v-model="form.photo"
                  accept="image/*"
                />
              </md-field>
              <md-card class="card-photo">
                <img class="img-user" alt="img-profile" :src="defaultPhoto" />
              </md-card>
            </div>
          </div>
        </div>
        <div class="md-layout">
          <div class="md-layout-item md-size-100 text-right">
            <md-button
              v-if="type === 'add'"
              @click="handleSubmit"
              class="md-raised md-info"
              >Create User</md-button
            >
            <md-button v-else @click="handleEdit" class="md-raised md-info"
              >Edit User</md-button
            >
          </div>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>
<script>
import defaultPhoto from "@/assets/img/tim_80x80.png";
import user from "../../service/user";
export default {
  name: "user-form",
  props: {
    dataBackgroundColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      defaultPhoto: defaultPhoto,
      type: "add",
      form: {
        photo: null,
        name: null,
        salary: null,
        designation: null
      }
    };
  },
  created() {
    if (this.$route.params.id) {
      this.type = "edit";
      this.getDetailUser(this.$route.params.id);
    }
  },
  methods: {
    handleChange(e) {
      let reader = new FileReader();
      reader.readAsDataURL(e[0]);
      reader.onload = function(e) {
        this.defaultPhoto = e.target.result;
      };
    },

    handleSubmit() {
      this.createUser().then(() => {
        this.$router.replace("/user");
      });
    },

    handleEdit() {
      this.updateUser().then(() => {
        this.$router.replace("/user");
      });
    },

    async getDetailUser(e) {
      try {
        const res = await user.detailUser(e);
        this.form = res.data;
      } catch (e) {
        console.log(e);
      }
    },

    async createUser() {
      try {
        return await user.createUser(this.form);
      } catch (e) {
        console.log(e);
      }
    },

    async updateUser() {
      try {
        return await user.updateUser({
          ...this.form,
          id: this.$route.params.id
        });
      } catch (e) {
        console.log(e);
      }
    }
  },
  watch: {}
};
</script>
<style>
.card-photo {
  width: 150px !important;
  margin: 0 0 0 40px !important;
  .img-user {
    height: auto !important;
  }
}
</style>
