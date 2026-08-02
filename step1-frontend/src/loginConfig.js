export const LOGIN_ROLE_CONFIG = {
  customer: {
    apiUrl: "http://localhost:8080/api/customers/login",
    label: "Customer",
    heading: "Customer Login",
  },
  vehicleOwner: {
    apiUrl: "http://localhost:8080/api/vehicle-owners/login",
    label: "Vehicle Owner",
    heading: "Vehicle Owner Login",
  },
  admin: {
    apiUrl: "http://localhost:8080/api/admins/login",
    label: "Admin",
    heading: "Admin Login",
  },
};

export function getLoginConfig(role = "customer") {
  return LOGIN_ROLE_CONFIG[role] || LOGIN_ROLE_CONFIG.customer;
}
