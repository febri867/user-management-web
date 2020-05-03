<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-button @click="$router.replace('/user/create/')" class="md-info"
          >Create</md-button
        >
        <md-card class="md-card-plain">
          <md-card-header data-background-color="green">
            <h4 class="title">User List</h4>
          </md-card-header>
          <md-card-content>
            <md-table v-model="users" :table-header-color="tableHeaderColor">
              <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="ID">{{ item.id }}</md-table-cell>
                <md-table-cell md-label="Name">
                  <!--                  <img alt="img-user" :src="item.photo" />-->
                  {{ item.name }}</md-table-cell
                >
                <md-table-cell md-label="Salary">{{
                  item.salary
                }}</md-table-cell>
                <md-table-cell md-label="designantion">{{
                  item.designation
                }}</md-table-cell>
                <md-table-cell md-label="Action">
                  <md-button
                    @click="handleEdit(item.id)"
                    class="md-warning md-just-icon"
                    ><md-icon>edit</md-icon></md-button
                  >
                  <md-button
                    @click="handleDelete(item.id)"
                    class="md-danger md-just-icon"
                    ><md-icon>delete</md-icon></md-button
                  >
                </md-table-cell>
              </md-table-row>
            </md-table>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import user from "../../service/user";

export default {
  name: "user-list",
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      selected: [],
      users: []
    };
  },
  created() {
    this.getListUser();
  },
  methods: {
    async getListUser() {
      try {
        const res = await user.listUser();
        if (res) {
          this.users = res.map(e => {
            if (e.photo) {
              e.photo = e.photo.toString("base64");
            }
            return e;
          });
        }
      } catch (e) {
        console.log(e);
      }
    },

    handleEdit(e) {
      this.$router.replace("user/edit/" + e);
    },

    async handleDelete(e) {
      try {
        const res = await user.deleteUser(e);
        if (res) {
          window.location.reload();
          return res;
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
