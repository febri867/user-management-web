import UserList from "../pages/User/UserList";
import UserForm from "../pages/User/UserForm";
import DashboardLayout from "../pages/Layout/DashboardLayout";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/user",
    children: [
      {
        path: "user",
        name: "User",
        component: UserList
      },
      {
        path: "user/create",
        name: "Create User",
        component: UserForm
      },
      {
        path: "user/edit/:id",
        name: "Edit User",
        component: UserForm
      }
    ]
  }
];

export default routes;
